import { useState, useMemo } from "react";
import type { HomeAssistant, HassEntity, FavoriteItem } from "../../types";
import { useThemeConfig, DomIcon, BRAND } from "../../theme";

interface FavoriteEditorProps {
  hass: HomeAssistant;
  isDark: boolean;
  favorites: FavoriteItem[];
  onAddFavorite: (entityId: string, type: FavoriteItem["type"], label: string) => void;
  onClose: () => void;
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
  "scene",
  "script",
  "automation",
  "button",
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
  scene: "Scenes",
  script: "Scripts",
  automation: "Automations",
  button: "Buttons",
};

function getFriendlyName(entity: HassEntity): string {
  return (entity.attributes?.friendly_name as string) ?? entity.entity_id.split(".")[1];
}

function deriveType(domain: string): FavoriteItem["type"] {
  if (domain === "scene") return "scene";
  if (domain === "script") return "script";
  if (domain === "automation") return "automation";
  if (domain === "button") return "button";
  return "entity";
}

export function FavoriteEditor({ hass, isDark, favorites, onAddFavorite, onClose }: FavoriteEditorProps) {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<string | null>(null);
  const { resolveEntityIcon } = useThemeConfig();

  const favoriteEntityIds = useMemo(
    () => new Set(favorites.map((f) => f.entity_id)),
    [favorites]
  );

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

  return (
    <div className="p-4 space-y-3">
      {/* Header with back button */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "none",
            backgroundColor: isDark ? "#333" : "#e8e8e8",
            color: "var(--fp-text)",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &larr;
        </button>
        <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ margin: 0 }}>
          Add Favorites
        </h3>
      </div>

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
            backgroundColor: !domainFilter ? BRAND : isDark ? "#333" : "#e8e8e8",
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
              onClick={() => setDomainFilter(domainFilter === domain ? null : domain)}
              className="rounded-lg"
              style={{
                backgroundColor: domainFilter === domain ? BRAND : isDark ? "#333" : "#e8e8e8",
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

      {/* Results */}
      <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        {totalCount} entities
      </div>

      <div className="space-y-3">
        {SUPPORTED_DOMAINS.filter((d) => groupedEntities[d]?.length).map((domain) => {
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
                {groupedEntities[domain].map((entity) => {
                  const isFavorited = favoriteEntityIds.has(entity.entity_id);
                  const name = getFriendlyName(entity);
                  return (
                    <div
                      key={entity.entity_id}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2.5"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--fp-text)",
                      }}
                    >
                      <span className="truncate flex-1">{name}</span>
                      {isFavorited ? (
                        <span
                          style={{ color: BRAND, fontSize: 16, flexShrink: 0 }}
                        >
                          &#10003;
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            const type = deriveType(domain);
                            onAddFavorite(entity.entity_id, type, name);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: BRAND,
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
