import { useState, useMemo } from "react";
import type { HomeAssistant, HassEntity } from "../../types";
import { useThemeConfig, DomIcon, BRAND } from "../../theme";

interface EntityBrowserProps {
  hass: HomeAssistant;
  isDark: boolean;
}

const SUPPORTED_DOMAINS = [
  "light",
  "switch",
  "cover",
  "sensor",
  "binary_sensor",
  "climate",
  "fan",
  "camera",
  "media_player",
  "lock",
];

const DOMAIN_LABELS: Record<string, string> = {
  light: "Lights",
  switch: "Switches",
  cover: "Covers",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate: "Climate",
  fan: "Fans",
  camera: "Cameras",
  media_player: "Media Players",
  lock: "Locks",
};

function getFriendlyName(entity: HassEntity): string {
  return (entity.attributes?.friendly_name as string) ?? entity.entity_id.split(".")[1];
}

export function EntityBrowser({ hass, isDark }: EntityBrowserProps) {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const { resolveEntityIcon, colors, getDomainColor } = useThemeConfig();

  const groupedEntities = useMemo(() => {
    const entities = Object.values(hass.states);
    const groups: Record<string, HassEntity[]> = {};

    for (const entity of entities) {
      const domain = entity.entity_id.split(".")[0];
      if (!SUPPORTED_DOMAINS.includes(domain)) continue;

      const name = getFriendlyName(entity).toLowerCase();
      const id = entity.entity_id.toLowerCase();
      const q = search.toLowerCase();

      if (q && !name.includes(q) && !id.includes(q)) continue;
      if (domainFilter && domain !== domainFilter) continue;

      if (!groups[domain]) groups[domain] = [];
      groups[domain].push(entity);
    }

    for (const domain of Object.keys(groups)) {
      groups[domain].sort((a, b) =>
        getFriendlyName(a).localeCompare(getFriendlyName(b))
      );
    }

    return groups;
  }, [hass.states, search, domainFilter]);

  const totalCount = Object.values(groupedEntities).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const inputStyle = {
    backgroundColor: isDark ? "#333" : "#fff",
    borderColor: isDark ? "#555" : "#d1d5db",
    color: "var(--fp-text)",
  };

  const handleDragStart = (e: React.DragEvent, entityId: string) => {
    e.dataTransfer.setData("application/entity-id", entityId);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Entities
      </h3>
      <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        Drag an entity onto the floor plan.
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search entities..."
        className="w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500"
        style={inputStyle}
      />

      {/* Domain filter chips */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setDomainFilter(null)}
          className="px-2 py-0.5 rounded text-xs"
          style={{
            backgroundColor: !domainFilter
              ? BRAND
              : isDark
                ? "#333"
                : "#e8e8e8",
            color: !domainFilter ? "#fff" : "var(--fp-text)",
          }}
        >
          All
        </button>
        {SUPPORTED_DOMAINS.map((domain) => {
          const { icon } = resolveEntityIcon(domain, "on");
          return (
            <button
              key={domain}
              onClick={() =>
                setDomainFilter(domainFilter === domain ? null : domain)
              }
              className="px-2 py-0.5 rounded text-xs"
              style={{
                backgroundColor:
                  domainFilter === domain
                    ? BRAND
                    : isDark
                      ? "#333"
                      : "#e8e8e8",
                color: domainFilter === domain ? "#fff" : "var(--fp-text)",
              }}
            >
              <DomIcon icon={icon} size={14} />
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        {totalCount} entities
      </div>

      <div className="space-y-3">
        {SUPPORTED_DOMAINS.filter((d) => groupedEntities[d]?.length).map(
          (domain) => {
            const { icon: domainIcon } = resolveEntityIcon(domain, "on");
            return (
              <div key={domain}>
                <h4
                  className="text-xs font-semibold uppercase mb-1 sticky top-0 py-1 flex items-center gap-1"
                  style={{
                    color: "var(--fp-text-secondary)",
                    backgroundColor: "var(--fp-card)",
                  }}
                >
                  <DomIcon icon={domainIcon} size={14} /> {DOMAIN_LABELS[domain]} (
                  {groupedEntities[domain].length})
                </h4>
                <div className="space-y-0.5">
                  {groupedEntities[domain].map((entity) => (
                    <div
                      key={entity.entity_id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entity.entity_id)}
                      className="w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--fp-text)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--fp-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            entity.state === "on" ||
                            entity.state === "open" ||
                            entity.state === "playing"
                              ? getDomainColor(entity.entity_id.split(".")[0])
                              : colors.stateInactive,
                        }}
                      />
                      <span className="truncate">
                        {getFriendlyName(entity)}
                      </span>
                      <span
                        className="text-xs ml-auto flex-shrink-0"
                        style={{ color: "var(--fp-text-secondary)" }}
                      >
                        {entity.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
