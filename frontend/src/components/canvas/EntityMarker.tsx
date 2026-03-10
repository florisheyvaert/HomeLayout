import { useState } from "react";
import { Group, Circle, Text } from "react-konva";
import type { EntityPlacement, HassEntity, CanvasTool } from "../../types";
import { useThemeConfig, KonvaIcon, BRAND } from "../../theme";

const DEFAULT_ICON_SIZE = 36;

interface EntityMarkerProps {
  placement: EntityPlacement;
  entity: HassEntity | undefined;
  isSelected: boolean;
  isEditMode: boolean;
  activeTool: CanvasTool;
  onSelect: (id: string, shiftKey: boolean) => void;
  onMove: (id: string, x: number, y: number) => void;
  gridSize: number;
  gridEnabled: boolean;
  isDark: boolean;
  stageRotation: number;
  groupDragOffset: { x: number; y: number } | null;
  onGroupDragMove?: (offset: { x: number; y: number }) => void;
  onGroupDragEnd?: () => void;
  onDragStarted?: () => void;
  onDragEnded?: () => void;
  /** Pre-resolved from cascade: entity override → domain size → global default */
  effectiveIconSize?: number;
}

function snapToGrid(value: number, gridSize: number, enabled: boolean): number {
  if (!enabled) return value;
  return Math.round(value / gridSize) * gridSize;
}

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

