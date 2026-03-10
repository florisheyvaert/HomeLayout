import { useState, useRef, useMemo, useCallback } from "react";
import { Group, Rect, Circle } from "react-konva";
import type { FurniturePlacement, CanvasTool } from "../../types";
import { useThemeConfig, KonvaIcon, BRAND } from "../../theme";

interface FurnitureMarkerProps {
  placement: FurniturePlacement;
  isSelected: boolean;
  isEditMode: boolean;
  activeTool: CanvasTool;
  onSelect: (id: string, shiftKey: boolean) => void;
  onMove: (id: string, x: number, y: number) => void;
  onUpdate: (id: string, updates: Partial<FurniturePlacement>) => void;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  stageRotation: number;
  groupDragOffset: { x: number; y: number } | null;
  onGroupDragMove?: (offset: { x: number; y: number }) => void;
  onGroupDragEnd?: () => void;
  onDragStarted?: () => void;
  onDragEnded?: () => void;
}

function snapToGrid(value: number, gridSize: number, enabled: boolean): number {
  if (!enabled) return value;
  return Math.round(value / gridSize) * gridSize;
}

interface ResizePreview {
  dw: number; // change in width
  dh: number; // change in height
  // local-space offset of center
  localDx: number;
  localDy: number;
}

export function FurnitureMarker({
  placement,
  isSelected,
  isEditMode,
  activeTool,
  onSelect,
  onMove,
  onUpdate,
  gridSize,
  gridEnabled,
  isDark,
  stageRotation,
  groupDragOffset,
  onGroupDragMove,
  onGroupDragEnd,
  onDragStarted,
  onDragEnded,
}: FurnitureMarkerProps) {
  const { resolveEntityIcon } = useThemeConfig();
  const { icon } = resolveEntityIcon("furniture", "on", placement.type);
  const [isDragging, setIsDragging] = useState(false);
  const [resizePreview, setResizePreview] = useState<ResizePreview | null>(null);
  const resizingRef = useRef(false);

  const baseW = placement.width;
  const baseH = placement.height;
  const accentColor = BRAND;
  const handleSize = 5;
  const minSize = gridSize;

  // Apply resize preview to get display dimensions + center offset
  const w = resizePreview ? baseW + resizePreview.dw : baseW;
  const h = resizePreview ? baseH + resizePreview.dh : baseH;
  const previewOffsetX = resizePreview ? resizePreview.localDx : 0;
  const previewOffsetY = resizePreview ? resizePreview.localDy : 0;

  // Convert local preview offset to world coords (accounting for rotation)
  const rot = (placement.rotation * Math.PI) / 180;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);
  const worldPreviewDx = previewOffsetX * cosR - previewOffsetY * sinR;
  const worldPreviewDy = previewOffsetX * sinR + previewOffsetY * cosR;

  // Edge midpoint handles based on current (possibly previewed) dimensions
  const edges = useMemo(() => [
    { x: 0, y: -h / 2, axis: "v" as const, sign: -1 as const, cursor: "ns-resize" },
    { x: w / 2, y: 0, axis: "h" as const, sign: 1 as const, cursor: "ew-resize" },
    { x: 0, y: h / 2, axis: "v" as const, sign: 1 as const, cursor: "ns-resize" },
    { x: -w / 2, y: 0, axis: "h" as const, sign: -1 as const, cursor: "ew-resize" },
  ], [w, h]);

  // Compute snapped resize from a handle drag delta
  const computeResize = useCallback((edge: typeof edges[number], handlePos: { x: number; y: number }): ResizePreview => {
    if (edge.axis === "h") {
      const origEdgeX = edge.sign === 1 ? baseW / 2 : -baseW / 2;
      const delta = snapToGrid(handlePos.x - origEdgeX, gridSize, gridEnabled);
      const newW = Math.max(minSize, baseW + delta * edge.sign);
      const snappedW = snapToGrid(newW, gridSize, gridEnabled);
      const dw = snappedW - baseW;
      return { dw, dh: 0, localDx: (dw / 2) * edge.sign, localDy: 0 };
    } else {
      const origEdgeY = edge.sign === 1 ? baseH / 2 : -baseH / 2;
      const delta = snapToGrid(handlePos.y - origEdgeY, gridSize, gridEnabled);
      const newH = Math.max(minSize, baseH + delta * edge.sign);
      const snappedH = snapToGrid(newH, gridSize, gridEnabled);
      const dh = snappedH - baseH;
      return { dw: 0, dh, localDx: 0, localDy: (dh / 2) * edge.sign };
    }
  }, [baseW, baseH, gridSize, gridEnabled, minSize]);

  return (
    <Group
      x={placement.x + (groupDragOffset?.x ?? 0) + worldPreviewDx}
      y={placement.y + (groupDragOffset?.y ?? 0) + worldPreviewDy}
      rotation={placement.rotation}
      draggable={isEditMode && !resizingRef.current}
      listening={isEditMode}
      opacity={isEditMode ? 1 : 0.35}
      onClick={(e) => {
        if (resizingRef.current) return;
        onSelect(placement.id, activeTool === "multiselect" || e.evt.shiftKey);
      }}
      onTap={() => {
        if (resizingRef.current) return;
        onSelect(placement.id, activeTool === "multiselect");
      }}
      onDragStart={() => {
        if (resizingRef.current) return;
        setIsDragging(true);
        onDragStarted?.();
      }}
      onDragMove={(e) => {
        if (resizingRef.current) return;
        if (gridEnabled) {
          const halfW = w / 2;
          const halfH = h / 2;
          e.target.position({
            x: snapToGrid(e.target.x() - halfW, gridSize, true) + halfW,
            y: snapToGrid(e.target.y() - halfH, gridSize, true) + halfH,
          });
        }
        if (onGroupDragMove) {
          onGroupDragMove({
            x: e.target.x() - placement.x,
            y: e.target.y() - placement.y,
          });
        }
      }}
      onDragEnd={(e) => {
        if (resizingRef.current) return;
        setIsDragging(false);
        onDragEnded?.();
        if (onGroupDragEnd) onGroupDragEnd();
        const halfW = w / 2;
        const halfH = h / 2;
        const newX = gridEnabled ? snapToGrid(e.target.x() - halfW, gridSize, true) + halfW : e.target.x();
        const newY = gridEnabled ? snapToGrid(e.target.y() - halfH, gridSize, true) + halfH : e.target.y();
        onMove(placement.id, newX, newY);
      }}
      onMouseEnter={(e) => {
        if (isEditMode) {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = "";
        }
      }}
    >
      {/* Background rect */}
      <Rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
        stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}
        strokeWidth={1}
        cornerRadius={4}
      />

      {/* Counter-rotate only the stage rotation so the icon stays upright relative to the furniture */}
      <Group rotation={-stageRotation}>
        <KonvaIcon
          icon={icon}
          size={Math.max(w, h) * 0.85}
          fill={isDark ? "#aaa" : "#666"}
          opacity={1}
        />
      </Group>

      {/* Selection ring */}
      {isSelected && !isDragging && (
        <Rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          stroke={accentColor}
          strokeWidth={1.5}
          dash={[4, 3]}
          listening={false}
        />
      )}

      {/* Edge midpoint resize handles */}
      {isSelected && isEditMode && edges.map((edge, i) => (
        <Circle
          key={i}
          x={edge.x}
          y={edge.y}
          radius={handleSize}
          fill={accentColor}
          stroke="#fff"
          strokeWidth={1}
          draggable
          onMouseEnter={(e) => {
            const container = e.target.getStage()?.container();
            if (container) container.style.cursor = edge.cursor;
          }}
          onMouseLeave={(e) => {
            const container = e.target.getStage()?.container();
            if (container) container.style.cursor = "";
          }}
          onDragStart={(e) => {
            e.cancelBubble = true;
            resizingRef.current = true;
          }}
          onDragMove={(e) => {
            e.cancelBubble = true;
            // Constrain to axis
            if (edge.axis === "h") {
              e.target.y(edge.y);
            } else {
              e.target.x(edge.x);
            }
            // Live preview
            setResizePreview(computeResize(edge, { x: e.target.x(), y: e.target.y() }));
          }}
          onDragEnd={(e) => {
            e.cancelBubble = true;

            const preview = computeResize(edge, { x: e.target.x(), y: e.target.y() });
            const finalW = baseW + preview.dw;
            const finalH = baseH + preview.dh;
            const finalWorldDx = preview.localDx * cosR - preview.localDy * sinR;
            const finalWorldDy = preview.localDx * sinR + preview.localDy * cosR;

            setResizePreview(null);

            onUpdate(placement.id, {
              width: finalW,
              height: finalH,
              x: placement.x + finalWorldDx,
              y: placement.y + finalWorldDy,
            });

            // Reset handle
            e.target.x(edge.x);
            e.target.y(edge.y);
            setTimeout(() => { resizingRef.current = false; }, 50);
          }}
        />
      ))}
    </Group>
  );
}
