import { useState, type ReactNode } from "react";
import type {
  FloorConfig,
  Room,
  HaArea,
  AppMode,
  HomeAssistant,
  EntityPlacement,
  FurniturePlacement,
  CanvasTool,
  GlobalSettings,
  HaEntityRegistryEntry,
  HaCategory,
  FavoriteItem,
  FloorBackground,
} from "../../types";
import { RoomEditor } from "./RoomEditor";
import { EntityBrowser } from "./EntityBrowser";
import { EntityControl } from "./EntityControl";
import { BulkControl } from "./BulkControl";
import { MultiEntityPanel } from "./MultiEntityPanel";
import { AppearanceSettings } from "./AppearanceSettings";
import { FavoritesPanel } from "./FavoritesPanel";
import { FavoriteEditor } from "./FavoriteEditor";
import { FurnitureBrowser } from "./FurnitureBrowser";
import { FurnitureControl } from "./FurnitureControl";
import { AutomationsPanel } from "./AutomationsPanel";

interface ControlPanelProps {
  mode: AppMode;
  activeTool: CanvasTool;
  floor: FloorConfig | null;
  selectedRoomIds: string[];
  selectedEntityIds: string[];
  onUpdateRoom: (id: string, updates: Partial<Room>) => void;
  onDeleteRoom: (id: string) => void;
  onUpdateEntity: (id: string, updates: Partial<EntityPlacement>) => void;
  onRemoveEntity: (id: string) => void;
  onDeleteSelected: () => void;
  haAreas: HaArea[];
  hass: HomeAssistant;
  isDark: boolean;
  showAppearance: boolean;
  settings: GlobalSettings;
  onUpdateSettings: (updates: Partial<GlobalSettings>) => void;
  themePreference: GlobalSettings["theme"];
  onSetTheme: (theme: GlobalSettings["theme"]) => void;
  getEntitiesForArea: (areaId: string | null) => HaEntityRegistryEntry[];
  onAddEntity: (entityId: string, x: number, y: number) => EntityPlacement | undefined;
  favorites: FavoriteItem[];
  onAddFavorite: (entityId: string, type: FavoriteItem["type"], label: string) => void;
  onRemoveFavorite: (id: string) => void;
  selectedFurnitureIds: string[];
  onUpdateFurniture: (id: string, updates: Partial<FurniturePlacement>) => void;
  onRemoveFurniture: (id: string) => void;
  isMobile?: boolean;
  onTapPlace?: (entityId: string) => void;
  onDragStartEntity?: (entityId: string) => void;
  floorBackground?: FloorBackground;
  onUpdateFloorBackground?: (bg: FloorBackground) => void;
  onClose?: () => void;
  /** Raw entity_ids for domain-level bulk control (from summary pills) */
  summaryDomainEntityIds?: string[] | null;
  /** Deselect a single entity by entity_id (removes all placements of that entity) */
  onDeselectEntity?: (entityId: string) => void;
  /** Deselect all entities */
  onDeselectAll?: () => void;
  /** Remove a single entity_id from the summary domain selection */
  onDeselectSummaryEntity?: (entityId: string) => void;
  /** Clear all summary domain selections */
  onClearSummaryDomain?: () => void;
  /** Show automations panel */
  showAutomations?: boolean;
  /** Entity registry for automations grouping */
  entityRegistry?: HaEntityRegistryEntry[];
  /** Automation categories */
  automationCategories?: HaCategory[];
}