export function EntityMarker({
  placement,
  entity,
  isSelected,
  isEditMode,
  activeTool,
  onSelect,
  onMove,
  gridSize,
  gridEnabled,
  isDark,
  stageRotation,
  groupDragOffset,
  onGroupDragMove,
  onGroupDragEnd,
  onDragStarted,
  onDragEnded,
  effectiveIconSize,
}: EntityMarkerProps) {
  const { resolveEntityIcon, computeLightStyle: computeLight, getDomainColor, fontFamily } = useThemeConfig();
  const domain = getDomain(placement.entity_id);
  const state = entity?.state ?? "unknown";
  const deviceClass = entity?.attributes?.device_class as string | undefined;
  const { icon, style } = resolveEntityIcon(domain, state, deviceClass);

  // Compute effective opacity and fill
  let effectiveOpacity = style.opacity ?? 1;
  let iconFill: string;

  const isActive = state === "on" || state === "open" || state === "playing" || state === "unlocked";
  const isUnavailable = state === "unavailable" || state === "unknown";

  if (domain === "light") {
    const brightness = entity?.attributes?.brightness as number | undefined;
    const rgbColor = entity?.attributes?.rgb_color as [number, number, number] | undefined;
    const lightResult = computeLight(style, state, brightness, rgbColor);
    effectiveOpacity = lightResult.opacity;
    // Only color the icon when the light is on; off/unavailable = neutral
    iconFill = isUnavailable
      ? (isDark ? "#555" : "#bbb")
      : isActive
        ? (lightResult.fillColor ?? getDomainColor("light"))
        : (isDark ? "#888" : "#999");
  } else {
    iconFill = isUnavailable
      ? (isDark ? "#555" : "#bbb")
      : isActive
        ? getDomainColor(domain)
        : (isDark ? "#888" : "#999");
  }

  const size = placement.icon_size ?? effectiveIconSize ?? DEFAULT_ICON_SIZE;
  const [isDragging, setIsDragging] = useState(false);

  const friendlyName =
    (entity?.attributes?.friendly_name as string) ??
    placement.entity_id.split(".")[1];

  // Build a display string for the entity state
  const stateDisplay = (() => {
    if (!entity) return "unknown";
    const s = entity.state;
    const unit = entity.attributes?.unit_of_measurement as string | undefined;
    if (unit) return `${s} ${unit}`;
    if (domain === "climate") {
      const temp = entity.attributes?.current_temperature;
      if (temp != null) return `${s} \u00B7 ${temp}\u00B0`;
    }
    return s;
  })();

  const accentColor = BRAND;

  return (
    <Group
      x={placement.x + (groupDragOffset?.x ?? 0)}
      y={placement.y + (groupDragOffset?.y ?? 0)}
      draggable={isEditMode}
      onClick={(e) => onSelect(placement.id, activeTool === "multiselect" || e.evt.shiftKey)}
      onTap={() => onSelect(placement.id, activeTool === "multiselect")}
      onDragStart={() => {
        setIsDragging(true);
        onDragStarted?.();
      }}
      onDragMove={(e) => {
        if (onGroupDragMove) {
          onGroupDragMove({
            x: e.target.x() - placement.x,
            y: e.target.y() - placement.y,
          });
        }
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        onDragEnded?.();
        if (onGroupDragEnd) onGroupDragEnd();
        const newX = snapToGrid(e.target.x(), gridSize, gridEnabled);
        const newY = snapToGrid(e.target.y(), gridSize, gridEnabled);
        onMove(placement.id, newX, newY);
      }}
      onMouseEnter={(e) => {
        const container = e.target.getStage()?.container();
        if (container) container.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          const container = e.target.getStage()?.container();
          if (container) container.style.cursor = "";
        }
      }}
      scaleX={isDragging ? 1.25 : 1}
      scaleY={isDragging ? 1.25 : 1}
      opacity={isDragging ? 0.7 : 1}
    >
      {/* Invisible hit area — all visible shapes have listening={false},
           so without this the entity would have zero hit area */}
      <Circle
        x={0}
        y={0}
        radius={size * 0.42}
        hitFunc={(ctx, shape) => {
          const r = (shape as unknown as { radius(): number }).radius();
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStrokeShape(shape);
        }}
      />

      {/* Drop shadow while dragging */}
      {isDragging && (
        <Circle
          x={0}
          y={0}
          radius={size * 0.4}
          fill={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
          listening={false}
        />
      )}


      {/* Selection ring */}
      {isSelected && !isDragging && (
        <Circle
          x={0}
          y={0}
          radius={size * 0.42}
          stroke={accentColor}
          strokeWidth={1.5}
          dash={[4, 3]}
          listening={false}
        />
      )}

      {/* Counter-rotate icon + label so they stay upright */}
      <Group rotation={-stageRotation}>
        {(() => {
          const showIcon = placement.show_icon !== false;
          const showName = placement.label_visible;
          const showState = !!placement.show_state;
          const nameFontSize = 10;
          const stateFontSize = 9;
          const lineGap = 2;

          // Calculate text block height for vertical centering
          const textLines: number[] = [];
          if (showName) textLines.push(nameFontSize);
          if (showState) textLines.push(stateFontSize);
          const textBlockH = textLines.reduce((a, b) => a + b, 0) + Math.max(0, textLines.length - 1) * lineGap;

          // Text positioning
          const textX = showIcon ? size * 0.38 : 0;
          const textTopY = -textBlockH / 2;

          // For icon-less centering: use a wide box with align center + offsetX half
          const centerW = 200;
          const centerOffX = centerW / 2;

          return (
            <>
              {showIcon && (
                <KonvaIcon
                  icon={icon}
                  size={size}
                  fill={iconFill}
                  opacity={effectiveOpacity}
                />
              )}

              {showName && (
                <Text
                  x={textX}
                  y={textTopY}
                  width={showIcon ? undefined : centerW}
                  align={showIcon ? "left" : "center"}
                  offsetX={showIcon ? 0 : centerOffX}
                  text={friendlyName}
                  fontSize={nameFontSize}
                  fontFamily={fontFamily}
                  fill={isDark ? "#ccc" : "#333"}
                  opacity={0.8}
                  listening={false}
                />
              )}

              {showState && (
                <Text
                  x={textX}
                  y={textTopY + (showName ? nameFontSize + lineGap : 0)}
                  width={showIcon ? undefined : centerW}
                  align={showIcon ? "left" : "center"}
                  offsetX={showIcon ? 0 : centerOffX}
                  text={stateDisplay}
                  fontSize={stateFontSize}
                  fontFamily={fontFamily}
                  fill={isActive ? iconFill : isDark ? "#999" : "#777"}
                  opacity={0.8}
                  listening={false}
                />
              )}
            </>
          );
        })()}
      </Group>
    </Group>
  );
}
