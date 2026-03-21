import { useState, useMemo } from "react";
import type { HomeAssistant, HassEntity } from "../../types";
import { useThemeConfig, DomIcon, BRAND } from "../../theme";

interface EntityBrowserProps {
  hass: HomeAssistant;
  isDark: boolean;
  isMobile?: boolean;
  onTapPlace?: (entityId: string) => void;
  onDragStartEntity?: (entityId: string) => void;
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
  "vacuum",
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
  vacuum: "Vacuums",
};

function getFriendlyName(entity: HassEntity): string {
  return (entity.attributes?.friendly_name as string) ?? entity.entity_id.split(".")[1];
}

export function EntityBrowser({ hass, isDark, isMobile, onTapPlace, onDragStartEntity }: EntityBrowserProps) {
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

  const handlePointerDown = (e: React.PointerEvent, entityId: string) => {
    e.preventDefault();
    onDragStartEntity?.(entityId);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Fixed header */}
      <div className="p-4 pb-0 space-y-3" style={{ flexShrink: 0 }}>
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Entities
      </h3>
      <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        {isMobile ? "Tap an entity to place it on the floor plan." : "Drag an entity onto the floor plan."}
      </p>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search entities..."
        className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-blue-500"
        style={inputStyle}
      />

      {/* Domain filter chips */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))" }}
      >
        <button
          onClick={() => setDomainFilter(null)}
          className="rounded-lg text-xs"
          style={{
            backgroundColor: !domainFilter
              ? BRAND
              : isDark
                ? "#333"
                : "#e8e8e8",
            color: !domainFilter ? "#fff" : "var(--fp-text)",
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
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
              className="rounded-lg"
              style={{
                backgroundColor:
                  domainFilter === domain
                    ? BRAND
                    : isDark
                      ? "#333"
                      : "#e8e8e8",
                color: domainFilter === domain ? "#fff" : "var(--fp-text)",
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <DomIcon icon={icon} size={18} />
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        {totalCount} entities
      </div>
      </div>

      {/* Scrollable results */}
      <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ minHeight: 0, scrollbarWidth: "thin" }}>
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
                      onPointerDown={!isMobile ? (e) => handlePointerDown(e, entity.entity_id) : undefined}
                      onClick={isMobile && onTapPlace ? () => onTapPlace(entity.entity_id) : undefined}
                      className={`entity-row w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2.5 select-none ${
                        isMobile ? "cursor-pointer active:opacity-70" : "cursor-grab active:cursor-grabbing"
                      }`}
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--fp-text)",
                      }}
                      onMouseEnter={!isMobile ? (e) => (e.currentTarget.style.backgroundColor = "var(--fp-hover)") : undefined}
                      onMouseLeave={!isMobile ? (e) => (e.currentTarget.style.backgroundColor = "transparent") : undefined}
                    >
                      {/* Drag grip — desktop only */}
                      {!isMobile && (
                        <svg
                          className="entity-drag-grip"
                          width="12" height="12" viewBox="0 0 12 12"
                          fill="currentColor"
                          style={{ flexShrink: 0, opacity: 0, transition: "opacity 0.15s", color: "var(--fp-text-secondary)" }}
                        >
                          <circle cx="4" cy="2" r="1.2" /><circle cx="8" cy="2" r="1.2" />
                          <circle cx="4" cy="6" r="1.2" /><circle cx="8" cy="6" r="1.2" />
                          <circle cx="4" cy="10" r="1.2" /><circle cx="8" cy="10" r="1.2" />
                        </svg>
                      )}
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
                      <span className="truncate flex-1">
                        {getFriendlyName(entity)}
                      </span>
                      <span
                        className="text-xs flex-shrink-0"
                        style={{ color: "var(--fp-text-secondary)" }}
                      >
                        {entity.state}
                      </span>
                      {/* Tap-to-place icon — mobile only */}
                      {isMobile && (
                        <svg
                          width="16" height="16" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ flexShrink: 0, color: BRAND }}
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
      </div>
    </div>
  );
}
