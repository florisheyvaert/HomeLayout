import { useState, useRef, useCallback, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Circle, Text, Line } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { GridLayer } from "./GridLayer";
import { RoomLayer } from "./RoomLayer";
import { EntityLayer } from "./EntityLayer";
import { FurnitureLayer } from "./FurnitureLayer";
import { RoomBadgeLayer } from "./RoomBadgeLayer";
import { useThemeConfig, DomIcon, BRAND } from "../../theme";
import type { FloorConfig, FloorBackground, Point, CanvasTool, AppMode, Room, HomeAssistant, FurniturePlacement, DeviceViewportPreset } from "../../types";
import { getPreset } from "../../backgroundPresets";

interface HomeLayoutCanvasProps {
  floor: FloorConfig | null;
  mode: AppMode;
  activeTool: CanvasTool;
  selectedRoomIds: string[];
  selectedEntityIds: string[];
  onSelectRoom: (id: string, shiftKey: boolean) => void;
  onSelectEntity: (id: string, shiftKey: boolean) => void;
  onClearSelection: () => void;
  onMarqueeSelect: (roomIds: string[], entityIds: string[], additive: boolean, furnitureIds?: string[]) => void;
  onAddRoom: (points: Point[]) => Room | undefined;
  onMoveRoom: (id: string, dx: number, dy: number) => void;
  onMoveEntity: (id: string, x: number, y: number) => void;
  onUpdateRoom: (id: string, updates: Partial<Room>) => void;
  onDropEntity: (entityId: string, x: number, y: number) => void;
  selectedFurnitureIds: string[];
  onSelectFurniture: (id: string, shiftKey: boolean) => void;
  onMoveFurniture: (id: string, x: number, y: number) => void;
  onUpdateFurniture: (id: string, updates: Partial<FurniturePlacement>) => void;
  onDropFurniture: (type: string, x: number, y: number) => void;
  onDefaultViewChange?: (isDefault: boolean) => void;
  onScaleChange?: (scale: number) => void;
  hass: HomeAssistant;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  defaultIconSize?: number;
  domainIconSizes?: Record<string, number>;
  /** Entity ID currently being dragged from the browser (for preview) */
  draggingEntityId?: string | null;
  /** Client-coordinate position of the dragged entity (for preview + drop) */
  dragClientPos?: { x: number; y: number } | null;
  /** Device-specific viewport defaults (zoom + rotation) */
  deviceViewportPreset?: DeviceViewportPreset | null;
  /** Rooms from a reference floor to show as ghost overlay in edit mode */
  ghostRooms?: Room[] | null;
}

const ZOOM_STEP = 1.3;
const PAN_THRESHOLD = 4; // px movement before it counts as a drag
const QUERY_DEBOUNCE_MS = 400;
const MIN_SHAPE_SIZE = 10; // minimum size to create a shape (canvas px)

function generateRect(start: Point, end: Point): Point[] {
  return [
    { x: start.x, y: start.y },
    { x: end.x, y: start.y },
    { x: end.x, y: end.y },
    { x: start.x, y: end.y },
  ];
}

function generateCircle(center: Point, edge: Point, segments = 32): Point[] {
  const r = Math.hypot(edge.x - center.x, edge.y - center.y);
  return Array.from({ length: segments }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2;
    return { x: center.x + r * Math.cos(angle), y: center.y + r * Math.sin(angle) };
  });
}

function generateTriangle(start: Point, end: Point): Point[] {
  const cx = (start.x + end.x) / 2;
  return [
    { x: cx, y: start.y },
    { x: end.x, y: end.y },
    { x: start.x, y: end.y },
  ];
}

function isShapeTool(tool: CanvasTool): tool is "draw-rect" | "draw-circle" | "draw-triangle" {
  return tool === "draw-rect" || tool === "draw-circle" || tool === "draw-triangle";
}

function generateShapePoints(tool: "draw-rect" | "draw-circle" | "draw-triangle", start: Point, end: Point): Point[] {
  switch (tool) {
    case "draw-rect": return generateRect(start, end);
    case "draw-circle": return generateCircle(start, end);
    case "draw-triangle": return generateTriangle(start, end);
  }
}

/** Read viewport params (x, y, scale, rotation) from the current URL search params */
function readViewportParams(): { x: number | null; y: number | null; scale: number | null; rotation: number | null } {
  try {
    const params = new URLSearchParams(window.location.search);
    const x = params.has("x") ? Number(params.get("x")) : null;
    const y = params.has("y") ? Number(params.get("y")) : null;
    const scale = params.has("scale") ? Number(params.get("scale")) : null;
    const rotation = params.has("r") ? Number(params.get("r")) : null;
    return {
      x: x !== null && Number.isFinite(x) ? x : null,
      y: y !== null && Number.isFinite(y) ? y : null,
      scale: scale !== null && Number.isFinite(scale) && scale > 0 ? scale : null,
      rotation: rotation !== null && [0, 90, 180, 270].includes(rotation) ? rotation : null,
    };
  } catch {
    return { x: null, y: null, scale: null, rotation: null };
  }
}

