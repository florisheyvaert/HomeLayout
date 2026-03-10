import { useCallback, useState, useEffect, useRef } from "react";
import { HomeLayoutCanvas } from "./canvas/HomeLayoutCanvas";
import { BottomSheet } from "./BottomSheet";
import { SideDrawer } from "./SideDrawer";
import type { SnapPoint } from "./BottomSheet";
import { ControlPanel } from "./sidebar/ControlPanel";
import { useHomeLayout } from "../hooks/useHomeLayout";
import { useCanvasTools } from "../hooks/useCanvasTools";
import { useTheme } from "../hooks/useTheme";
import { ThemeProvider, BRAND } from "../theme";
import type { HomeAssistant, AppMode, GlobalSettings, CanvasTool, EntityPlacement, FurniturePlacement, FurnitureType } from "../types";
import type { HomeLayoutCanvasHandle } from "./canvas/HomeLayoutCanvas";

const DESKTOP_BREAKPOINT = 768;

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
  transition: "background 0.15s",
  ...glass(isDark),
});

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
    addFavorite,
    removeFavorite,
    updateSettings,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHomeLayout(hass);

  const isMobile = useIsMobile();
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
  const [isDefaultView, setIsDefaultView] = useState(true);
  const canvasRef = useRef<HomeLayoutCanvasHandle>(null);

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
    if (mode !== "edit") return;
    for (const id of selectedRoomIds) deleteRoom(id);
    for (const id of selectedEntityIds) removeEntity(id);
    for (const id of selectedFurnitureIds) removeFurniture(id);
    setSelectedRoomIds([]);
    setSelectedEntityIds([]);
    setSelectedFurnitureIds([]);
  }, [mode, selectedRoomIds, selectedEntityIds, selectedFurnitureIds, deleteRoom, removeEntity, removeFurniture]);

  /* ─── Clipboard for copy/paste entities & furniture ─── */
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
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleDeleteSelected();
      }
      if (e.key === "Escape") {
        setSelectedRoomIds([]);
        setSelectedEntityIds([]);
        setSelectedFurnitureIds([]);
        setShowAppearance(false);
        setShowQuickAccess(false);
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
      // Copy selected entities and furniture
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && mode === "edit") {
        const entities = currentFloor?.entities ?? [];
        const selected = entities.filter((ent) => selectedEntityIds.includes(ent.id));
        if (selected.length > 0) {
          clipboardRef.current = selected;
        }
        const furniture = currentFloor?.furniture ?? [];
        const selectedFurn = furniture.filter((f) => selectedFurnitureIds.includes(f.id));
        if (selectedFurn.length > 0) {
          furnitureClipboardRef.current = selectedFurn;
        }
      }
      // Paste copied entities and furniture (offset by 20px)
      if ((e.ctrlKey || e.metaKey) && e.key === "v" && mode === "edit") {
        e.preventDefault();
        const newEntityIds: string[] = [];
        for (const src of clipboardRef.current) {
          const placement = addEntity(src.entity_id, src.x + 20, src.y + 20);
          if (placement) newEntityIds.push(placement.id);
        }
        const newFurnitureIds: string[] = [];
        for (const src of furnitureClipboardRef.current) {
          const placement = addFurniture(src.type, src.x + 20, src.y + 20, {
            width: src.width, height: src.height, rotation: src.rotation,
          }, gridEnabled ? effectiveGridSize : undefined);
          if (placement) newFurnitureIds.push(placement.id);
        }
        if (newEntityIds.length > 0 || newFurnitureIds.length > 0) {
          setSelectedEntityIds(newEntityIds);
          setSelectedFurnitureIds(newFurnitureIds);
          setSelectedRoomIds([]);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, handleDeleteSelected, mode, currentFloor, selectedEntityIds, selectedFurnitureIds, addEntity, addFurniture]);

  const handleToggleMode = useCallback(() => {
    setMode((m) => {
      const next = m === "view" ? "edit" : "view";
      if (next === "view") {
        selectTool("select");
        setSelectedRoomIds([]);
        setSelectedEntityIds([]);
        setSelectedFurnitureIds([]);
        setShowAppearance(false);
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
          width: "100vw",
          height: "100vh",
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
          width: "100vw",
          height: "100vh",
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
            ? "peek"
            : mode === "edit" && (hasRoom || hasEntity || hasFurniture)
              ? "peek"
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
        width: "100vw",
        height: "100vh",
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
          hass={hass}
          gridSize={gridEnabled ? effectiveGridSize : 20}
          gridEnabled={mode === "edit" && gridEnabled}
          isDark={isDark}
          defaultIconSize={store.settings.default_icon_size}
          domainIconSizes={store.settings.domain_icon_sizes}
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
          {/* Top-left: Floor switcher */}
          <div
            style={{
              display: "flex",
              gap: 2,
              padding: 3,
              borderRadius: 14,
              pointerEvents: "auto",
              flexShrink: 1,
              minWidth: 0,
              overflow: "auto",
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
        {helperText && (
          <div
            style={{
              position: "absolute",
              top: 64,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 12,
              whiteSpace: "nowrap",
              color: isDark ? "#9e9e9e" : "#727272",
              pointerEvents: "none",
              ...glass(isDark),
            }}
          >
            {helperText}
          </div>
        )}

        {/* ── Left: Edit tools ── */}
        {mode === "edit" && (
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              pointerEvents: "auto",
            }}
          >
            {/* Tool group */}
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...glass(isDark),
              }}
            >
              {toolBtn("draw", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" /></svg>, "Draw Room", activeTool === "draw")}
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
        )}

        {/* ── Right: Reset + Zoom ── */}
        <div
          style={{
            position: "absolute",
            right: !isMobile && panelHasContent ? 388 : 12,
            bottom: isMobile ? 100 : 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            pointerEvents: "auto",
            transition: "right 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {/* Reset view — only when not at default */}
          {!isDefaultView && (
            <button
              onClick={() => canvasRef.current?.resetView()}
              title="Reset view"
              style={{
                ...fabBase(isDark),
                width: 40,
                height: 40,
                fontSize: 16,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          )}

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
            src="/logo.svg"
            alt="HomeLayout"
            style={{ height: 32, width: "auto" }}
          />
          <span
            style={{
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: 1.5,
              color: isDark ? "#555" : "#bbb",
              textTransform: "uppercase",
            }}
          >
            HomeLayout
          </span>
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
              />
            )}
          </SideDrawer>
        )}
      </div>
    </div>
  );
}
