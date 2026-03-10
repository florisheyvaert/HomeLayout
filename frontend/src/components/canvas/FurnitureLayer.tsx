import { useState } from "react";
import { Group } from "react-konva";
import { FurnitureMarker } from "./FurnitureMarker";
import type { FurniturePlacement, AppMode, CanvasTool, Point } from "../../types";

interface FurnitureLayerProps {
  furniture: FurniturePlacement[];
  selectedFurnitureIds: string[];
  mode: AppMode;
  activeTool: CanvasTool;
  onSelectFurniture: (id: string, shiftKey: boolean) => void;
  onMoveFurniture: (id: string, x: number, y: number) => void;
  onUpdateFurniture: (id: string, updates: Partial<FurniturePlacement>) => void;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  stageRotation: number;
  groupDragOffset: Point | null;
  onGroupDragMove?: (offset: Point) => void;
  onGroupDragEnd?: () => void;
}

export function FurnitureLayer({
  furniture,
  selectedFurnitureIds,
  mode,
  activeTool,
  onSelectFurniture,
  onMoveFurniture,
  onUpdateFurniture,
  gridSize,
  gridEnabled,
  isDark,
  stageRotation,
  groupDragOffset,
  onGroupDragMove,
  onGroupDragEnd,
}: FurnitureLayerProps) {
  const isEditMode = mode === "edit";
  const [draggingId, setDraggingId] = useState<string | null>(null);

  return (
    <Group>
      {furniture.map((placement) => {
        const isSelected = selectedFurnitureIds.includes(placement.id);
        const isBeingDragged = draggingId === placement.id;
        const applyOffset = isSelected && !isBeingDragged ? groupDragOffset : null;
        return (
          <FurnitureMarker
            key={placement.id}
            placement={placement}
            isSelected={isSelected}
            isEditMode={isEditMode}
            activeTool={activeTool}
            onSelect={onSelectFurniture}
            onMove={onMoveFurniture}
            onUpdate={onUpdateFurniture}
            gridSize={gridSize}
            gridEnabled={gridEnabled}
            isDark={isDark}
            stageRotation={stageRotation}
            groupDragOffset={applyOffset}
            onGroupDragMove={isSelected ? onGroupDragMove : undefined}
            onGroupDragEnd={isSelected ? onGroupDragEnd : undefined}
            onDragStarted={isSelected ? () => setDraggingId(placement.id) : undefined}
            onDragEnded={isSelected ? () => setDraggingId(null) : undefined}
          />
        );
      })}
    </Group>
  );
}