/** Write viewport params to URL (replaceState so we don't pollute history) */
function writeViewportParams(x: number, y: number, scale: number, rotation: number) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("x", x.toFixed(1));
    url.searchParams.set("y", y.toFixed(1));
    url.searchParams.set("scale", scale.toFixed(3));
    if (rotation !== 0) {
      url.searchParams.set("r", String(rotation));
    } else {
      url.searchParams.delete("r");
    }
    window.history.replaceState(window.history.state, "", url.toString());
  } catch {
    // Silently fail — e.g. sandboxed iframe
  }
}

/** Convert screen coords to canvas coords, accounting for position, rotation and scale */
function toCanvas(
  screenX: number, screenY: number,
  posX: number, posY: number,
  scale: number, rotDeg: number,
): Point {
  const dx = screenX - posX;
  const dy = screenY - posY;
  const rad = (rotDeg * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);
  return {
    x: (dx * cosR + dy * sinR) / scale,
    y: (-dx * sinR + dy * cosR) / scale,
  };
}

/** Compute new stage position so that a given canvas point stays at a given screen point */
function posForCanvasPoint(
  canvasX: number, canvasY: number,
  screenX: number, screenY: number,
  scale: number, rotDeg: number,
): { x: number; y: number } {
  const rad = (rotDeg * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);
  return {
    x: screenX - scale * (canvasX * cosR - canvasY * sinR),
    y: screenY - scale * (canvasX * sinR + canvasY * cosR),
  };
}

/** Inverse of toCanvas: convert canvas coordinates back to screen coordinates */
function canvasToScreen(
  canvasX: number, canvasY: number,
  posX: number, posY: number,
  scale: number, rotDeg: number,
): Point {
  const rad = (rotDeg * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);
  return {
    x: posX + scale * (canvasX * cosR - canvasY * sinR),
    y: posY + scale * (canvasX * sinR + canvasY * cosR),
  };
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getRoomCenter(points: Point[]): Point {
  const x = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const y = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return { x, y };
}

function rectContains(
  x1: number, y1: number, x2: number, y2: number,
  px: number, py: number,
): boolean {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  return px >= minX && px <= maxX && py >= minY && py <= maxY;
}

function getDistance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export interface HomeLayoutCanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  rotateView: () => void;
  rotation: number;
  scale: number;
  /** Returns the canvas-coordinate point at the center of the viewport */
  getViewportCenter: () => Point;
  /** Convert client coords to snapped canvas coords (for pointer-based entity drop) */
  clientToCanvas: (clientX: number, clientY: number) => Point | null;
}

