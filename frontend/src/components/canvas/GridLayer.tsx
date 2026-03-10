import { Line, Group } from "react-konva";

interface GridLayerProps {
  viewportWidth: number;
  viewportHeight: number;
  stageX: number;
  stageY: number;
  stageScale: number;
  gridSize: number;
  visible: boolean;
  isDark: boolean;
}

export function GridLayer({
  viewportWidth,
  viewportHeight,
  stageX,
  stageY,
  stageScale,
  gridSize,
  visible,
  isDark,
}: GridLayerProps) {
  const color = isDark ? "#333333" : "#e0e0e0";
  const lines = [];

  if (visible) {
    // Calculate visible area in canvas coordinates
    const left = -stageX / stageScale;
    const top = -stageY / stageScale;
    const right = left + viewportWidth / stageScale;
    const bottom = top + viewportHeight / stageScale;

    // Snap to grid boundaries with some padding
    const startX = Math.floor(left / gridSize) * gridSize;
    const endX = Math.ceil(right / gridSize) * gridSize;
    const startY = Math.floor(top / gridSize) * gridSize;
    const endY = Math.ceil(bottom / gridSize) * gridSize;

    for (let x = startX; x <= endX; x += gridSize) {
      lines.push(
        <Line
          key={`v-${x}`}
          points={[x, startY, x, endY]}
          stroke={color}
          strokeWidth={0.5}
          listening={false}
        />
      );
    }

    for (let y = startY; y <= endY; y += gridSize) {
      lines.push(
        <Line
          key={`h-${y}`}
          points={[startX, y, endX, y]}
          stroke={color}
          strokeWidth={0.5}
          listening={false}
        />
      );
    }
  }

  return (
    <Group listening={false}>
      {lines}
    </Group>
  );
}
