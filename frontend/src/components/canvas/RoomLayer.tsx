import { useState } from "react";
import { Group, Line, Circle, Text } from "react-konva";
import type { Room, Point, CanvasTool, AppMode, LabelVertical, LabelHorizontal } from "../../types";
import { useThemeConfig, BRAND } from "../../theme";

interface RoomLayerProps {
  rooms: Room[];
  selectedRoomIds: string[];
  mode: AppMode;
  activeTool: CanvasTool;
  drawingPoints: Point[];
  shapePreview: Point[] | null;
  onSelectRoom: (id: string, shiftKey: boolean) => void;
  onMoveRoom: (id: string, dx: number, dy: number) => void;
  onMoveRoomPoint: (roomId: string, pointIndex: number, x: number, y: number) => void;
  onMoveRoomEdge: (roomId: string, idxA: number, idxB: number, dx: number, dy: number) => void;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  stageRotation: number;
  groupDragOffset: Point | null;
  onGroupDragMove?: (offset: Point) => void;
  onGroupDragEnd?: () => void;
}

interface DragState {
  roomId: string;
  pointIndex: number;
  x: number;
  y: number;
}

interface EdgeDragState {
  roomId: string;
  idxA: number;
  idxB: number;
  dx: number;
  dy: number;
}

function snapToGrid(value: number, gridSize: number, enabled: boolean): number {
  if (!enabled) return value;
  return Math.round(value / gridSize) * gridSize;
}

/** Snap a delta so that (anchor + delta) lands on the grid. */
function snapDeltaToGrid(delta: number, anchor: number, gridSize: number, enabled: boolean): number {
  if (!enabled) return delta;
  return snapToGrid(anchor + delta, gridSize, true) - anchor;
}

function getRoomBounds(points: Point[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, maxX, minY, maxY };
}

const LABEL_PADDING = 8;

function getLabelPosition(
  points: Point[],
  v: LabelVertical,
  h: LabelHorizontal,
  textWidth: number,
): Point {
  const { minX, maxX, minY, maxY } = getRoomBounds(points);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  let x: number;
  if (h === "left") x = minX + LABEL_PADDING;
  else if (h === "right") x = maxX - LABEL_PADDING - textWidth;
  else x = cx - textWidth / 2;

  let y: number;
  if (v === "top") y = minY + LABEL_PADDING;
  else if (v === "bottom") y = maxY - LABEL_PADDING - 14; // 14 ≈ fontSize
  else y = cy - 7;

  return { x, y };
}

function getRoomPoints(room: Room, dragState: DragState | null, edgeDragState: EdgeDragState | null): Point[] {
  let points = room.points;
  if (dragState && dragState.roomId === room.id) {
    points = points.map((p, i) =>
      i === dragState.pointIndex ? { x: dragState.x, y: dragState.y } : p
    );
  }
  if (edgeDragState && edgeDragState.roomId === room.id) {
    points = points.map((p, i) =>
      i === edgeDragState.idxA || i === edgeDragState.idxB
        ? { x: p.x + edgeDragState.dx, y: p.y + edgeDragState.dy }
        : p
    );
  }
  return points;
}