export const HomeLayoutCanvas = forwardRef<HomeLayoutCanvasHandle, HomeLayoutCanvasProps>(
  function HomeLayoutCanvas(
    {
      floor,
      mode,
      activeTool,
      selectedRoomIds,
      selectedEntityIds,
      onSelectRoom,
      onSelectEntity,
      onClearSelection,
      onMarqueeSelect,
      onAddRoom,
      onMoveRoom,
      onMoveEntity,
      onUpdateRoom,
      onDropEntity: _onDropEntity,
      selectedFurnitureIds,
      onSelectFurniture,
      onMoveFurniture,
      onUpdateFurniture,
      onDropFurniture,
      onDefaultViewChange,
      onScaleChange,
      hass,
      gridSize,
      gridEnabled,
      isDark,
      defaultIconSize,
      domainIconSizes,
      draggingEntityId,
      dragClientPos,
      deviceViewportPreset,
      ghostRooms,
    },
    ref
  ) {
    useThemeConfig(); // ensure re-render on theme change
    const [stagePos, setStagePos] = useState<{ x: number; y: number } | null>(() => {
      const vp = readViewportParams();
      return vp.x !== null && vp.y !== null ? { x: vp.x, y: vp.y } : null;
    });
    const [stageScale, setStageScale] = useState(() => {
      const vp = readViewportParams();
      return vp.scale ?? deviceViewportPreset?.default_zoom ?? 1;
    });
    const [stageRotation, setStageRotation] = useState(() => {
      const vp = readViewportParams();
      return vp.rotation ?? deviceViewportPreset?.default_rotation ?? 0;
    });
    const [drawingPoints, setDrawingPoints] = useState<Point[]>([]);
    const [shapeStart, setShapeStart] = useState<Point | null>(null);
    const [shapePreview, setShapePreview] = useState<Point[] | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track container size reactively
    const [containerSize, setContainerSize] = useState<{ w: number; h: number }>({ w: 800, h: 600 });
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const update = () => setContainerSize({ w: el.clientWidth, h: el.clientHeight });
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    // Pointer tracking refs
    const panStartRef = useRef<{ x: number; y: number } | null>(null);
    const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const hasMovedRef = useRef(false);

    // Marquee selection state (canvas coordinates)
    const [marqueeStart, setMarqueeStart] = useState<Point | null>(null);
    const [marqueeEnd, setMarqueeEnd] = useState<Point | null>(null);
    const isMarqueeActive = marqueeStart !== null && marqueeEnd !== null;
    const marqueeActiveRef = useRef(false);

    // Pinch-to-zoom tracking
    const lastPinchRef = useRef<{ dist: number; midX: number; midY: number } | null>(null);

    // Group drag offset — shared between rooms and entities for preview
    const [groupDragOffset, setGroupDragOffset] = useState<Point | null>(null);
    const isMultiSelect = selectedRoomIds.length + selectedEntityIds.length + selectedFurnitureIds.length > 1;

    // Center on origin (0,0) when first mounted (only if no query params)
    useEffect(() => {
      if (stagePos !== null) return;
      const el = containerRef.current;
      if (!el) return;
      setStagePos({ x: el.clientWidth / 2, y: el.clientHeight / 2 });
    });

    // Notify parent whether we're at default view
    useEffect(() => {
      if (!onDefaultViewChange || stagePos === null) return;
      const el = containerRef.current;
      if (!el) return;
      const defaultX = el.clientWidth / 2;
      const defaultY = el.clientHeight / 2;
      const defaultScale = deviceViewportPreset?.default_zoom ?? 1;
      const defaultRotation = deviceViewportPreset?.default_rotation ?? 0;
      const isDefault =
        stageRotation === defaultRotation &&
        Math.abs(stageScale - defaultScale) < 0.01 &&
        Math.abs(stagePos.x - defaultX) < 2 &&
        Math.abs(stagePos.y - defaultY) < 2;
      onDefaultViewChange(isDefault);
    }, [stagePos, stageScale, stageRotation, onDefaultViewChange, deviceViewportPreset]);

    // Notify parent of scale changes
    useEffect(() => {
      onScaleChange?.(stageScale);
    }, [stageScale, onScaleChange]);

    // Debounced write of viewport state to URL query params
    const queryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
      if (stagePos === null) return;
      if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
      queryTimerRef.current = setTimeout(() => {
        writeViewportParams(stagePos.x, stagePos.y, stageScale, stageRotation);
      }, QUERY_DEBOUNCE_MS);
      return () => {
        if (queryTimerRef.current) clearTimeout(queryTimerRef.current);
      };
    }, [stagePos, stageScale, stageRotation]);

    const pos = stagePos ?? { x: 0, y: 0 };

    function snapToGrid(value: number): number {
      if (!gridEnabled) return value;
      return Math.round(value / gridSize) * gridSize;
    }

    function screenToCanvas(screenX: number, screenY: number): Point {
      return toCanvas(screenX, screenY, pos.x, pos.y, stageScale, stageRotation);
    }

    /* ─── Zoom ─── */
    const zoomTo = useCallback(
      (newScale: number, centerX?: number, centerY?: number) => {
        const clamped = Math.max(0.1, Math.min(5, newScale));
        const cw = containerRef.current?.clientWidth ?? 800;
        const ch = containerRef.current?.clientHeight ?? 600;
        const cx = centerX ?? cw / 2;
        const cy = centerY ?? ch / 2;
        const canvasPt = toCanvas(cx, cy, pos.x, pos.y, stageScale, stageRotation);
        setStageScale(clamped);
        setStagePos(posForCanvasPoint(canvasPt.x, canvasPt.y, cx, cy, clamped, stageRotation));
      },
      [stageScale, stagePos, stageRotation]
    );

    const handleZoomIn = useCallback(() => zoomTo(stageScale * ZOOM_STEP), [stageScale, zoomTo]);
    const handleZoomOut = useCallback(
      () => zoomTo(stageScale / ZOOM_STEP),
      [stageScale, zoomTo]
    );
    const handleResetView = useCallback(() => {
      const el = containerRef.current;
      const cx = el ? el.clientWidth / 2 : 400;
      const cy = el ? el.clientHeight / 2 : 300;
      setStageScale(deviceViewportPreset?.default_zoom ?? 1);
      setStageRotation(deviceViewportPreset?.default_rotation ?? 0);
      setStagePos({ x: cx, y: cy });
    }, [deviceViewportPreset]);

    const handleRotateView = useCallback(() => {
      const el = containerRef.current;
      const cw = el ? el.clientWidth : 800;
      const ch = el ? el.clientHeight : 600;
      const cx = cw / 2;
      const cy = ch / 2;
      // Canvas point at viewport center
      const canvasPt = toCanvas(cx, cy, pos.x, pos.y, stageScale, stageRotation);
      const newRotation = (stageRotation + 90) % 360;
      setStageRotation(newRotation);
      setStagePos(posForCanvasPoint(canvasPt.x, canvasPt.y, cx, cy, stageScale, newRotation));
    }, [stageRotation, stageScale, pos]);

    const getViewportCenter = useCallback((): Point => {
      const el = containerRef.current;
      const cw = el ? el.clientWidth : 800;
      const ch = el ? el.clientHeight : 600;
      return toCanvas(cw / 2, ch / 2, pos.x, pos.y, stageScale, stageRotation);
    }, [pos, stageScale, stageRotation]);

    const clientToCanvas = useCallback((clientX: number, clientY: number): Point | null => {
      const el = containerRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      const cp = toCanvas(sx, sy, pos.x, pos.y, stageScale, stageRotation);
      return {
        x: gridEnabled ? Math.round(cp.x / gridSize) * gridSize : cp.x,
        y: gridEnabled ? Math.round(cp.y / gridSize) * gridSize : cp.y,
      };
    }, [pos, stageScale, stageRotation, gridSize, gridEnabled]);

    useImperativeHandle(
      ref,
      () => ({
        zoomIn: handleZoomIn,
        zoomOut: handleZoomOut,
        resetView: handleResetView,
        rotateView: handleRotateView,
        rotation: stageRotation,
        scale: stageScale,
        getViewportCenter,
        clientToCanvas,
      }),
      [handleZoomIn, handleZoomOut, handleResetView, handleRotateView, stageRotation, stageScale, getViewportCenter, clientToCanvas]
    );

    /* ─── Scroll-wheel zoom (Konva) ─── */
    const handleWheel = useCallback(
      (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        if (!stage) return;

        const scaleBy = 1.03;
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const oldScale = stageScale;
        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        const clampedScale = Math.max(0.1, Math.min(5, newScale));

        const canvasPt = toCanvas(pointer.x, pointer.y, pos.x, pos.y, oldScale, stageRotation);
        setStageScale(clampedScale);
        setStagePos(posForCanvasPoint(canvasPt.x, canvasPt.y, pointer.x, pointer.y, clampedScale, stageRotation));
      },
      [stageScale, stagePos, stageRotation]
    );

    /* ─── Konva Stage: mousedown/touchstart — decides pan vs marquee vs draw ─── */
    const handleStagePointerDown = useCallback(
      (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const isOnStage = e.target === e.target.getStage();
        if (!isOnStage) return; // Click on a shape — Konva handles it

        const evt = e.evt as MouseEvent;
        // Only left-click or touch (button is 0 for both)
        if ("button" in evt && evt.button !== 0) return;

        hasMovedRef.current = false;

        // Get client coordinates (works for both mouse and touch)
        let clientX: number, clientY: number;
        if ("touches" in e.evt && (e.evt as TouchEvent).touches.length > 0) {
          const touch = (e.evt as TouchEvent).touches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          clientX = (e.evt as MouseEvent).clientX;
          clientY = (e.evt as MouseEvent).clientY;
        }

        // Drawing tool: don't pan, clicks are handled by handleStageClick
        if (activeTool === "draw") return;

        // Shape drawing tools: start drag
        if (isShapeTool(activeTool)) {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const canvasPoint = screenToCanvas(clientX - rect.left, clientY - rect.top);
            const snapped = { x: snapToGrid(canvasPoint.x), y: snapToGrid(canvasPoint.y) };
            setShapeStart(snapped);
            setShapePreview(null);
          }
          return;
        }

        // Marquee: multiselect tool always, or shift+select tool
        const wantMarquee =
          mode === "edit" &&
          (activeTool === "multiselect" ||
            (activeTool === "select" && "shiftKey" in evt && evt.shiftKey));
        if (wantMarquee) {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const canvasPoint = screenToCanvas(clientX - rect.left, clientY - rect.top);
            setMarqueeStart(canvasPoint);
            setMarqueeEnd(canvasPoint);
            marqueeActiveRef.current = true;
          }
          return;
        }

        // Start pan
        setIsPanning(true);
        panStartRef.current = { x: clientX, y: clientY };
        lastPointerRef.current = { x: clientX, y: clientY };
      },
      [mode, activeTool, pos, stageScale, stageRotation]
    );

    /* ─── Container: pointermove — pan or marquee ─── */
    const handleContainerPointerMove = useCallback(
      (e: React.PointerEvent) => {
        // Pan
        if (isPanning && panStartRef.current) {
          const dx = e.clientX - lastPointerRef.current.x;
          const dy = e.clientY - lastPointerRef.current.y;
          lastPointerRef.current = { x: e.clientX, y: e.clientY };

          // Check if we've moved enough to count as a drag
          const totalDx = e.clientX - panStartRef.current.x;
          const totalDy = e.clientY - panStartRef.current.y;
          if (
            !hasMovedRef.current &&
            Math.abs(totalDx) + Math.abs(totalDy) > PAN_THRESHOLD
          ) {
            hasMovedRef.current = true;
          }

          if (hasMovedRef.current) {
            setStagePos((prev) => ({
              x: (prev?.x ?? 0) + dx,
              y: (prev?.y ?? 0) + dy,
            }));
          }
          return;
        }

        // Shape drawing preview
        if (shapeStart && isShapeTool(activeTool) && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const canvasPoint = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top);
          const snapped = { x: snapToGrid(canvasPoint.x), y: snapToGrid(canvasPoint.y) };
          setShapePreview(generateShapePoints(activeTool, shapeStart, snapped));
          hasMovedRef.current = true;
          return;
        }

        // Marquee
        if (marqueeActiveRef.current && marqueeStart && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const canvasPoint = screenToCanvas(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          setMarqueeEnd(canvasPoint);
          hasMovedRef.current = true;
        }
      },
      [isPanning, marqueeStart, shapeStart, activeTool, pos, stageScale, stageRotation]
    );

    /* ─── Container: pointerup — finish pan or marquee ─── */
    const handleContainerPointerUp = useCallback(
      (e: React.PointerEvent) => {
        // Finish pan
        if (isPanning) {
          setIsPanning(false);
          panStartRef.current = null;
        }

        // Finish shape drawing
        if (shapeStart && isShapeTool(activeTool) && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const canvasPoint = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top);
          const snapped = { x: snapToGrid(canvasPoint.x), y: snapToGrid(canvasPoint.y) };
          const dist = Math.hypot(snapped.x - shapeStart.x, snapped.y - shapeStart.y);
          if (dist >= MIN_SHAPE_SIZE) {
            const points = generateShapePoints(activeTool, shapeStart, snapped);
            onAddRoom(points);
          }
          setShapeStart(null);
          setShapePreview(null);
        }

        // Finish marquee
        if (marqueeActiveRef.current && marqueeStart && marqueeEnd) {
          marqueeActiveRef.current = false;
          const x1 = marqueeStart.x;
          const y1 = marqueeStart.y;
          const x2 = marqueeEnd.x;
          const y2 = marqueeEnd.y;

          const dist = Math.abs(x2 - x1) + Math.abs(y2 - y1);
          if (dist > 5) {
            const rooms = floor?.rooms ?? [];
            const entities = floor?.entities ?? [];
            const furniture = floor?.furniture ?? [];

            const hitRoomIds = rooms
              .filter((r) => {
                const center = getRoomCenter(r.points);
                return rectContains(x1, y1, x2, y2, center.x, center.y);
              })
              .map((r) => r.id);

            const hitEntityIds = entities
              .filter((ent) => rectContains(x1, y1, x2, y2, ent.x, ent.y))
              .map((ent) => ent.id);

            const hitFurnitureIds = furniture
              .filter((f) => rectContains(x1, y1, x2, y2, f.x, f.y))
              .map((f) => f.id);

            if (hitRoomIds.length > 0 || hitEntityIds.length > 0 || hitFurnitureIds.length > 0) {
              onMarqueeSelect(hitRoomIds, hitEntityIds, activeTool === "multiselect" || e.shiftKey, hitFurnitureIds);
            }
          }

          setMarqueeStart(null);
          setMarqueeEnd(null);
        }
      },
      [isPanning, shapeStart, marqueeStart, marqueeEnd, floor, activeTool, onMarqueeSelect, onAddRoom, pos, stageScale, stageRotation, gridSize, gridEnabled]
    );

    /* ─── Container: pointerleave — cleanup ─── */
    const handleContainerPointerLeave = useCallback(() => {
      if (isPanning) {
        setIsPanning(false);
        panStartRef.current = null;
      }
      if (marqueeActiveRef.current) {
        marqueeActiveRef.current = false;
        setMarqueeStart(null);
        setMarqueeEnd(null);
      }
      if (shapeStart) {
        setShapeStart(null);
        setShapePreview(null);
      }
    }, [isPanning, shapeStart]);

    /* ─── Pinch-to-zoom (touch) on container ─── */
    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (e.touches.length >= 2) {
          e.preventDefault();
          // Stop any single-finger pan
          if (isPanning) {
            setIsPanning(false);
            panStartRef.current = null;
          }

          const t1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          const t2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
          const dist = getDistance(t1, t2);
          const midX = (t1.x + t2.x) / 2;
          const midY = (t1.y + t2.y) / 2;

          if (lastPinchRef.current) {
            const scaleFactor = dist / lastPinchRef.current.dist;
            const panDx = midX - lastPinchRef.current.midX;
            const panDy = midY - lastPinchRef.current.midY;

            // Apply zoom centered at pinch midpoint
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
              const localMidX = midX - rect.left;
              const localMidY = midY - rect.top;
              const newScale = Math.max(0.1, Math.min(5, stageScale * scaleFactor));
              const canvasPt = toCanvas(localMidX, localMidY, pos.x, pos.y, stageScale, stageRotation);
              const newPos = posForCanvasPoint(canvasPt.x, canvasPt.y, localMidX, localMidY, newScale, stageRotation);
              setStageScale(newScale);
              setStagePos({
                x: newPos.x + panDx,
                y: newPos.y + panDy,
              });
            }
          }

          lastPinchRef.current = { dist, midX, midY };
          hasMovedRef.current = true;
        } else if (e.touches.length === 1 && isPanning) {
          // Single-finger touch pan
          const touch = e.touches[0];
          const dx = touch.clientX - lastPointerRef.current.x;
          const dy = touch.clientY - lastPointerRef.current.y;
          lastPointerRef.current = { x: touch.clientX, y: touch.clientY };

          if (panStartRef.current) {
            const totalDx = touch.clientX - panStartRef.current.x;
            const totalDy = touch.clientY - panStartRef.current.y;
            if (
              !hasMovedRef.current &&
              Math.abs(totalDx) + Math.abs(totalDy) > PAN_THRESHOLD
            ) {
              hasMovedRef.current = true;
            }
          }

          if (hasMovedRef.current) {
            setStagePos((prev) => ({
              x: (prev?.x ?? 0) + dx,
              y: (prev?.y ?? 0) + dy,
            }));
          }
        }
      },
      [isPanning, stageScale, pos, stageRotation]
    );

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (e.touches.length < 2) {
          lastPinchRef.current = null;
        }
        if (e.touches.length === 0) {
          if (isPanning) {
            setIsPanning(false);
            panStartRef.current = null;
          }
        }
      },
      [isPanning]
    );

    /* ─── Konva Stage: click — draw vertex or clear selection ─── */
    const handleStageClick = useCallback(
      (e: KonvaEventObject<MouseEvent>) => {
        // Ignore if we dragged (was a pan or marquee)
        if (hasMovedRef.current) return;
        if ("button" in e.evt && e.evt.button !== 0) return;

        if (activeTool === "draw") {
          const stage = e.target.getStage();
          if (!stage) return;
          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const pt = toCanvas(pointer.x, pointer.y, pos.x, pos.y, stageScale, stageRotation);
          const x = snapToGrid(pt.x);
          const y = snapToGrid(pt.y);
          setDrawingPoints((prev) => [...prev, { x, y }]);
          return;
        }

        // Click on empty canvas → clear selection (not in multiselect mode)
        if (e.target === e.target.getStage() && activeTool !== "multiselect") {
          onClearSelection();
        }
      },
      [activeTool, pos, stageScale, stageRotation, gridSize, gridEnabled, onClearSelection]
    );

    /* ─── Konva Stage: tap (touch) — same as click ─── */
    const handleStageTap = useCallback(
      (e: KonvaEventObject<Event>) => {
        if (hasMovedRef.current) return;

        if (activeTool === "draw") {
          const stage = e.target.getStage();
          if (!stage) return;
          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const pt = toCanvas(pointer.x, pointer.y, pos.x, pos.y, stageScale, stageRotation);
          const x = snapToGrid(pt.x);
          const y = snapToGrid(pt.y);
          setDrawingPoints((prev) => [...prev, { x, y }]);
          return;
        }

        if (e.target === e.target.getStage() && activeTool !== "multiselect") {
          onClearSelection();
        }
      },
      [activeTool, pos, stageScale, stageRotation, gridSize, gridEnabled, onClearSelection]
    );

    const handleStageDblClick = useCallback(() => {
      if (activeTool !== "draw" || drawingPoints.length < 3) return;
      onAddRoom(drawingPoints);
      setDrawingPoints([]);
    }, [activeTool, drawingPoints, onAddRoom]);

    const handleMoveRoomPoint = useCallback(
      (roomId: string, pointIndex: number, x: number, y: number) => {
        const room = floor?.rooms.find((r) => r.id === roomId);
        if (!room) return;
        const newPoints = room.points.map((p, i) =>
          i === pointIndex ? { x, y } : p
        );
        onUpdateRoom(roomId, { points: newPoints });
      },
      [floor, onUpdateRoom]
    );

    const handleMoveRoomEdge = useCallback(
      (roomId: string, idxA: number, idxB: number, dx: number, dy: number) => {
        const room = floor?.rooms.find((r) => r.id === roomId);
        if (!room) return;
        const newPoints = room.points.map((p, i) =>
          i === idxA || i === idxB ? { x: p.x + dx, y: p.y + dy } : p
        );
        onUpdateRoom(roomId, { points: newPoints });
      },
      [floor, onUpdateRoom]
    );

    /* ─── HTML5 drag-and-drop (furniture only) ─── */
    const handleDragOver = useCallback((e: React.DragEvent) => {
      if (e.dataTransfer.types.includes("application/furniture-type")) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const canvasPoint = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top);
        const x = gridEnabled ? Math.round(canvasPoint.x / gridSize) * gridSize : canvasPoint.x;
        const y = gridEnabled ? Math.round(canvasPoint.y / gridSize) * gridSize : canvasPoint.y;

        const furnitureType = e.dataTransfer.getData("application/furniture-type");
        if (furnitureType) {
          e.preventDefault();
          onDropFurniture(furnitureType, x, y);
        }
      },
      [stagePos, stageScale, stageRotation, gridSize, gridEnabled, onDropFurniture]
    );

    /* ─── Pointer-based entity drag preview ─── */
    const entityDragPreview = useMemo(() => {
      if (!dragClientPos || !draggingEntityId || !containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const sx = dragClientPos.x - rect.left;
      const sy = dragClientPos.y - rect.top;
      const cp = toCanvas(sx, sy, pos.x, pos.y, stageScale, stageRotation);
      const snappedX = gridEnabled ? Math.round(cp.x / gridSize) * gridSize : cp.x;
      const snappedY = gridEnabled ? Math.round(cp.y / gridSize) * gridSize : cp.y;
      const screenPt = canvasToScreen(snappedX, snappedY, pos.x, pos.y, stageScale, stageRotation);
      return { x: screenPt.x, y: screenPt.y, canvasX: snappedX, canvasY: snappedY };
    }, [dragClientPos, draggingEntityId, pos, stageScale, stageRotation, gridSize, gridEnabled]);

    const containerWidth = containerSize.w;
    const containerHeight = containerSize.h;

    // Marquee rect in canvas coords
    const marqueeRect =
      isMarqueeActive
        ? {
            x: Math.min(marqueeStart.x, marqueeEnd.x),
            y: Math.min(marqueeStart.y, marqueeEnd.y),
            width: Math.abs(marqueeEnd.x - marqueeStart.x),
            height: Math.abs(marqueeEnd.y - marqueeStart.y),
          }
        : null;

    // Cursor logic
    const cursor = isPanning
      ? "move"
      : isMarqueeActive
        ? "crosshair"
        : activeTool === "draw" || isShapeTool(activeTool)
          ? "crosshair"
          : activeTool === "multiselect"
            ? "crosshair"
            : "default";

    return (
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        style={{
          cursor,
          backgroundColor: "var(--fp-bg)",
          touchAction: "none", // prevent browser handling touch (scroll, zoom)
        }}
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handleContainerPointerUp}
        onPointerLeave={handleContainerPointerLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FloorBackgroundDiv bg={floor?.background} isDark={isDark} />
        <Stage
          width={containerWidth}
          height={containerHeight}
          scaleX={stageScale}
          scaleY={stageScale}
          x={pos.x}
          y={pos.y}
          rotation={stageRotation}
          onWheel={handleWheel}
          onMouseDown={handleStagePointerDown as (e: KonvaEventObject<MouseEvent>) => void}
          onTouchStart={handleStagePointerDown as (e: KonvaEventObject<TouchEvent>) => void}
          onClick={handleStageClick}
          onTap={handleStageTap}
          onDblClick={handleStageDblClick}
          onDblTap={handleStageDblClick}
        >
              <Layer>
                <GridLayer
                  viewportWidth={containerWidth}
                  viewportHeight={containerHeight}
                  stageX={pos.x}
                  stageY={pos.y}
                  stageScale={stageScale}
                  gridSize={gridSize}
                  visible={gridEnabled}
                  isDark={isDark}
                />
              </Layer>
              {/* Ghost floor reference layer (edit mode only) */}
              {mode === "edit" && ghostRooms && ghostRooms.length > 0 && (
              <Layer opacity={0.15} listening={false}>
                {ghostRooms.map((room) => {
                  const flatPoints = room.points.flatMap((p) => [p.x, p.y]);
                  return (
                    <Line
                      key={room.id}
                      points={flatPoints}
                      closed
                      fill={isDark ? "#ffffff" : "#000000"}
                      stroke={isDark ? "#ffffff" : "#000000"}
                      strokeWidth={1}
                      dash={[6, 4]}
                      listening={false}
                    />
                  );
                })}
              </Layer>
              )}
              <Layer>
                <RoomLayer
                  rooms={floor?.rooms ?? []}
                  selectedRoomIds={selectedRoomIds}
                  mode={mode}
                  activeTool={activeTool}
                  drawingPoints={drawingPoints}
                  shapePreview={shapePreview}
                  onSelectRoom={onSelectRoom}
                  onMoveRoom={onMoveRoom}
                  onMoveRoomPoint={handleMoveRoomPoint}
                  onMoveRoomEdge={handleMoveRoomEdge}
                  gridSize={gridSize}
                  gridEnabled={gridEnabled}
                  isDark={isDark}
                  stageRotation={stageRotation}
                  groupDragOffset={isMultiSelect ? groupDragOffset : null}
                  onGroupDragMove={isMultiSelect ? setGroupDragOffset : undefined}
                  onGroupDragEnd={isMultiSelect ? () => setGroupDragOffset(null) : undefined}
                />
                <RoomBadgeLayer
                  rooms={floor?.rooms ?? []}
                  hass={hass}
                  isDark={isDark}
                  stageRotation={stageRotation}
                />
              </Layer>
              <Layer>
                <FurnitureLayer
                  furniture={floor?.furniture ?? []}
                  selectedFurnitureIds={selectedFurnitureIds}
                  mode={mode}
                  activeTool={activeTool}
                  onSelectFurniture={onSelectFurniture}
                  onMoveFurniture={onMoveFurniture}
                  onUpdateFurniture={onUpdateFurniture}
                  gridSize={gridSize}
                  gridEnabled={gridEnabled}
                  isDark={isDark}
                  stageRotation={stageRotation}
                  groupDragOffset={isMultiSelect ? groupDragOffset : null}
                  onGroupDragMove={isMultiSelect ? setGroupDragOffset : undefined}
                  onGroupDragEnd={isMultiSelect ? () => setGroupDragOffset(null) : undefined}
                />
              </Layer>
              <Layer>
                <EntityLayer
                  entities={floor?.entities ?? []}
                  hass={hass}
                  selectedEntityIds={selectedEntityIds}
                  mode={mode}
                  activeTool={activeTool}
                  onSelectEntity={onSelectEntity}
                  onMoveEntity={onMoveEntity}
                  gridSize={gridSize}
                  gridEnabled={gridEnabled}
                  isDark={isDark}
                  stageRotation={stageRotation}
                  groupDragOffset={isMultiSelect ? groupDragOffset : null}
                  onGroupDragMove={isMultiSelect ? setGroupDragOffset : undefined}
                  onGroupDragEnd={isMultiSelect ? () => setGroupDragOffset(null) : undefined}
                  defaultIconSize={defaultIconSize}
                  domainIconSizes={domainIconSizes}
                />
              </Layer>
          {/* Origin marker + axes — edit mode only, topmost, non-interactive */}
          {mode === "edit" && (() => {
            // Compute visible canvas bounds for infinite-looking axes
            const vLeft = -pos.x / stageScale;
            const vTop = -pos.y / stageScale;
            const vRight = vLeft + containerWidth / stageScale;
            const vBottom = vTop + containerHeight / stageScale;
            const pad = 200; // extra padding so axes don't clip during pan
            const axisColor = isDark ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.2)";
            const axisWidth = 1.5 / stageScale;
            return (
              <Layer listening={false}>
                {/* X axis */}
                <Line
                  points={[vLeft - pad, 0, vRight + pad, 0]}
                  stroke={axisColor}
                  strokeWidth={axisWidth}
                  listening={false}
                />
                {/* Y axis */}
                <Line
                  points={[0, vTop - pad, 0, vBottom + pad]}
                  stroke={axisColor}
                  strokeWidth={axisWidth}
                  listening={false}
                />
                {/* Origin dot */}
                <Circle x={0} y={0} radius={3.5} fill="#ef4444" opacity={0.75} listening={false} />
                <Text x={6} y={-4} text="0,0" fontSize={9} fill={isDark ? "#666" : "#aaa"} listening={false} />
              </Layer>
            );
          })()}
          {/* Marquee selection overlay */}
          <Layer>
            {marqueeRect && (
              <Rect
                x={marqueeRect.x}
                y={marqueeRect.y}
                width={marqueeRect.width}
                height={marqueeRect.height}
                fill={hexToRgba(BRAND, 0.08)}
                stroke={BRAND}
                strokeWidth={1 / stageScale}
                dash={[6 / stageScale, 4 / stageScale]}
                listening={false}
              />
            )}
          </Layer>
        </Stage>
        {/* Pointer-based entity drag preview */}
        {entityDragPreview && (
          <DragPreviewBadge
            x={entityDragPreview.x}
            y={entityDragPreview.y}
            isDark={isDark}
            entityId={draggingEntityId}
            hass={hass}
            iconSize={(defaultIconSize ?? 36) * 0.5 * stageScale}
          />
        )}
      </div>
    );
  }
);

