import { useMemo } from "react";
import { Group, Rect, Text } from "react-konva";
import { KonvaIcon } from "../../theme/KonvaIcon";
import { useThemeConfig } from "../../theme";
import type { HomeAssistant, FloorSummaryConfig } from "../../types";

interface SummaryWidgetProps {
  hass: HomeAssistant;
  isDark: boolean;
  isEditMode: boolean;
  stageRotation: number;
  stageScale: number;
  config: FloorSummaryConfig;
  onMove?: (x: number, y: number) => void;
  onClickDomain?: (domain: string, entityIds: string[]) => void;
}

interface DomainEntry {
  domain: string;
  label: string;
  activeCount: number;
  totalCount: number;
  activeEntityIds: string[];
}

const DOMAIN_DEFS: { domain: string; label: string; activeStates: string[] }[] = [
  { domain: "light", label: "Lights", activeStates: ["on"] },
  { domain: "switch", label: "Switches", activeStates: ["on"] },
  { domain: "cover", label: "Covers", activeStates: ["open"] },
  { domain: "fan", label: "Fans", activeStates: ["on"] },
  { domain: "media_player", label: "Media", activeStates: ["playing", "paused", "on"] },
  { domain: "lock", label: "Locks", activeStates: ["unlocked"] },
  { domain: "climate", label: "Climate", activeStates: ["heat", "cool", "heat_cool", "auto", "dry", "fan_only"] },
  { domain: "binary_sensor", label: "Sensors", activeStates: ["on"] },
];

const ROW_H = 32;
const ROW_GAP = 2;
const ICON_SIZE = 16;
const ACCENT_W = 3;
const ACCENT_R = 1.5;
const PAD_L = 14;
const PAD_R = 14;
const PAD_Y = 6;
const LABEL_FONT = 10;

export function SummaryWidget({
  hass,
  isDark,
  isEditMode,
  stageRotation,
  stageScale,
  config,
  onMove,
  onClickDomain,
}: SummaryWidgetProps) {
  const { getDomainColor, resolveEntityIcon, fontFamily } = useThemeConfig();

  const entries = useMemo(() => {
    const result: DomainEntry[] = [];
    for (const def of DOMAIN_DEFS) {
      let total = 0;
      const activeIds: string[] = [];
      for (const [eid, entity] of Object.entries(hass.states)) {
        if (eid.split(".")[0] !== def.domain) continue;
        total++;
        if (def.activeStates.includes(entity.state)) {
          activeIds.push(eid);
        }
      }
      if (total > 0) {
        result.push({
          domain: def.domain,
          label: def.label,
          activeCount: activeIds.length,
          totalCount: total,
          activeEntityIds: activeIds,
        });
      }
    }
    return result;
  }, [hass.states]);

  if (entries.length === 0) return null;

  const contentW = 130;
  const totalW = contentW;
  const totalH = PAD_Y + entries.length * (ROW_H + ROW_GAP) - ROW_GAP + PAD_Y;

  return (
    <Group
      x={config.x}
      y={config.y}
      draggable={isEditMode}
      onDragEnd={(e) => {
        if (onMove) onMove(e.target.x(), e.target.y());
      }}
    >
      <Group rotation={-stageRotation} scaleX={1 / stageScale} scaleY={1 / stageScale}>
        {/* Shadow */}
        <Rect
          x={1}
          y={1}
          width={totalW}
          height={totalH}
          cornerRadius={8}
          fill="rgba(0,0,0,0.12)"
          listening={false}
        />

        {/* Card */}
        <Rect
          width={totalW}
          height={totalH}
          cornerRadius={8}
          fill={isDark ? "rgba(22,22,22,0.92)" : "rgba(255,255,255,0.94)"}
        />

        {isEditMode && (
          <Rect
            width={totalW}
            height={totalH}
            cornerRadius={8}
            stroke={isDark ? "#444" : "#aaa"}
            strokeWidth={1}
            dash={[4, 3]}
            listening={false}
          />
        )}

        {entries.map((entry, idx) => {
          const y = PAD_Y + idx * (ROW_H + ROW_GAP);
          const color = getDomainColor(entry.domain);
          const hasActive = entry.activeCount > 0;
          const allActive = entry.activeCount === entry.totalCount && entry.totalCount > 1;
          const { icon } = resolveEntityIcon(entry.domain, hasActive ? "on" : "off");
          const countLabel = hasActive
            ? (allActive ? "all" : String(entry.activeCount))
            : "0";

          const muted = isDark ? "#3a3a3a" : "#d0d0d0";

          return (
            <Group
              key={entry.domain}
              onClick={() => {
                if (onClickDomain && hasActive) {
                  onClickDomain(entry.domain, entry.activeEntityIds);
                }
              }}
              onTap={() => {
                if (onClickDomain && hasActive) {
                  onClickDomain(entry.domain, entry.activeEntityIds);
                }
              }}
              onMouseEnter={(e) => {
                const c = e.target.getStage()?.container();
                if (c && hasActive && !isEditMode) c.style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                const c = e.target.getStage()?.container();
                if (c) c.style.cursor = "";
              }}
            >
              {/* Hit area */}
              <Rect x={0} y={y} width={totalW} height={ROW_H} fill="transparent" />

              {/* Accent bar */}
              <Rect
                x={4}
                y={y + 6}
                width={ACCENT_W}
                height={ROW_H - 12}
                cornerRadius={ACCENT_R}
                fill={hasActive ? color : muted}
                opacity={hasActive ? 1 : 0.4}
                listening={false}
              />

              {/* Icon */}
              <KonvaIcon
                icon={icon}
                size={ICON_SIZE}
                fill={hasActive ? color : muted}
                x={PAD_L + ICON_SIZE / 2}
                y={y + ROW_H / 2}
              />

              {/* Label */}
              <Text
                x={PAD_L + ICON_SIZE + 6}
                y={y + (ROW_H - LABEL_FONT) / 2}
                text={entry.label}
                fontSize={LABEL_FONT}
                fontFamily={fontFamily}
                fill={hasActive ? (isDark ? "#999" : "#666") : muted}
                listening={false}
              />

              {/* Count */}
              <Text
                x={totalW - PAD_R - 30}
                y={y + (ROW_H - LABEL_FONT) / 2}
                width={30}
                align="right"
                text={countLabel}
                fontSize={LABEL_FONT}
                fontFamily={fontFamily}
                fill={hasActive ? (isDark ? "#888" : "#777") : muted}
                listening={false}
              />
            </Group>
          );
        })}
      </Group>
    </Group>
  );
}