export function ControlPanel({
  mode,
  activeTool,
  floor,
  selectedRoomIds,
  selectedEntityIds,
  onUpdateRoom,
  onDeleteRoom,
  onUpdateEntity,
  onRemoveEntity,
  onDeleteSelected,
  haAreas,
  hass,
  isDark,
  showAppearance,
  settings,
  onUpdateSettings,
  themePreference,
  onSetTheme,
  getEntitiesForArea,
  onAddEntity,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  selectedFurnitureIds,
  onUpdateFurniture,
  onRemoveFurniture,
  isMobile,
  onTapPlace,
  onDragStartEntity,
  floorBackground,
  onUpdateFloorBackground,
  onClose,
  summaryDomainEntityIds,
  onDeselectEntity,
  onDeselectAll,
  onDeselectSummaryEntity,
  onClearSummaryDomain,
  showAutomations,
  entityRegistry,
  automationCategories,
}: ControlPanelProps) {
  const [showFavoriteEditor, setShowFavoriteEditor] = useState(false);

  const multiSelectCount = selectedRoomIds.length + selectedEntityIds.length + selectedFurnitureIds.length;
  const selectedRoomId = selectedRoomIds.length === 1 ? selectedRoomIds[0] : null;
  const selectedEntityId = selectedEntityIds.length === 1 ? selectedEntityIds[0] : null;
  const selectedFurnitureId = selectedFurnitureIds.length === 1 ? selectedFurnitureIds[0] : null;
  const selectedRoom = floor?.rooms.find((r) => r.id === selectedRoomId);
  const selectedEntity = floor?.entities.find((e) => e.id === selectedEntityId);
  const selectedFurniture = (floor?.furniture ?? []).find((f) => f.id === selectedFurnitureId);

  // Cascade: domain size → global default
  const entityDomain = selectedEntity ? selectedEntity.entity_id.split(".")[0] : null;
  const cascadedIconSize = entityDomain
    ? (settings.domain_icon_sizes?.[entityDomain] ?? settings.default_icon_size)
    : settings.default_icon_size;

  // Close button wrapper
  const wrap = (children: ReactNode) => (
    <div style={{ position: "relative", display: "flex", flexDirection: "column" as const, flex: 1, minHeight: 0 }}>
      {onClose && (
        <button
          onClick={onClose}
          title="Close"
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            width: 28,
            height: 28,
            borderRadius: 8,
            border: "none",
            outline: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            color: isDark ? "#aaa" : "#666",
            fontSize: 14,
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
      {children}
    </div>
  );

  // Automations panel (topmost when active)
  if (showAutomations && entityRegistry && automationCategories) {
    return wrap(
      <AutomationsPanel
        hass={hass}
        isDark={isDark}
        entityRegistry={entityRegistry}
        automationCategories={automationCategories}
      />
    );
  }

  // Appearance settings panel (always on top when active)
  if (showAppearance) {
    return wrap(
      <AppearanceSettings
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        isDark={isDark}
        themePreference={themePreference}
        onSetTheme={onSetTheme}
        floorBackground={floorBackground}
        onUpdateFloorBackground={onUpdateFloorBackground}
      />
    );
  }

  // View mode
  if (mode === "view") {
    // Summary domain pill clicked → stacked individual controls
    if (summaryDomainEntityIds && summaryDomainEntityIds.length > 0 && onDeselectSummaryEntity && onClearSummaryDomain) {
      return wrap(
        <MultiEntityPanel
          entityIds={summaryDomainEntityIds}
          hass={hass}
          isDark={isDark}
          isMobile={isMobile}
          onDeselectEntity={onDeselectSummaryEntity}
          onDeselectAll={onClearSummaryDomain}
        />
      );
    }

    // Entity selection (single or multi) → stacked individual controls
    if (selectedEntityIds.length > 0 && floor) {
      // Deduplicate by entity_id (multiple placements → one control)
      const seen = new Set<string>();
      const uniqueEntityIds: string[] = [];
      for (const id of selectedEntityIds) {
        const placement = floor.entities.find((e) => e.id === id);
        if (placement && !seen.has(placement.entity_id)) {
          seen.add(placement.entity_id);
          uniqueEntityIds.push(placement.entity_id);
        }
      }

      if (uniqueEntityIds.length > 0 && onDeselectEntity && onDeselectAll) {
        return wrap(
          <MultiEntityPanel
            entityIds={uniqueEntityIds}
            hass={hass}
            isDark={isDark}
            isMobile={isMobile}
            onDeselectEntity={onDeselectEntity}
            onDeselectAll={onDeselectAll}
          />
        );
      }
    }
    // No selection → show favorites panel or editor
    if (showFavoriteEditor) {
      return wrap(
        <FavoriteEditor
          hass={hass}
          isDark={isDark}
          favorites={favorites}
          onAddFavorite={onAddFavorite}
          onClose={() => setShowFavoriteEditor(false)}
        />
      );
    }
    return wrap(
      <FavoritesPanel
        favorites={favorites}
        hass={hass}
        isDark={isDark}
        onRemoveFavorite={onRemoveFavorite}
        onShowEditor={() => setShowFavoriteEditor(true)}
      />
    );
  }

  // Edit mode: place tool -> entity browser
  if (activeTool === "place") {
    return wrap(<EntityBrowser hass={hass} isDark={isDark} isMobile={isMobile} onTapPlace={onTapPlace} onDragStartEntity={onDragStartEntity} />);
  }

  // Edit mode: furniture tool -> furniture browser
  if (activeTool === "furniture") {
    return wrap(<FurnitureBrowser isDark={isDark} />);
  }

  // Edit mode: multi-selection -> bulk control
  if (multiSelectCount > 1 && floor) {
    return wrap(
      <BulkControl
        floor={floor}
        selectedRoomIds={selectedRoomIds}
        selectedEntityIds={selectedEntityIds}
        selectedFurnitureIds={selectedFurnitureIds}
        hass={hass}
        onDeleteSelected={onDeleteSelected}
        isDark={isDark}
        isEditMode={true}
      />
    );
  }

  // Edit mode: room selected -> room editor
  if (selectedRoom && floor) {
    return wrap(
      <RoomEditor
        room={selectedRoom}
        floor={floor}
        onUpdate={onUpdateRoom}
        onDelete={onDeleteRoom}
        haAreas={haAreas}
        hass={hass}
        isDark={isDark}
        getEntitiesForArea={getEntitiesForArea}
        onAddEntity={onAddEntity}
      />
    );
  }

  // Edit mode: entity selected -> entity control
  if (selectedEntity) {
    return wrap(
      <EntityControl
        placement={selectedEntity}
        entity={hass.states[selectedEntity.entity_id]}
        hass={hass}
        onUpdate={onUpdateEntity}
        onRemove={onRemoveEntity}
        isDark={isDark}
        isEditMode={true}
        effectiveIconSize={cascadedIconSize}
      />
    );
  }

  // Edit mode: furniture selected -> furniture control
  if (selectedFurniture && floor) {
    return wrap(
      <FurnitureControl
        placement={selectedFurniture}
        gridSize={settings.grid_size}
        onUpdate={onUpdateFurniture}
        onRemove={onRemoveFurniture}
        isDark={isDark}
      />
    );
  }

  return null;
}
