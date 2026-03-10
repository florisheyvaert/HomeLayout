import { useState } from "react";
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
  FavoriteItem,
} from "../../types";
import { RoomEditor } from "./RoomEditor";
import { EntityBrowser } from "./EntityBrowser";
import { EntityControl } from "./EntityControl";
import { BulkControl } from "./BulkControl";
import { AppearanceSettings } from "./AppearanceSettings";
import { FavoritesPanel } from "./FavoritesPanel";
import { FavoriteEditor } from "./FavoriteEditor";
import { FurnitureBrowser } from "./FurnitureBrowser";
import { FurnitureControl } from "./FurnitureControl";

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

  // Appearance settings panel (takes priority)
  if (showAppearance) {
    return (
      <AppearanceSettings
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        isDark={isDark}
        themePreference={themePreference}
        onSetTheme={onSetTheme}
      />
    );
  }

  // View mode
  if (mode === "view") {
    // Multi-selection → bulk control
    if (multiSelectCount > 1 && floor) {
      return (
        <BulkControl
          floor={floor}
          selectedRoomIds={selectedRoomIds}
          selectedEntityIds={selectedEntityIds}
          hass={hass}
          onDeleteSelected={onDeleteSelected}
          isDark={isDark}
          isEditMode={false}
        />
      );
    }
    // Single entity → entity control
    if (selectedEntity) {
      return (
        <EntityControl
          placement={selectedEntity}
          entity={hass.states[selectedEntity.entity_id]}
          hass={hass}
          onUpdate={onUpdateEntity}
          onRemove={onRemoveEntity}
          isDark={isDark}
          isEditMode={false}
          effectiveIconSize={cascadedIconSize}
        />
      );
    }
    // No selection → show favorites panel or editor
    if (showFavoriteEditor) {
      return (
        <FavoriteEditor
          hass={hass}
          isDark={isDark}
          favorites={favorites}
          onAddFavorite={onAddFavorite}
          onClose={() => setShowFavoriteEditor(false)}
        />
      );
    }
    return (
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
    return <EntityBrowser hass={hass} isDark={isDark} />;
  }

  // Edit mode: furniture tool -> furniture browser
  if (activeTool === "furniture") {
    return <FurnitureBrowser isDark={isDark} />;
  }

  // Edit mode: multi-selection -> bulk control
  if (multiSelectCount > 1 && floor) {
    return (
      <BulkControl
        floor={floor}
        selectedRoomIds={selectedRoomIds}
        selectedEntityIds={selectedEntityIds}
        hass={hass}
        onDeleteSelected={onDeleteSelected}
        isDark={isDark}
        isEditMode={true}
      />
    );
  }

  // Edit mode: room selected -> room editor
  if (selectedRoom && floor) {
    return (
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
    return (
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
    return (
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
