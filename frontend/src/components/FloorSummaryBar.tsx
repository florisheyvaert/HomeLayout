import { useThemeConfig } from "../theme";
import { DomIcon } from "../theme/DomIcon";
import type { HomeAssistant } from "../types";

interface FloorSummaryBarProps {
  hass: HomeAssistant;
  isDark: boolean;
  onDomainClick?: (domain: string, entityIds: string[]) => void;
  glass: React.CSSProperties;
}

const DOMAIN_ACTIVE_STATES: Record<string, string[]> = {
  light: ["on"],
  switch: ["on"],
  cover: ["open"],
  fan: ["on"],
  media_player: ["playing", "paused", "on"],
  lock: ["unlocked"],
  climate: ["heat", "cool", "heat_cool", "auto", "dry", "fan_only"],
};

const DOMAIN_ORDER = ["light", "switch", "climate", "cover", "fan", "media_player", "lock"];

export function FloorSummaryBar({ hass, isDark, onDomainClick, glass }: FloorSummaryBarProps) {
  const { getDomainColor, resolveEntityIcon } = useThemeConfig();

  const counts = new Map<string, { active: number; activeIds: string[] }>();

  for (const [entityId, entity] of Object.entries(hass.states)) {
    const domain = entityId.split(".")[0];
    if (!DOMAIN_ACTIVE_STATES[domain]) continue;

    if (DOMAIN_ACTIVE_STATES[domain].includes(entity.state)) {
      const entry = counts.get(domain) ?? { active: 0, activeIds: [] };
      entry.active++;
      entry.activeIds.push(entityId);
      counts.set(domain, entry);
    }
  }

  const summary = DOMAIN_ORDER
    .filter((d) => counts.has(d))
    .map((domain) => ({
      domain,
      active: counts.get(domain)!.active,
      activeIds: counts.get(domain)!.activeIds,
    }));

  if (summary.length === 0) return null;

  const divider: React.CSSProperties = {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 3,
        borderRadius: 14,
        pointerEvents: "auto",
        ...glass,
      }}
    >
      {summary.map(({ domain, active, activeIds }, idx) => {
        const color = getDomainColor(domain);
        const { icon } = resolveEntityIcon(domain, "on");

        return (
          <div key={domain} style={{ display: "flex", alignItems: "center" }}>
            {idx > 0 && <div style={divider} />}
            <div
              onClick={() => onDomainClick?.(domain, activeIds)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 11,
                cursor: onDomainClick ? "pointer" : "default",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <DomIcon icon={icon} size={14} fill={color} opacity={0.9} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: isDark ? "#bbb" : "#555",
                  lineHeight: 1,
                }}
              >
                {active}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