/** Floating badge shown while dragging an entity over the canvas */
function DragPreviewBadge({ x, y, isDark, entityId, hass, iconSize }: {
  x: number; y: number; isDark: boolean;
  entityId?: string | null;
  hass: HomeAssistant;
  iconSize: number;
}) {
  const { resolveEntityIcon, getDomainColor } = useThemeConfig();
  const domain = entityId ? entityId.split(".")[0] : null;
  const entity = entityId ? hass.states[entityId] : undefined;
  const state = entity?.state ?? "off";
  const isActive = state === "on" || state === "open" || state === "playing";
  const resolved = domain ? resolveEntityIcon(domain, state) : null;
  const accent = domain ? getDomainColor(domain) : BRAND;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 50,
        opacity: 0.85,
      }}
    >
      {resolved ? (
        <DomIcon icon={resolved.icon} size={iconSize} fill={isActive ? accent : isDark ? "#888" : "#999"} />
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </div>
  );
}

/** Renders the floor background (color, image, or animated preset) */
const injectedKeyframes = new Set<string>();
function FloorBackgroundDiv({ bg, isDark }: { bg: FloorBackground | undefined; isDark: boolean }) {
  if (!bg || bg.type === "none") return null;

  const opacity = bg.opacity ?? 1;

  if (bg.type === "color" && bg.color) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bg.color,
          opacity,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (bg.type === "image" && bg.image) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bg.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (bg.type === "preset" && bg.preset) {
    const preset = getPreset(bg.preset);
    if (!preset) return null;

    // Inject keyframes once
    if (preset.keyframes && !injectedKeyframes.has(preset.id)) {
      const sheet = document.createElement("style");
      sheet.textContent = preset.keyframes;
      document.head.appendChild(sheet);
      injectedKeyframes.add(preset.id);
    }

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          pointerEvents: "none",
          backgroundColor: isDark ? "#111" : "#f5f5f5",
          ...preset.style,
        }}
      />
    );
  }

  return null;
}