export function RoomLayer({
  rooms,
  selectedRoomIds,
  mode,
  activeTool,
  drawingPoints,
  shapePreview,
  onSelectRoom,
  onMoveRoom,
  onMoveRoomPoint,
  onMoveRoomEdge,
  gridSize,
  gridEnabled,
  isDark,
  stageRotation,
  groupDragOffset,
  onGroupDragMove,
  onGroupDragEnd,
}: RoomLayerProps) {
  const { fontFamily } = useThemeConfig();
  const isEditMode = mode === "edit";
  const roomFill = isDark ? "#2a2a2a" : "#e8e8e8";
  const roomStroke = isDark ? "#888888" : "#000000";
  const labelColor = isDark ? "#cccccc" : "#333333";
  const accentColor = BRAND;

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [edgeDragState, setEdgeDragState] = useState<EdgeDragState | null>(null);
  const [draggingRoomId, setDraggingRoomId] = useState<string | null>(null);
  const singleSelected = selectedRoomIds.length === 1 ? selectedRoomIds[0] : null;

  return (
    <Group>
      {rooms.map((room) => {
        const isSelected = selectedRoomIds.includes(room.id);
        const isBeingDragged = draggingRoomId === room.id;
        const displayPoints = getRoomPoints(room, dragState, edgeDragState);
        // Apply group drag offset only to selected rooms that are NOT the one being dragged
        const offsetPoints =
          isSelected && !isBeingDragged && groupDragOffset
            ? displayPoints.map((p) => ({ x: p.x + groupDragOffset.x, y: p.y + groupDragOffset.y }))
            : displayPoints;
        const flatPoints = offsetPoints.flatMap((p) => [p.x, p.y]);

        return (
          <Group
            key={room.id}
            listening={isEditMode && (activeTool === "select" || activeTool === "multiselect")}
            draggable={isEditMode && (activeTool === "select" || activeTool === "multiselect") && !dragState}
            onDragStart={() => setDraggingRoomId(room.id)}
            onDragMove={(e) => {
              if (gridEnabled) {
                // Snap delta relative to first point so the room aligns to the grid
                const anchor = room.points[0] ?? { x: 0, y: 0 };
                e.target.position({
                  x: snapDeltaToGrid(e.target.x(), anchor.x, gridSize, true),
                  y: snapDeltaToGrid(e.target.y(), anchor.y, gridSize, true),
                });
              }
              // Notify parent of group drag offset
              if (onGroupDragMove && isSelected) {
                onGroupDragMove({ x: e.target.x(), y: e.target.y() });
              }
            }}
            onClick={(e) => {
              if (isEditMode && (activeTool === "select" || activeTool === "multiselect")) {
                onSelectRoom(room.id, activeTool === "multiselect" || e.evt.shiftKey);
              }
            }}
            onTap={() => {
              if (isEditMode && (activeTool === "select" || activeTool === "multiselect")) {
                onSelectRoom(room.id, activeTool === "multiselect");
              }
            }}
            onDragEnd={(e) => {
              if (!isEditMode) return;
              const dx = e.target.x();
              const dy = e.target.y();
              e.target.position({ x: 0, y: 0 });
              setDraggingRoomId(null);
              if (onGroupDragEnd) onGroupDragEnd();
              const anchor = room.points[0] ?? { x: 0, y: 0 };
              onMoveRoom(
                room.id,
                snapDeltaToGrid(dx, anchor.x, gridSize, gridEnabled),
                snapDeltaToGrid(dy, anchor.y, gridSize, gridEnabled)
              );
            }}
          >
            {/* Room polygon */}
            <Line
              points={flatPoints}
              closed
              fill={roomFill}
              opacity={1}
              stroke={isSelected && isEditMode ? accentColor : roomStroke}
              strokeWidth={isSelected && isEditMode ? 2.5 : 1.5}
              hitStrokeWidth={10}
            />

            {/* Room label — counter-rotated to stay readable */}
            {room.label_visible !== false && (() => {
              const lv = room.label_v ?? "middle";
              const lh = room.label_h ?? "center";
              const estimatedWidth = room.name.length * 7;
              const labelPos = getLabelPosition(offsetPoints, lv, lh, estimatedWidth);
              const anchorX = labelPos.x + estimatedWidth / 2;
              const anchorY = labelPos.y + 7;
              return (
                <Group x={anchorX} y={anchorY} rotation={-stageRotation}>
                  <Text
                    x={-estimatedWidth / 2}
                    y={-7}
                    text={room.name}
                    fontSize={14}
                    fontFamily={fontFamily}
                    fill={labelColor}
                    opacity={0.5}
                    listening={false}
                  />
                </Group>
              );
            })()}
          </Group>
        );
      })}

      {/* Corner handles — only for single selection */}
      {isEditMode &&
        activeTool === "select" &&
        singleSelected &&
        rooms
          .filter((room) => room.id === singleSelected)
          .map((room) => {
            const displayPoints = getRoomPoints(room, dragState, edgeDragState);
            return displayPoints.map((point, idx) => (
              <Circle
                key={`handle-${room.id}-${idx}`}
                x={point.x}
                y={point.y}
                radius={5}
                fill={accentColor}
                stroke="#fff"
                strokeWidth={2}
                draggable
                onMouseEnter={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "crosshair";
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "";
                }}
                onDragMove={(e) => {
                  const newX = snapToGrid(e.target.x(), gridSize, gridEnabled);
                  const newY = snapToGrid(e.target.y(), gridSize, gridEnabled);
                  e.target.position({ x: newX, y: newY });
                  setDragState({
                    roomId: room.id,
                    pointIndex: idx,
                    x: newX,
                    y: newY,
                  });
                }}
                onDragEnd={(e) => {
                  const newX = snapToGrid(e.target.x(), gridSize, gridEnabled);
                  const newY = snapToGrid(e.target.y(), gridSize, gridEnabled);
                  e.target.position({ x: point.x, y: point.y });
                  setDragState(null);
                  onMoveRoomPoint(room.id, idx, newX, newY);
                }}
              />
            ));
          })}

      {/* Edge midpoint handles — only for single selection */}
      {isEditMode &&
        activeTool === "select" &&
        singleSelected &&
        rooms
          .filter((room) => room.id === singleSelected)
          .map((room) => {
            // Use base points (without edge drag) for stable midpoint reference
            const basePoints = getRoomPoints(room, dragState, null);
            const n = basePoints.length;
            return basePoints.map((point, idx) => {
              const nextIdx = (idx + 1) % n;
              const next = basePoints[nextIdx];
              const midX = (point.x + next.x) / 2;
              const midY = (point.y + next.y) / 2;
              // Shift the displayed position if this edge is being dragged
              const isThisEdge = edgeDragState &&
                edgeDragState.roomId === room.id &&
                edgeDragState.idxA === idx &&
                edgeDragState.idxB === nextIdx;
              const displayX = isThisEdge ? midX + edgeDragState!.dx : midX;
              const displayY = isThisEdge ? midY + edgeDragState!.dy : midY;
              return (
                <Circle
                  key={`edge-${room.id}-${idx}`}
                  x={displayX}
                  y={displayY}
                  radius={4}
                  fill="#fff"
                  stroke={accentColor}
                  strokeWidth={1.5}
                  draggable
                  onMouseEnter={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "move";
                  }}
                  onMouseLeave={(e) => {
                    const container = e.target.getStage()?.container();
                    if (container) container.style.cursor = "";
                  }}
                  onDragMove={(e) => {
                    const rawDx = e.target.x() - midX;
                    const rawDy = e.target.y() - midY;
                    // Snap so that point A lands on the grid
                    const dx = snapDeltaToGrid(rawDx, point.x, gridSize, gridEnabled);
                    const dy = snapDeltaToGrid(rawDy, point.y, gridSize, gridEnabled);
                    e.target.position({ x: midX + dx, y: midY + dy });
                    setEdgeDragState({
                      roomId: room.id,
                      idxA: idx,
                      idxB: nextIdx,
                      dx,
                      dy,
                    });
                  }}
                  onDragEnd={(e) => {
                    const rawDx = e.target.x() - midX;
                    const rawDy = e.target.y() - midY;
                    const dx = snapDeltaToGrid(rawDx, point.x, gridSize, gridEnabled);
                    const dy = snapDeltaToGrid(rawDy, point.y, gridSize, gridEnabled);
                    e.target.position({ x: midX, y: midY });
                    setEdgeDragState(null);
                    onMoveRoomEdge(room.id, idx, nextIdx, dx, dy);
                  }}
                />
              );
            });
          })}

      {/* Edge length labels — only for single selection in edit mode */}
      {isEditMode &&
        singleSelected &&
        rooms
          .filter((room) => room.id === singleSelected)
          .map((room) => {
            const pts = getRoomPoints(room, dragState, edgeDragState);
            const n = pts.length;
            return pts.map((point, idx) => {
              const next = pts[(idx + 1) % n];
              const dx = next.x - point.x;
              const dy = next.y - point.y;
              const lengthPx = Math.sqrt(dx * dx + dy * dy);
              const label = `${(lengthPx / 100).toFixed(2)}m`;
              const midX = (point.x + next.x) / 2;
              const midY = (point.y + next.y) / 2;
              // Offset label outward from room center
              const cx = pts.reduce((s, p) => s + p.x, 0) / n;
              const cy = pts.reduce((s, p) => s + p.y, 0) / n;
              // Perpendicular outward direction
              const edgeLen = Math.max(lengthPx, 0.01);
              const nx = -(dy / edgeLen);
              const ny = dx / edgeLen;
              // Point outward (away from center)
              const toCenter = (midX - cx) * nx + (midY - cy) * ny;
              const sign = toCenter >= 0 ? 1 : -1;
              const offset = 12;
              const lx = midX + nx * offset * sign;
              const ly = midY + ny * offset * sign;

              return (
                <Group key={`len-${room.id}-${idx}`} x={lx} y={ly} rotation={-stageRotation}>
                  <Text
                    text={label}
                    fontSize={9}
                    fontFamily={fontFamily}
                    fill={accentColor}
                    opacity={0.85}
                    listening={false}
                    offsetX={label.length * 2.5}
                    offsetY={5}
                  />
                </Group>
              );
            });
          })}

      {/* Drawing preview (only in edit mode) */}
      {isEditMode && drawingPoints.length > 0 && (
        <>
          <Line
            points={drawingPoints.flatMap((p) => [p.x, p.y])}
            stroke={accentColor}
            strokeWidth={2}
            dash={[5, 5]}
            listening={false}
          />
          {drawingPoints.map((point, idx) => (
            <Circle
              key={`draw-${idx}`}
              x={point.x}
              y={point.y}
              radius={4}
              fill={accentColor}
              listening={false}
            />
          ))}
        </>
      )}

      {/* Shape preset preview (rect/circle/triangle) */}
      {isEditMode && shapePreview && shapePreview.length > 0 && (
        <>
          <Line
            points={shapePreview.flatMap((p) => [p.x, p.y])}
            closed
            stroke={accentColor}
            strokeWidth={2}
            dash={[5, 5]}
            fill={roomFill}
            opacity={0.5}
            listening={false}
          />
          {shapePreview.length <= 4 && shapePreview.map((point, idx) => (
            <Circle
              key={`shape-${idx}`}
              x={point.x}
              y={point.y}
              radius={4}
              fill={accentColor}
              listening={false}
            />
          ))}
        </>
      )}
    </Group>
  );
}
