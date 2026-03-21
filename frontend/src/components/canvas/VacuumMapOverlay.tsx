import { useRef, useState, useEffect } from "react";
import { Group, Image as KonvaImage, Rect, Circle } from "react-konva";
import Konva from "konva";
import type { EntityPlacement, HomeAssistant, AppMode } from "../../types";
import { useVacuumMap } from "../../hooks/useVacuumMap";
import { BRAND } from "../../theme";

interface VacuumMapOverlayProps {
  vacuumEntities: EntityPlacement[];
  hass: HomeAssistant;
  mode: AppMode;
  selectedEntityIds: string[];
  onUpdateEntity: (id: string, updates: Partial<EntityPlacement>) => void;
  stageRotation: number;
  stageScale: number;
}

const HANDLE_SIZE = 8;
const MIN_SIZE = 50;

function VacuumMapItem({
  placement,
  hass,
  isSelected,
  onUpdateEntity,
  stageScale,
}: {
  placement: EntityPlacement;
  hass: HomeAssistant;
  isSelected: boolean;
  onUpdateEntity: (id: string, updates: Partial<EntityPlacement>) => void;
  stageScale: number;
}) {
  const mapEntity = placement.vacuum_map_entity_id
    ? hass.states[placement.vacuum_map_entity_id]
    : null;
  const entityPicture = mapEntity?.attributes?.entity_picture as string | undefined;
  // The image entity's state is a timestamp that changes when the map updates
  const lastUpdated = mapEntity?.state;

  const transform = placement.vacuum_map_transform ?? {
    x: placement.x - 150,
    y: placement.y - 150,
    width: 300,
    height: 300,
    rotation: 0,
    opacity: 0.2,
  };

  const { image } = useVacuumMap(entityPicture, lastUpdated, !!entityPicture);

  const groupRef = useRef<Konva.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Track image aspect ratio
  const [aspectRatio, setAspectRatio] = useState(1);
  useEffect(() => {
    if (image) {
      setAspectRatio(image.naturalWidth / image.naturalHeight);
    }
  }, [image]);

  if (!image || !entityPicture) return null;

  const handleScale = 1 / stageScale;

  const saveTransform = (updates: Partial<typeof transform>) => {
    onUpdateEntity(placement.id, {
      vacuum_map_transform: { ...transform, ...updates },
    });
  };

  // Corner handle positions
  const corners = [
    { cx: 0, cy: 0, cursor: "nwse-resize" },
    { cx: transform.width, cy: 0, cursor: "nesw-resize" },
    { cx: transform.width, cy: transform.height, cursor: "nwse-resize" },
    { cx: 0, cy: transform.height, cursor: "nesw-resize" },
  ];

  // Rotation handle position
  const rotHandleY = -20 * handleScale;

  return (
    <Group
      ref={groupRef}
      x={transform.x}
      y={transform.y}
      rotation={transform.rotation}
      draggable={isSelected}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e) => {
        setIsDragging(false);
        saveTransform({ x: e.target.x(), y: e.target.y() });
      }}
      opacity={isDragging ? 0.6 : 1}
    >
      {/* Map image — always acts as drag handle when selected */}
      <KonvaImage
        image={image}
        x={0}
        y={0}
        width={transform.width}
        height={transform.height}
        opacity={transform.opacity}
        listening={isSelected}
      />

      {/* Selection border */}
      {isSelected && (
        <Rect
          x={0}
          y={0}
          width={transform.width}
          height={transform.height}
          stroke={BRAND}
          strokeWidth={2 * handleScale}
          dash={[6 * handleScale, 4 * handleScale]}
          listening={false}
        />
      )}

      {/* Corner resize handles */}
      {isSelected && corners.map((corner, i) => (
        <Rect
          key={i}
          x={corner.cx - (HANDLE_SIZE * handleScale) / 2}
          y={corner.cy - (HANDLE_SIZE * handleScale) / 2}
          width={HANDLE_SIZE * handleScale}
          height={HANDLE_SIZE * handleScale}
          fill={BRAND}
          cornerRadius={2 * handleScale}
          draggable
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container) container.style.cursor = corner.cursor;
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) container.style.cursor = "";
          }}
          onDragStart={() => {}}
          onDragMove={(e) => {
            e.cancelBubble = true;
            const node = e.target;
            const handleHalf = (HANDLE_SIZE * handleScale) / 2;
            const dx = node.x() + handleHalf;

            let newW = transform.width;
            let newH = transform.height;
            let newX = transform.x;
            let newY = transform.y;

            if (i === 0) {
              newW = transform.width - dx;
              newH = newW / aspectRatio;
              newX = transform.x + dx;
              newY = transform.y + (transform.height - newH);
            } else if (i === 1) {
              newW = dx;
              newH = newW / aspectRatio;
              newY = transform.y + (transform.height - newH);
            } else if (i === 2) {
              newW = dx;
              newH = newW / aspectRatio;
            } else {
              newW = transform.width - dx;
              newH = newW / aspectRatio;
              newX = transform.x + dx;
            }

            if (newW >= MIN_SIZE && newH >= MIN_SIZE) {
              saveTransform({ x: newX, y: newY, width: newW, height: newH });
            }
          }}
          onDragEnd={(e) => {
            e.cancelBubble = true;
            e.target.position({
              x: corner.cx - (HANDLE_SIZE * handleScale) / 2,
              y: corner.cy - (HANDLE_SIZE * handleScale) / 2,
            });
          }}
        />
      ))}

      {/* Rotation handle */}
      {isSelected && (
        <>
          <Rect
            x={transform.width / 2 - 0.5 * handleScale}
            y={rotHandleY}
            width={1 * handleScale}
            height={-rotHandleY}
            fill={BRAND}
            listening={false}
          />
          <Circle
            x={transform.width / 2}
            y={rotHandleY}
            radius={5 * handleScale}
            fill={BRAND}
            draggable
            onMouseEnter={(e) => {
              const container = e.target.getStage()?.container();
              if (container) container.style.cursor = "grab";
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage()?.container();
              if (container) container.style.cursor = "";
            }}
            onDragMove={(e) => {
              e.cancelBubble = true;
              const stage = e.target.getStage();
              if (!stage) return;
              const pointer = stage.getPointerPosition();
              if (!pointer) return;

              const group = groupRef.current;
              if (!group) return;
              const absPos = group.absolutePosition();

              const angle = Math.atan2(pointer.y - absPos.y, pointer.x - absPos.x) * (180 / Math.PI) + 90;
              const snapped = Math.round(angle / 5) * 5;
              saveTransform({ rotation: snapped });

              e.target.position({ x: transform.width / 2, y: rotHandleY });
            }}
            onDragEnd={(e) => {
              e.cancelBubble = true;
              e.target.position({ x: transform.width / 2, y: rotHandleY });
            }}
          />
        </>
      )}
    </Group>
  );
}

export function VacuumMapOverlay({
  vacuumEntities,
  hass,
  mode,
  selectedEntityIds,
  onUpdateEntity,
  stageScale,
}: VacuumMapOverlayProps) {
  // Only show in edit mode, and only for selected vacuum entities
  if (mode !== "edit") return null;

  const withMap = vacuumEntities.filter(
    (e) => e.vacuum_map_entity_id && selectedEntityIds.includes(e.id)
  );
  if (withMap.length === 0) return null;

  return (
    <>
      {withMap.map((placement) => (
        <VacuumMapItem
          key={placement.id}
          placement={placement}
          hass={hass}
          isSelected={selectedEntityIds.includes(placement.id)}
          onUpdateEntity={onUpdateEntity}
          stageScale={stageScale}
        />
      ))}
    </>
  );
}
