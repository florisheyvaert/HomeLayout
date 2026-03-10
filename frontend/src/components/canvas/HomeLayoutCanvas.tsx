import { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Circle, Text, Line } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { GridLayer } from "./GridLayer";
import { RoomLayer } from "./RoomLayer";
import { EntityLayer } from "./EntityLayer";
import { FurnitureLayer } from "./FurnitureLayer";
import { useThemeConfig, BRAND } from "../../theme";
import type { FloorConfig, Point, CanvasTool, AppMode, Room, HomeAssistant, FurniturePlacement } from "../../types";

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
  hass: HomeAssistant;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  defaultIconSize?: number;
  domainIconSizes?: Record<string, number>;
}

const ZOOM_STEP = 1.3;
const PAN_THRESHOLD = 4; // px movement before it counts as a drag
const QUERY_DEBOUNCE_MS = 400;

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
      onDropEntity,
      selectedFurnitureIds,
      onSelectFurniture,
      onMoveFurniture,
      onUpdateFurniture,
      onDropFurniture,
      onDefaultViewChange,
      hass,
      gridSize,
      gridEnabled,
      isDark,
      defaultIconSize,
      domainIconSizes,
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
      return vp.scale ?? 1;
    });
    const [stageRotation, setStageRotation] = useState(() => {
      const vp = readViewportParams();
      return vp.rotation ?? 0;
    });
    const [drawingPoints, setDrawingPoints] = useState<Point[]>([]);
    const [isPanning, setIsPanning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
      const isDefault =
        stageRotation === 0 &&
        Math.abs(stageScale - 1) < 0.01 &&
        Math.abs(stagePos.x - defaultX) < 2 &&
        Math.abs(stagePos.y - defaultY) < 2;
      onDefaultViewChange(isDefault);
    }, [stagePos, stageScale, stageRotation, onDefaultViewChange]);

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
      setStageScale(1);
      setStageRotation(0);
      setStagePos({ x: cx, y: cy });
    }, []);

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

    useImperativeHandle(
      ref,
      () => ({
        zoomIn: handleZoomIn,
        zoomOut: handleZoomOut,
        resetView: handleResetView,
        rotateView: handleRotateView,
        rotation: stageRotation,
      }),
      [handleZoomIn, handleZoomOut, handleResetView, handleRotateView, stageRotation]
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
      [isPanning, marqueeStart, pos, stageScale, stageRotation]
    );

    /* ─── Container: pointerup — finish pan or marquee ─── */
    const handleContainerPointerUp = useCallback(
      (e: React.PointerEvent) => {
        // Finish pan
        if (isPanning) {
          setIsPanning(false);
          panStartRef.current = null;
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
      [isPanning, marqueeStart, marqueeEnd, floor, activeTool, onMarqueeSelect]
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
    }, [isPanning]);

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

    /* ─── Drag-and-drop entity placement ─── */
    const handleDragOver = useCallback((e: React.DragEvent) => {
      if (e.dataTransfer.types.includes("application/entity-id") ||
          e.dataTransfer.types.includes("application/furniture-type")) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const canvasPoint = screenToCanvas(e.clientX - rect.left, e.clientY - rect.top);
        const x = gridEnabled
          ? Math.round(canvasPoint.x / gridSize) * gridSize
          : canvasPoint.x;
        const y = gridEnabled
          ? Math.round(canvasPoint.y / gridSize) * gridSize
          : canvasPoint.y;

        const entityId = e.dataTransfer.getData("application/entity-id");
        if (entityId) {
          e.preventDefault();
          onDropEntity(entityId, x, y);
          return;
        }

        const furnitureType = e.dataTransfer.getData("application/furniture-type");
        if (furnitureType) {
          e.preventDefault();
          onDropFurniture(furnitureType, x, y);
          return;
        }
      },
      [stagePos, stageScale, stageRotation, gridSize, gridEnabled, onDropEntity, onDropFurniture]
    );

    const containerWidth = containerRef.current?.clientWidth ?? 800;
    const containerHeight = containerRef.current?.clientHeight ?? 600;

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
        : activeTool === "draw"
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
          <Layer>
            <RoomLayer
              rooms={floor?.rooms ?? []}
              selectedRoomIds={selectedRoomIds}
              mode={mode}
              activeTool={activeTool}
              drawingPoints={drawingPoints}
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
      </div>
    );
  }
);
