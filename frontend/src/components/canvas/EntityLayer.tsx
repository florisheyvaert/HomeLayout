import { useState } from "react";
import { Group } from "react-konva";
import { EntityMarker } from "./EntityMarker";
import type { EntityPlacement, HomeAssistant, AppMode, CanvasTool, Point } from "../../types";

interface EntityLayerProps {
  entities: EntityPlacement[];
  hass: HomeAssistant;
  selectedEntityIds: string[];
  mode: AppMode;
  activeTool: CanvasTool;
  onSelectEntity: (id: string, shiftKey: boolean) => void;
  onMoveEntity: (id: string, x: number, y: number) => void;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  stageRotation: number;
  groupDragOffset: Point | null;
  onGroupDragMove?: (offset: Point) => void;
  onGroupDragEnd?: () => void;
  defaultIconSize?: number;
  domainIconSizes?: Record<string, number>;
}

export function EntityLayer({
  entities,
  hass,
  selectedEntityIds,
  mode,
  activeTool,
  onSelectEntity,
  onMoveEntity,
  gridSize,
  gridEnabled,
  isDark,
  stageRotation,
  groupDragOffset,
  onGroupDragMove,
  onGroupDragEnd,
  defaultIconSize,
  domainIconSizes,
}: EntityLayerProps) {
  const isEditMode = mode === "edit";
  const [draggingEntityId, setDraggingEntityId] = useState<string | null>(null);

  return (
    <Group>
      {entities.map((placement) => {
        const isSelected = selectedEntityIds.includes(placement.id);
        const isBeingDragged = draggingEntityId === placement.id;
        // Only apply group offset to selected entities that are NOT the one being dragged
        const applyOffset = isSelected && !isBeingDragged ? groupDragOffset : null;
        // Cascade: domain size → global default
        const domain = placement.entity_id.split(".")[0];
        const cascadedSize = domainIconSizes?.[domain] ?? defaultIconSize;
        return (
          <EntityMarker
            key={placement.id}
            placement={placement}
            entity={hass.states[placement.entity_id]}
            isSelected={isSelected}
            isEditMode={isEditMode}
            activeTool={activeTool}
            onSelect={onSelectEntity}
            onMove={onMoveEntity}
            gridSize={gridSize}
            gridEnabled={gridEnabled}
            isDark={isDark}
            stageRotation={stageRotation}
            groupDragOffset={applyOffset}
            onGroupDragMove={isSelected ? onGroupDragMove : undefined}
            onGroupDragEnd={isSelected ? onGroupDragEnd : undefined}
            onDragStarted={isSelected ? () => setDraggingEntityId(placement.id) : undefined}
            onDragEnded={isSelected ? () => setDraggingEntityId(null) : undefined}
            effectiveIconSize={cascadedSize}
          />
        );
      })}
    </Group>
  );
}
