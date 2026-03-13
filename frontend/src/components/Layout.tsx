import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { HomeLayoutCanvas } from "./canvas/HomeLayoutCanvas";
import { BottomSheet } from "./BottomSheet";
import { SideDrawer } from "./SideDrawer";
import type { SnapPoint } from "./BottomSheet";
import { ControlPanel } from "./sidebar/ControlPanel";
import { useHomeLayout } from "../hooks/useHomeLayout";
import { useCanvasTools } from "../hooks/useCanvasTools";
import { useTheme } from "../hooks/useTheme";
import { ThemeProvider, BRAND } from "../theme";
import type { HomeAssistant, AppMode, GlobalSettings, FloorBackground, CanvasTool, EntityPlacement, FurniturePlacement, FurnitureType, DeviceType, Room } from "../types";
import type { HomeLayoutCanvasHandle } from "./canvas/HomeLayoutCanvas";

import logoSvg from "../../public/logo.svg?raw";
const logoUrl = `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const DESKTOP_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < DESKTOP_BREAKPOINT
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/** Detect device type once at mount (used for initial viewport preset, not responsive layout) */
function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < DESKTOP_BREAKPOINT) return "mobile";
  if (w < TABLET_BREAKPOINT) return "tablet";
  return "desktop";
}

interface LayoutProps {
  hass: HomeAssistant;
}

/* ─── Shared floating-UI primitives ─── */
const glass = (isDark: boolean) => ({
  backgroundColor: isDark ? "rgba(30, 30, 30, 0.92)" : "rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
});

const fabBase = (isDark: boolean): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  cursor: "pointer",
  color: isDark ? "#e1e1e1" : "#212121",
  pointerEvents: "auto",
  outline: "none",
  transition: "all 0.2s cubic-bezier(0.32, 0.72, 0, 1)",
  ...glass(isDark),
});

/** Pick a "nice" real-world distance for the bar, compute its pixel width */
function pickScaleStep(scale: number) {
  // 1 canvas unit = 1 cm → 100 canvas units = 1 m
  // screen px per meter = scale * 100
  const pxPerMeter = scale * 100;

  // Nice meter steps: 0.1m, 0.2m, 0.5m, 1m, 2m, 5m, 10m, 20m, 50m
  const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];
  // Target bar width: 60–200px on screen
  for (const m of steps) {
    const px = m * pxPerMeter;
    if (px >= 60 && px <= 200) {
      const label = m < 1 ? `${Math.round(m * 100)}cm` : `${m}m`;
      return { widthPx: px, label };
    }
  }
  const fallbackM = steps[steps.length - 1];
  return { widthPx: Math.min(200, fallbackM * pxPerMeter), label: `${fallbackM}m` };
}

function ScaleBar({ scale, isDark }: { scale: number; isDark: boolean }) {
  const { widthPx, label } = pickScaleStep(scale);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 56,
        left: 12,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 600,
          color: isDark ? "#888" : "#999",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: widthPx,
          height: 4,
          borderRadius: 2,
          backgroundColor: isDark ? "#555" : "#bbb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}

export function Layout({ hass }: LayoutProps) {
  const {
    store,
    currentFloor,
    currentFloorId,
    setCurrentFloorId,
    getAreasForFloor,
    getEntitiesForArea,
    loaded,
    addRoom,
    updateRoom,
    deleteRoom,
    moveRoom,
    moveRooms,
    moveEntities,
    addEntity,
    moveEntity,
    updateEntity,
    removeEntity,
    addFurniture,
    moveFurniture,
    updateFurniture,
    removeFurniture,
    moveFurnitureItems,
    updateFloor,
    addFavorite,
    removeFavorite,
    updateSettings,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHomeLayout(hass);

  const isMobile = useIsMobile();
  const [deviceType] = useState(getDeviceType);
  const deviceViewportPreset = store.settings.device_viewports?.[deviceType] ?? null;
  // Ghost rooms: show rooms from the floor directly below (by order) as reference
  const ghostRooms = useMemo(() => {
    if (!currentFloor || store.floors.length < 2) return null;
    const sorted = [...store.floors].sort((a, b) => a.order - b.order);
    const currentIdx = sorted.findIndex((f) => f.id === currentFloor.id);
    // Show the floor below (lower order), or above if we're at the bottom
    const refFloor = currentIdx > 0 ? sorted[currentIdx - 1] : sorted[currentIdx + 1];
    return refFloor?.rooms ?? null;
  }, [currentFloor, store.floors]);

  const { activeTool, selectTool } = useCanvasTools();
  const { isDark, preference, setTheme } = useTheme(store.settings.theme);
  const [mode, setMode] = useState<AppMode>("view");
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const [selectedEntityIds, setSelectedEntityIds] = useState<string[]>([]);
  const [selectedFurnitureIds, setSelectedFurnitureIds] = useState<string[]>([]);
  type GridMode = "none" | "xsmall" | "small" | "medium" | "large";
  const GRID_SIZES: Record<GridMode, number> = { none: 0, xsmall: 5, small: 10, medium: 20, large: 40 };
  const GRID_CYCLE: GridMode[] = ["none", "xsmall", "small", "medium", "large"];
  const GRID_LABELS: Record<GridMode, string> = { none: "", xsmall: "XS", small: "S", medium: "M", large: "L" };
  const [gridMode, setGridMode] = useState<GridMode>(
    store.settings.grid_enabled ? "medium" : "none"
  );
  const effectiveGridSize = GRID_SIZES[gridMode];
  const gridEnabled = gridMode !== "none";
  const [showAppearance, setShowAppearance] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [showShapeMenu, setShowShapeMenu] = useState(false);
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [draggingEntityId, setDraggingEntityId] = useState<string | null>(null);
  const [dragClientPos, setDragClientPos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HomeLayoutCanvasHandle>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  /* ─── Selection handlers (unchanged logic) ─── */
  const handleSelectRoom = useCallback((id: string, shiftKey: boolean) => {
    if (shiftKey) {
      setSelectedRoomIds((prev) =>
        prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
      );
    } else {
      setSelectedRoomIds([id]);
      setSelectedEntityIds([]);
      setSelectedFurnitureIds([]);
    }
  }, []);

  const handleSelectEntity = useCallback((id: string, shiftKey: boolean) => {
    if (mode === "view") {
      setShowQuickAccess(false);
      // View mode: group by entity_id (same light = same control)
      const entities = currentFloor?.entities ?? [];
      const clicked = entities.find((e) => e.id === id);
      const siblingIds = clicked
        ? entities.filter((e) => e.entity_id === clicked.entity_id).map((e) => e.id)
        : [id];

      setSelectedEntityIds((prev) =>
        prev.includes(id)
          ? prev.filter((e) => !siblingIds.includes(e))
          : [...new Set([...prev, ...siblingIds])]
      );
    } else {
      // Edit mode: select individual placement only
      if (shiftKey) {
        setSelectedEntityIds((prev) =>
          prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
      } else {
        setSelectedEntityIds([id]);
        setSelectedRoomIds([]);
        setSelectedFurnitureIds([]);
      }
    }
  }, [mode, currentFloor]);

  const handleClearSelection = useCallback(() => {
    setSelectedRoomIds([]);
    setSelectedEntityIds([]);
    setSelectedFurnitureIds([]);
  }, []);

  const handlePanelClose = useCallback(() => {
    setSelectedRoomIds([]);
    setSelectedEntityIds([]);
    setSelectedFurnitureIds([]);
    setShowAppearance(false);
    if (activeTool === "place" || activeTool === "furniture") {
      selectTool("select");
    }
  }, [activeTool, selectTool]);

  const handleMarqueeSelect = useCallback(
    (roomIds: string[], entityIds: string[], additive: boolean, furnitureIds?: string[]) => {
      if (additive) {
        setSelectedRoomIds((prev) => [...new Set([...prev, ...roomIds])]);
        setSelectedEntityIds((prev) => [...new Set([...prev, ...entityIds])]);
        if (furnitureIds) setSelectedFurnitureIds((prev) => [...new Set([...prev, ...furnitureIds])]);
      } else {
        setSelectedRoomIds(roomIds);
        setSelectedEntityIds(entityIds);
        setSelectedFurnitureIds(furnitureIds ?? []);
      }
    },
    []
  );

  const handleDeleteRoom = useCallback(
    (id: string) => {
      deleteRoom(id);
      setSelectedRoomIds([]);
    },
    [deleteRoom]
  );

  const handleRemoveEntity = useCallback(
    (id: string) => {
      removeEntity(id);
      setSelectedEntityIds([]);
    },
    [removeEntity]
  );

  const handleSelectFurniture = useCallback((id: string, shiftKey: boolean) => {
    if (shiftKey) {
      setSelectedFurnitureIds((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    } else {
      setSelectedFurnitureIds([id]);
      setSelectedRoomIds([]);
      setSelectedEntityIds([]);
    }
  }, []);

  const handleRemoveFurniture = useCallback(
    (id: string) => {
      removeFurniture(id);
      setSelectedFurnitureIds([]);
    },
    [removeFurniture]
  );

  const handleMoveSelectedFurniture = useCallback(
    (draggedId: string, newX: number, newY: number) => {
      if (selectedFurnitureIds.length > 1 && selectedFurnitureIds.includes(draggedId)) {
        const item = (currentFloor?.furniture ?? []).find((f) => f.id === draggedId);
        if (!item) return;
        const dx = newX - item.x;
        const dy = newY - item.y;
        moveFurnitureItems(selectedFurnitureIds, dx, dy);
      } else {
        moveFurniture(draggedId, newX, newY);
      }
    },
    [selectedFurnitureIds, currentFloor, moveFurniture, moveFurnitureItems]
  );

  const handleDropFurniture = useCallback(
    (type: string, x: number, y: number) => {
      const placement = addFurniture(type as FurnitureType, x, y, undefined, gridEnabled ? effectiveGridSize : undefined);
      if (placement) {
        setSelectedFurnitureIds([placement.id]);
        setSelectedRoomIds([]);
        setSelectedEntityIds([]);
      }
    },
    [addFurniture]
  );

  const handleDropEntity = useCallback(
    (entityId: string, x: number, y: number) => {
      const placement = addEntity(entityId, x, y);
      if (placement) {
        setSelectedEntityIds([placement.id]);
        setSelectedRoomIds([]);
      }
    },
    [addEntity]
  );

  const handleTapPlaceEntity = useCallback(
    (entityId: string) => {
      const center = canvasRef.current?.getViewportCenter();
      if (!center) return;
      // Snap to grid
      const gs = store.settings.grid_size;
      const x = Math.round(center.x / gs) * gs;
      const y = Math.round(center.y / gs) * gs;
      handleDropEntity(entityId, x, y);
    },
    [handleDropEntity, store.settings.grid_size]
  );

  const handleUpdateFloorBackground = useCallback(
    (bg: FloorBackground) => {
      if (!currentFloorId) return;
      updateFloor(currentFloorId, { background: bg });
    },
    [currentFloorId, updateFloor]
  );

  /* ─── Pointer-based entity drag (no browser badge) ─── */
  const handleEntityDragStart = useCallback((entityId: string) => {
    setDraggingEntityId(entityId);
  }, []);

  useEffect(() => {
    if (!draggingEntityId) return;

    const onMove = (e: PointerEvent) => {
      setDragClientPos({ x: e.clientX, y: e.clientY });
    };
    const onUp = (e: PointerEvent) => {
      const pt = canvasRef.current?.clientToCanvas(e.clientX, e.clientY);
      if (pt) {
        handleDropEntity(draggingEntityId, pt.x, pt.y);
      }
      setDraggingEntityId(null);
      setDragClientPos(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [draggingEntityId, handleDropEntity]);

  const handleMoveSelectedRooms = useCallback(
    (draggedId: string, dx: number, dy: number) => {
      if (selectedRoomIds.length > 1 && selectedRoomIds.includes(draggedId)) {
        moveRooms(selectedRoomIds, dx, dy);
      } else {
        moveRoom(draggedId, dx, dy);
      }
    },
    [selectedRoomIds, moveRoom, moveRooms]
  );

  const handleMoveSelectedEntities = useCallback(
    (draggedId: string, newX: number, newY: number) => {
      if (selectedEntityIds.length > 1 && selectedEntityIds.includes(draggedId)) {
        const entity = currentFloor?.entities.find((e) => e.id === draggedId);
        if (!entity) return;
        const dx = newX - entity.x;
        const dy = newY - entity.y;
        moveEntities(selectedEntityIds, dx, dy);
      } else {
        moveEntity(draggedId, newX, newY);
      }
    },
    [selectedEntityIds, currentFloor, moveEntity, moveEntities]
  );

  const handleDeleteSelected = useCallback(() => {
    if (mode !== "edit" || !currentFloor) return;
    const roomSet = new Set(selectedRoomIds);
    const entitySet = new Set(selectedEntityIds);
    const furnitureSet = new Set(selectedFurnitureIds);
    updateFloor(currentFloor.id, {
      rooms: currentFloor.rooms.filter((r) => !roomSet.has(r.id)),
      entities: currentFloor.entities.filter((e) => !entitySet.has(e.id)),
      furniture: (currentFloor.furniture ?? []).filter((f) => !furnitureSet.has(f.id)),
    });
    setSelectedRoomIds([]);
    setSelectedEntityIds([]);
    setSelectedFurnitureIds([]);
  }, [mode, currentFloor, selectedRoomIds, selectedEntityIds, selectedFurnitureIds, updateFloor]);

  /* ─── Clipboard for copy/paste rooms, entities & furniture ─── */
  const roomClipboardRef = useRef<Room[]>([]);
  const clipboardRef = useRef<EntityPlacement[]>([]);
  const furnitureClipboardRef = useRef<FurniturePlacement[]>([]);

  /* ─── Keyboard shortcuts ─── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "z") || (e.shiftKey && e.key === "Z"))
      ) {
        e.preventDefault();
        redo();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && mode === "edit") {
        handleDeleteSelected();
      }
      if (e.key === "Escape") {
        setSelectedRoomIds([]);
        setSelectedEntityIds([]);
        setSelectedFurnitureIds([]);
        setShowAppearance(false);
        setShowQuickAccess(false);
        setShowShapeMenu(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "a" && mode === "edit") {
        e.preventDefault();
        const roomIds = currentFloor?.rooms.map((r) => r.id) ?? [];
        const entityIds = currentFloor?.entities.map((ei) => ei.id) ?? [];
        const furnitureIds = (currentFloor?.furniture ?? []).map((f) => f.id);
        setSelectedRoomIds(roomIds);
        setSelectedEntityIds(entityIds);
        setSelectedFurnitureIds(furnitureIds);
      }
      // Copy selected rooms, entities and furniture
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && mode === "edit") {
        const rooms = currentFloor?.rooms ?? [];
        const selectedRms = rooms.filter((r) => selectedRoomIds.includes(r.id));
        roomClipboardRef.current = selectedRms;

        const entities = currentFloor?.entities ?? [];
        const selected = entities.filter((ent) => selectedEntityIds.includes(ent.id));
        clipboardRef.current = selected;

        const furniture = currentFloor?.furniture ?? [];
        const selectedFurn = furniture.filter((f) => selectedFurnitureIds.includes(f.id));
        furnitureClipboardRef.current = selectedFurn;
      }
      // Paste copied rooms, entities and furniture (offset by 20px)
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && mode === "edit" && currentFloor) {
        e.preventDefault();
        const PASTE_OFFSET = 20;

        // Paste rooms
        const newRoomIds: string[] = [];
        const newRooms: Room[] = [];
        for (const src of roomClipboardRef.current) {
          const newRoom: Room = {
            ...src,
            id: generateId(),
            name: `${src.name} (copy)`,
            ha_area_id: null,
            points: src.points.map((p) => ({ x: p.x + PASTE_OFFSET, y: p.y + PASTE_OFFSET })),
          };
          newRooms.push(newRoom);
          newRoomIds.push(newRoom.id);
        }
        if (newRooms.length > 0) {
          updateFloor(currentFloor.id, {
            rooms: [...currentFloor.rooms, ...newRooms],
          });
        }

        // Paste entities
        const newEntityIds: string[] = [];
        for (const src of clipboardRef.current) {
          const placement = addEntity(src.entity_id, src.x + PASTE_OFFSET, src.y + PASTE_OFFSET);
          if (placement) newEntityIds.push(placement.id);
        }

        // Paste furniture
        const newFurnitureIds: string[] = [];
        for (const src of furnitureClipboardRef.current) {
          const placement = addFurniture(src.type, src.x + PASTE_OFFSET, src.y + PASTE_OFFSET, {
            width: src.width, height: src.height, rotation: src.rotation,
          }, gridEnabled ? effectiveGridSize : undefined);
          if (placement) newFurnitureIds.push(placement.id);
        }

        setSelectedRoomIds(newRoomIds);
        setSelectedEntityIds(newEntityIds);
        setSelectedFurnitureIds(newFurnitureIds);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, handleDeleteSelected, mode, currentFloor, selectedRoomIds, selectedEntityIds, selectedFurnitureIds, addEntity, addFurniture, updateFloor, gridEnabled, effectiveGridSize]);

  const handleToggleMode = useCallback(() => {
    setMode((m) => {
      const next = m === "view" ? "edit" : "view";
      if (next === "view") {
        selectTool("select");
        setSelectedRoomIds([]);
        setSelectedEntityIds([]);
        setSelectedFurnitureIds([]);
        setShowAppearance(false);
        setShowShapeMenu(false);
      }
      setShowQuickAccess(false);
      return next;
    });
  }, [selectTool]);

  const handleSetTheme = useCallback(
    (theme: GlobalSettings["theme"]) => {
      setTheme(theme);
      updateSettings({ theme });
    },
    [setTheme, updateSettings]
  );

  /* ─── Theme CSS variables ─── */
  const activeFontFamily = '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const accentVars = {
    "--fp-accent": BRAND,
    "--fp-font": activeFontFamily,
  };
  const themeVars: React.CSSProperties = isDark
    ? ({
        "--fp-bg": "#1c1c1c",
        "--fp-card": "#252525",
        "--fp-text": "#e1e1e1",
        "--fp-text-secondary": "#9e9e9e",
        "--fp-border": "#3a3a3a",
        "--fp-hover": "#333333",
        "--fp-room-fill": "#2a2a2a",
        "--fp-room-stroke": "#888888",
        "--fp-room-label": "#cccccc",
        "--fp-grid": "#333333",
        ...accentVars,
      } as React.CSSProperties)
    : ({
        "--fp-bg": "#f5f5f5",
        "--fp-card": "#ffffff",
        "--fp-text": "#212121",
        "--fp-text-secondary": "#727272",
        "--fp-border": "#e0e0e0",
        "--fp-hover": "#f0f0f0",
        "--fp-room-fill": "#e8e8e8",
        "--fp-room-stroke": "#000000",
        "--fp-room-label": "#333333",
        "--fp-grid": "#e0e0e0",
        ...accentVars,
      } as React.CSSProperties);

  const themeWrapper = (content: React.ReactNode) => (
    <ThemeProvider
      themeConfigId={store.settings.theme_config_id}
      iconPackId={store.settings.icon_pack_id}
      domainColors={store.settings.domain_colors}
      domainIcons={store.settings.domain_icons}
      furnitureIcons={store.settings.furniture_icons}
    >
      {content}
    </ThemeProvider>
  );

  /* ─── Loading / empty states ─── */
  if (!loaded) {
    return themeWrapper(
      <div
        style={{
          ...themeVars,
          fontFamily: activeFontFamily,
          backgroundColor: "var(--fp-bg)",
          color: "var(--fp-text)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--fp-text-secondary)" }}>Loading...</p>
      </div>
    );
  }

  if (store.floors.length === 0) {
    return themeWrapper(
      <div
        style={{
          ...themeVars,
          fontFamily: activeFontFamily,
          backgroundColor: "var(--fp-bg)",
          color: "var(--fp-text)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>HomeLayout</h1>
        <p style={{ color: "var(--fp-text-secondary)" }}>No floors found in Home Assistant.</p>
        <p style={{ fontSize: 13, color: "var(--fp-text-secondary)" }}>
          Go to Settings &rarr; Areas & zones &rarr; Floors to create floors.
        </p>
      </div>
    );
  }

  /* ─── Derived state ─── */
  const floorAreas = getAreasForFloor(currentFloor?.ha_floor_id ?? null);
  const multiCount = selectedRoomIds.length + selectedEntityIds.length + selectedFurnitureIds.length;
  const hasEntity = selectedEntityIds.length === 1;
  const hasRoom = selectedRoomIds.length === 1;
  const hasFurniture = selectedFurnitureIds.length === 1;

  // Bottom sheet snap logic
  const viewHasSelection = mode === "view" && (hasEntity || multiCount > 1);
  const viewShowQuickAccess = mode === "view" && !viewHasSelection && showQuickAccess;
  const editShowAppearance = mode === "edit" && showAppearance;
  const sheetSnap: SnapPoint = editShowAppearance
    ? "half"
    : viewHasSelection
      ? "peek"
      : viewShowQuickAccess
        ? "peek"
        : mode === "edit" && (activeTool === "place" || activeTool === "furniture")
          ? "half"
          : mode === "edit" && multiCount > 1
            ? "half"
            : mode === "edit" && (hasRoom || hasEntity || hasFurniture)
              ? "half"
              : "hidden";

  // Has content to show in ControlPanel?
  const panelHasContent =
    editShowAppearance ||
    viewHasSelection ||
    viewShowQuickAccess ||
    (mode === "edit" &&
      (activeTool === "place" || activeTool === "furniture" || multiCount > 1 || hasRoom || hasEntity || hasFurniture));

  // Helper text
  const helperText =
    mode === "edit" && activeTool === "draw"
      ? "Click to place vertices, double-click to finish"
      : mode === "edit" && activeTool === "draw-rect"
        ? "Click and drag to draw a rectangle"
        : mode === "edit" && activeTool === "draw-circle"
          ? "Click and drag to draw a circle"
          : mode === "edit" && activeTool === "draw-triangle"
            ? "Click and drag to draw a triangle"
            : mode === "edit" && activeTool === "place"
              ? "Drag an entity from the list onto the canvas"
              : mode === "edit" && activeTool === "furniture"
                ? "Drag furniture from the list onto the canvas"
                : mode === "edit" && activeTool === "multiselect"
                  ? "Drag to select, click items to add/remove"
                  : null;

  /* ─── Tool button helper ─── */
  const toolBtn = (
    tool: CanvasTool,
    icon: React.ReactNode,
    label: string,
    isActive: boolean
  ) => (
    <button
      key={tool}
      onClick={() => selectTool(activeTool === tool ? "select" : tool)}
      title={label}
      style={{
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 17,
        cursor: "pointer",
        border: "none",
        outline: "none",
        backgroundColor: isActive ? BRAND : "transparent",
        color: isActive ? "#fff" : isDark ? "#e1e1e1" : "#212121",
        transition: "all 0.15s",
      }}
    >
      {icon}
    </button>
  );

  const actionBtn = (
    onClick: () => void,
    icon: string,
    disabled: boolean,
    title: string
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 17,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        color: isDark ? "#e1e1e1" : "#212121",
        opacity: disabled ? 0.3 : 1,
        transition: "opacity 0.15s",
      }}
    >
      {icon}
    </button>
  );

  /* ─── Render ─── */
  return themeWrapper(
    <div
      style={{
        ...themeVars,
        fontFamily: activeFontFamily,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "var(--fp-bg)",
        color: "var(--fp-text)",
      }}
    >
      {/* ── Full-screen canvas ── */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        <HomeLayoutCanvas
          ref={canvasRef}
          floor={currentFloor}
          mode={mode}
          activeTool={activeTool}
          selectedRoomIds={selectedRoomIds}
          selectedEntityIds={selectedEntityIds}
          onSelectRoom={handleSelectRoom}
          onSelectEntity={handleSelectEntity}
          onClearSelection={handleClearSelection}
          onMarqueeSelect={handleMarqueeSelect}
          onAddRoom={addRoom}
          onMoveRoom={handleMoveSelectedRooms}
          onMoveEntity={handleMoveSelectedEntities}
          onUpdateRoom={updateRoom}
          onDropEntity={handleDropEntity}
          selectedFurnitureIds={selectedFurnitureIds}
          onSelectFurniture={handleSelectFurniture}
          onMoveFurniture={handleMoveSelectedFurniture}
          onUpdateFurniture={updateFurniture}
          onDropFurniture={handleDropFurniture}
          onDefaultViewChange={setIsDefaultView}
          onScaleChange={setCanvasScale}
          hass={hass}
          gridSize={gridEnabled ? effectiveGridSize : 20}
          gridEnabled={mode === "edit" && gridEnabled}
          isDark={isDark}
          defaultIconSize={store.settings.default_icon_size}
          domainIconSizes={store.settings.domain_icon_sizes}
          draggingEntityId={draggingEntityId}
          dragClientPos={dragClientPos}
          deviceViewportPreset={deviceViewportPreset}
          ghostRooms={ghostRooms}
        />
      </div>

      {/* ── Floating overlay (pointer-events: none container) ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }}>
        {/* ── Top bar ── */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* Top-left: Hamburger (mobile only) */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {isMobile && (
            <button
              onClick={(e) => {
                e.currentTarget.dispatchEvent(
                  new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true })
                );
              }}
              style={{
                ...fabBase(isDark),
                width: 40,
                height: 40,
                flexShrink: 0,
              }}
              title="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          )}
          </div>

          {/* Top-right: Quick Access + Settings + Edit/Done */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {mode === "view" && (
              <button
                onClick={() => {
                  setShowQuickAccess((s) => !s);
                  setShowAppearance(false);
                }}
                title="Quick Access"
                style={{
                  ...fabBase(isDark),
                  width: 40,
                  height: 40,
                  fontSize: 16,
                  backgroundColor: showQuickAccess
                    ? BRAND
                    : fabBase(isDark).backgroundColor,
                  color: showQuickAccess ? "#fff" : fabBase(isDark).color,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
              </button>
            )}
            <button
              onClick={handleToggleMode}
              title={mode === "edit" ? "Done" : "Edit"}
              style={{
                ...fabBase(isDark),
                width: 40,
                height: 40,
                fontSize: 16,
                backgroundColor:
                  mode === "edit" ? BRAND : fabBase(isDark).backgroundColor,
                color: mode === "edit" ? "#fff" : fabBase(isDark).color,
              }}
            >
              {mode === "edit" ? "\u2713" : "\u270E"}
            </button>
          </div>
        </div>

        {/* ── Helper text toast ── */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: "50%",
            transform: `translateX(-50%) translateY(${helperText ? 0 : -8}px)`,
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: 12,
            whiteSpace: "nowrap",
            color: isDark ? "#9e9e9e" : "#727272",
            pointerEvents: "none",
            opacity: helperText ? 1 : 0,
            transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            ...glass(isDark),
          }}
        >
          {helperText ?? "\u00A0"}
        </div>

        {/* ── Left: Edit tools ── */}
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: `translateY(-50%) translateX(${mode === "edit" ? 0 : -20}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              pointerEvents: mode === "edit" ? "auto" : "none",
              opacity: mode === "edit" ? 1 : 0,
              transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            {/* Tool group */}
            <div
              style={{
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                ...glass(isDark),
              }}
            >
              {/* Draw Shape — with submenu */}
              <div>
                <button
                  onClick={() => {
                    const isDrawing = activeTool === "draw" || activeTool === "draw-rect" || activeTool === "draw-circle" || activeTool === "draw-triangle";
                    if (isDrawing) {
                      selectTool("select");
                      setShowShapeMenu(false);
                    } else {
                      setShowShapeMenu((s) => !s);
                    }
                  }}
                  title="Draw Shape"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px 12px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    backgroundColor: (activeTool === "draw" || activeTool === "draw-rect" || activeTool === "draw-circle" || activeTool === "draw-triangle") ? BRAND : "transparent",
                    color: (activeTool === "draw" || activeTool === "draw-rect" || activeTool === "draw-circle" || activeTool === "draw-triangle") ? "#fff" : isDark ? "#e1e1e1" : "#212121",
                    transition: "all 0.15s",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" /></svg>
                </button>
                {/* Shape submenu flyout — positioned relative to tool group */}
                {showShapeMenu && (
                  <div
                    style={{
                      position: "absolute",
                      left: 50,
                      top: 0,
                      zIndex: 20,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 12,
                      overflow: "hidden",
                      ...glass(isDark),
                    }}
                  >
                    {([
                      ["draw", "Freeform", <svg key="f" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" /></svg>],
                      ["draw-rect", "Rectangle", <svg key="r" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /></svg>],
                      ["draw-circle", "Circle", <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>],
                      ["draw-triangle", "Triangle", <svg key="t" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 3 22 21 2 21" /></svg>],
                    ] as [CanvasTool, string, React.ReactNode][]).map(([tool, label, icon], i, arr) => (
                      <div key={tool}>
                        <button
                          onClick={() => {
                            selectTool(activeTool === tool ? "select" : tool);
                            setShowShapeMenu(false);
                          }}
                          title={label}
                          style={{
                            width: "auto",
                            minWidth: 120,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "0 12px",
                            fontSize: 12,
                            cursor: "pointer",
                            border: "none",
                            outline: "none",
                            backgroundColor: activeTool === tool ? BRAND : "transparent",
                            color: activeTool === tool ? "#fff" : isDark ? "#e1e1e1" : "#212121",
                            transition: "all 0.15s",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {icon}
                          {label}
                        </button>
                        {i < arr.length - 1 && (
                          <div style={{ height: 1, backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                style={{
                  height: 1,
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                }}
              />
              {toolBtn("place", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, "Place Entity", activeTool === "place")}
              <div
                style={{
                  height: 1,
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                }}
              />
              {toolBtn("furniture", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" /><path d="M4 18v2" /><path d="M20 18v2" /></svg>, "Furniture", activeTool === "furniture")}
              <div
                style={{
                  height: 1,
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                }}
              />
              {toolBtn("multiselect", "\u2B1A", "Multi Select", activeTool === "multiselect")}
              <div
                style={{
                  height: 1,
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                }}
              />
              <button
                onClick={() => {
                  const idx = GRID_CYCLE.indexOf(gridMode);
                  setGridMode(GRID_CYCLE[(idx + 1) % GRID_CYCLE.length]);
                }}
                title={`Grid: ${gridMode}`}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "0 0 12px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  backgroundColor: gridEnabled ? BRAND : "transparent",
                  color: gridEnabled ? "#fff" : isDark ? "#e1e1e1" : "#212121",
                  transition: "all 0.15s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
                {gridEnabled && (
                  <span style={{ fontSize: 7, fontWeight: 600, lineHeight: 1, letterSpacing: 0.3, textTransform: "uppercase" }}>
                    {GRID_LABELS[gridMode]}
                  </span>
                )}
              </button>
            </div>

            {/* Undo/Redo group */}
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...glass(isDark),
              }}
            >
              {actionBtn(undo, "\u21A9", !canUndo, "Undo (Ctrl+Z)")}
              <div
                style={{
                  height: 1,
                  backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                }}
              />
              {actionBtn(redo, "\u21AA", !canRedo, "Redo (Ctrl+Y)")}
            </div>

            {/* Settings */}
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...glass(isDark),
              }}
            >
              <button
                onClick={() => setShowAppearance((s) => !s)}
                title="Appearance"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  backgroundColor: showAppearance ? BRAND : "transparent",
                  color: showAppearance ? "#fff" : isDark ? "#e1e1e1" : "#212121",
                  transition: "all 0.15s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

        {/* ── Right: Reset + Zoom ── */}
        <div
          style={{
            position: "absolute",
            right: !isMobile && panelHasContent ? 388 : 12,
            bottom: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            pointerEvents: "auto",
            transition: "right 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Reset view — only when not at default */}
            <button
              onClick={() => canvasRef.current?.resetView()}
              title="Reset view"
              style={{
                ...fabBase(isDark),
                width: 40,
                height: 40,
                fontSize: 16,
                opacity: isDefaultView ? 0 : 1,
                transform: `scale(${isDefaultView ? 0.8 : 1})`,
                transition: "opacity 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                pointerEvents: isDefaultView ? "none" : "auto",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

          {/* Rotate */}
          <button
            onClick={() => canvasRef.current?.rotateView()}
            title="Rotate 90°"
            style={{
              ...fabBase(isDark),
              width: 40,
              height: 40,
              fontSize: 16,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </button>

          {/* Zoom group */}
          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              ...glass(isDark),
            }}
          >
            <button
              onClick={() => canvasRef.current?.zoomIn()}
              title="Zoom in"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 300,
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: isDark ? "#e1e1e1" : "#212121",
              }}
            >
              +
            </button>
            <div
              style={{
                height: 1,
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}
            />
            <button
              onClick={() => canvasRef.current?.zoomOut()}
              title="Zoom out"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 300,
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: isDark ? "#e1e1e1" : "#212121",
              }}
            >
              &minus;
            </button>
          </div>
        </div>

        {/* ── Bottom-center: Floor switcher ── */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 2,
            padding: 3,
            borderRadius: 14,
            pointerEvents: "auto",
            overflow: "auto",
            maxWidth: "calc(100% - 120px)",
            ...glass(isDark),
          }}
        >
          {store.floors.map((floor) => {
            const isActive = floor.id === currentFloorId;
            return (
              <button
                key={floor.id}
                onClick={() => setCurrentFloorId(floor.id)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 11,
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "inherit",
                  backgroundColor: isActive ? BRAND : "transparent",
                  color: isActive ? "#fff" : isDark ? "#e1e1e1" : "#212121",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                {floor.name}
              </button>
            );
          })}
        </div>

        {/* ── Bottom-left: Scale bar (edit mode only) ── */}
        {mode === "edit" && <ScaleBar scale={canvasScale} isDark={isDark} />}

        {/* ── Bottom-left: Logo ── */}
        <a
          href="https://github.com/florisheyvaert/HomeLayout"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            pointerEvents: "auto",
            opacity: 0.7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            gap: 2,
          }}
        >
          <img
            src={logoUrl}
            alt="HomeLayout"
            style={{ height: 32, width: "auto" }}
          />
        </a>

        {/* ── Panel: bottom sheet on mobile, side drawer on desktop ── */}
        {isMobile ? (
          <BottomSheet targetSnap={sheetSnap} isDark={isDark}>
            {panelHasContent && (
              <ControlPanel
                mode={mode}
                activeTool={activeTool}
                floor={currentFloor}
                selectedRoomIds={selectedRoomIds}
                selectedEntityIds={selectedEntityIds}
                onUpdateRoom={updateRoom}
                onDeleteRoom={handleDeleteRoom}
                onUpdateEntity={updateEntity}
                onRemoveEntity={handleRemoveEntity}
                onDeleteSelected={handleDeleteSelected}
                haAreas={floorAreas}
                hass={hass}
                isDark={isDark}
                showAppearance={editShowAppearance}
                settings={store.settings}
                onUpdateSettings={updateSettings}
                themePreference={preference}
                onSetTheme={handleSetTheme}
                getEntitiesForArea={getEntitiesForArea}
                onAddEntity={addEntity}
                favorites={store.favorites}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                selectedFurnitureIds={selectedFurnitureIds}
                onUpdateFurniture={updateFurniture}
                onRemoveFurniture={handleRemoveFurniture}
                isMobile={true}
                onTapPlace={handleTapPlaceEntity}
                onDragStartEntity={handleEntityDragStart}
                floorBackground={currentFloor?.background}
                onUpdateFloorBackground={handleUpdateFloorBackground}
                onClose={handlePanelClose}
              />
            )}
          </BottomSheet>
        ) : (
          <SideDrawer targetSnap={sheetSnap} isDark={isDark}>
            {panelHasContent && (
              <ControlPanel
                mode={mode}
                activeTool={activeTool}
                floor={currentFloor}
                selectedRoomIds={selectedRoomIds}
                selectedEntityIds={selectedEntityIds}
                onUpdateRoom={updateRoom}
                onDeleteRoom={handleDeleteRoom}
                onUpdateEntity={updateEntity}
                onRemoveEntity={handleRemoveEntity}
                onDeleteSelected={handleDeleteSelected}
                haAreas={floorAreas}
                hass={hass}
                isDark={isDark}
                showAppearance={editShowAppearance}
                settings={store.settings}
                onUpdateSettings={updateSettings}
                themePreference={preference}
                onSetTheme={handleSetTheme}
                getEntitiesForArea={getEntitiesForArea}
                onAddEntity={addEntity}
                favorites={store.favorites}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
                selectedFurnitureIds={selectedFurnitureIds}
                onUpdateFurniture={updateFurniture}
                onRemoveFurniture={handleRemoveFurniture}
                isMobile={false}
                onDragStartEntity={handleEntityDragStart}
                floorBackground={currentFloor?.background}
                onUpdateFloorBackground={handleUpdateFloorBackground}
                onClose={handlePanelClose}
              />
            )}
          </SideDrawer>
        )}
      </div>
    </div>
  );
}
