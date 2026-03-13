import { useMemo, useState } from "react";
import type {
  Room,
  HaArea,
  LabelVertical,
  LabelHorizontal,
  FloorConfig,
  HomeAssistant,
  EntityPlacement,
  HaEntityRegistryEntry,
  Point,
  BadgePosition,
  RoomBadge,
} from "../../types";
import type { SerializedIconRef } from "../../types";
import { useThemeConfig, DomIcon, BRAND } from "../../theme";
import { resolveIcon } from "../../theme/resolveIcon";
import { iconPacks } from "../../theme/packs";
import { IconPicker } from "./IconPicker";

interface RoomEditorProps {
  room: Room;
  floor: FloorConfig;
  onUpdate: (id: string, updates: Partial<Room>) => void;
  onDelete: (id: string) => void;
  haAreas: HaArea[];
  hass: HomeAssistant;
  isDark: boolean;
  getEntitiesForArea: (areaId: string | null) => HaEntityRegistryEntry[];
  onAddEntity: (entityId: string, x: number, y: number) => EntityPlacement | undefined;
}

const V_OPTIONS: LabelVertical[] = ["top", "middle", "bottom"];
const H_OPTIONS: LabelHorizontal[] = ["left", "center", "right"];

const BADGE_POSITIONS: BadgePosition[] = [
  "top-left", "top-center", "top-right",
  "center-left", "center", "center-right",
  "bottom-left", "bottom-center", "bottom-right",
];

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SUPPORTED_DOMAINS = [
  "light", "switch", "cover", "sensor", "binary_sensor",
  "climate", "fan", "camera", "media_player", "lock",
];

function LabelPositionPicker({
  v,
  h,
  onChange,
  isDark,
}: {
  v: LabelVertical;
  h: LabelHorizontal;
  onChange: (v: LabelVertical, h: LabelHorizontal) => void;
  isDark: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(3, 36px)",
        gridTemplateRows: "repeat(3, 36px)",
        gap: 3,
        borderRadius: 8,
        padding: 3,
        backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
      }}
    >
      {V_OPTIONS.map((vOpt) =>
        H_OPTIONS.map((hOpt) => {
          const isActive = v === vOpt && h === hOpt;
          return (
            <button
              key={`${vOpt}-${hOpt}`}
              onClick={() => onChange(vOpt, hOpt)}
              title={`${vOpt} ${hOpt}`}
              style={{
                width: 36,
                height: 36,
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
                backgroundColor: isActive
                  ? "var(--fp-accent)"
                  : isDark
                    ? "#3a3a3a"
                    : "#e0e0e0",
                transition: "background 0.15s",
                outline: "none",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  margin: "auto",
                  backgroundColor: isActive
                    ? "#fff"
                    : isDark
                      ? "#777"
                      : "#999",
                }}
              />
            </button>
          );
        })
      )}
    </div>
  );
}

function BadgePositionPicker({
  value,
  onChange,
  isDark,
}: {
  value: BadgePosition;
  onChange: (pos: BadgePosition) => void;
  isDark: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(3, 24px)",
        gridTemplateRows: "repeat(3, 24px)",
        gap: 2,
        borderRadius: 6,
        padding: 2,
        backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
      }}
    >
      {BADGE_POSITIONS.map((pos) => {
        const isActive = value === pos;
        return (
          <button
            key={pos}
            onClick={() => onChange(pos)}
            title={pos}
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              backgroundColor: isActive ? "var(--fp-accent)" : isDark ? "#3a3a3a" : "#e0e0e0",
              outline: "none",
            }}
          >
            <span
              style={{
                display: "block",
                width: 5,
                height: 5,
                borderRadius: "50%",
                margin: "auto",
                backgroundColor: isActive ? "#fff" : isDark ? "#777" : "#999",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/** Get bounding box of room polygon */
function getRoomBounds(points: Point[]): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY };
}

/** Find a position inside the room bounds that doesn't overlap existing entities */
function findOpenPosition(
  room: Room,
  existingEntities: EntityPlacement[],
  gridSize: number,
): { x: number; y: number } {
  const bounds = getRoomBounds(room.points);
  const padding = 30;
  const minX = bounds.minX + padding;
  const minY = bounds.minY + padding;
  const maxX = bounds.maxX - padding;
  const maxY = bounds.maxY - padding;

  // Entities already placed in this room's bounds
  const occupied = existingEntities.filter(
    (e) => e.x >= bounds.minX && e.x <= bounds.maxX && e.y >= bounds.minY && e.y <= bounds.maxY
  );

  // Try grid positions within bounds
  const step = Math.max(gridSize, 30);
  for (let y = minY; y <= maxY; y += step) {
    for (let x = minX; x <= maxX; x += step) {
      const snappedX = Math.round(x / gridSize) * gridSize;
      const snappedY = Math.round(y / gridSize) * gridSize;
      const tooClose = occupied.some(
        (e) => Math.abs(e.x - snappedX) < step * 0.8 && Math.abs(e.y - snappedY) < step * 0.8
      );
      if (!tooClose) return { x: snappedX, y: snappedY };
    }
  }

  // Fallback: center of room
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  return { x: Math.round(cx / gridSize) * gridSize, y: Math.round(cy / gridSize) * gridSize };
}

function getFriendlyName(entityId: string, hass: HomeAssistant): string {
  const entity = hass.states[entityId];
  return (entity?.attributes?.friendly_name as string) ?? entityId.split(".")[1];
}

function BadgesSection({
  room,
  hass,
  isDark,
  onUpdate,
  resolveEntityIcon,
}: {
  room: Room;
  hass: HomeAssistant;
  isDark: boolean;
  onUpdate: (id: string, updates: Partial<Room>) => void;
  resolveEntityIcon: ReturnType<typeof useThemeConfig>["resolveEntityIcon"];
}) {
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [iconPickBadgeId, setIconPickBadgeId] = useState<string | null>(null);
  const badges = room.badges ?? [];

  const updateBadge = (badgeId: string, updates: Partial<RoomBadge>) => {
    onUpdate(room.id, {
      badges: badges.map((b) => (b.id === badgeId ? { ...b, ...updates } : b)),
    });
  };

  const removeBadge = (badgeId: string) => {
    onUpdate(room.id, { badges: badges.filter((b) => b.id !== badgeId) });
  };

  const addBadge = (entityId: string) => {
    const newBadge: RoomBadge = {
      id: generateId(),
      entity_id: entityId,
      position: "bottom-center",
      show_icon: true,
      show_name: false,
    };
    onUpdate(room.id, { badges: [...badges, newBadge] });
    setAdding(false);
    setSearch("");
  };

  // Search results
  const searchResults = useMemo(() => {
    if (!adding || search.length < 2) return [];
    const q = search.toLowerCase();
    return Object.keys(hass.states)
      .filter((eid) => {
        const name = (hass.states[eid]?.attributes?.friendly_name as string) ?? "";
        return eid.toLowerCase().includes(q) || name.toLowerCase().includes(q);
      })
      .slice(0, 20);
  }, [adding, search, hass.states]);

  // Get attributes for an entity
  const getAttributes = (entityId: string): string[] => {
    const entity = hass.states[entityId];
    if (!entity?.attributes) return [];
    return Object.keys(entity.attributes).filter(
      (k) => !["friendly_name", "icon", "entity_picture", "supported_features"].includes(k)
    );
  };

  // Resolve effective icon for a badge (respects icon_override)
  const resolveBadgeIcon = (badge: RoomBadge) => {
    if (badge.icon_override) {
      const pack = iconPacks[badge.icon_override.pack_id];
      if (pack) {
        const state = hass.states[badge.entity_id]?.state ?? "unknown";
        return resolveIcon(pack, badge.icon_override.domain, state, badge.icon_override.device_class).icon;
      }
    }
    const domain = badge.entity_id.split(".")[0];
    const state = hass.states[badge.entity_id]?.state ?? "unknown";
    const dc = hass.states[badge.entity_id]?.attributes?.device_class as string | undefined;
    return resolveEntityIcon(domain, state, dc).icon;
  };

  // Icon picker overlay for a badge
  if (iconPickBadgeId) {
    const badge = badges.find((b) => b.id === iconPickBadgeId);
    const name = badge
      ? ((hass.states[badge.entity_id]?.attributes?.friendly_name as string) ?? badge.entity_id.split(".")[1])
      : "Badge";
    return (
      <IconPicker
        label={name}
        isDark={isDark}
        onSelect={(ref: SerializedIconRef) => {
          updateBadge(iconPickBadgeId, { icon_override: ref });
          setIconPickBadgeId(null);
        }}
        onClose={() => setIconPickBadgeId(null)}
      />
    );
  }

  return (
    <>
      <hr style={{ borderColor: "var(--fp-border)" }} />
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase" style={{ color: "var(--fp-text-secondary)" }}>
            Badges
          </h4>
          <button
            onClick={() => setAdding(!adding)}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: adding ? "var(--fp-accent)" : isDark ? "#333" : "#e8e8e8",
              color: adding ? "#fff" : "var(--fp-text)",
            }}
          >
            {adding ? "Cancel" : "+ Add"}
          </button>
        </div>

        {/* Add badge search */}
        {adding && (
          <div className="mb-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entity..."
              autoFocus
              className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none"
              style={{
                backgroundColor: isDark ? "#333" : "#fff",
                borderColor: isDark ? "#555" : "#d1d5db",
                color: "var(--fp-text)",
              }}
            />
            {searchResults.length > 0 && (
              <div
                className="mt-1 space-y-0.5 rounded-lg"
                style={{ maxHeight: 200, overflowY: "auto" }}
              >
                {searchResults.map((eid) => {
                  const domain = eid.split(".")[0];
                  const state = hass.states[eid]?.state ?? "unknown";
                  const { icon } = resolveEntityIcon(domain, state);
                  return (
                    <div
                      key={eid}
                      onClick={() => addBadge(eid)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer"
                      style={{ color: "var(--fp-text)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = isDark ? "#333" : "#e8e8e8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <DomIcon icon={icon} size={16} />
                      <span className="truncate">
                        {(hass.states[eid]?.attributes?.friendly_name as string) ?? eid.split(".")[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Existing badges */}
        {badges.length === 0 && !adding && (
          <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
            No badges yet. Add entity values to display inside this room.
          </p>
        )}

        <div className="space-y-2">
          {badges.map((badge) => {
            const entity = hass.states[badge.entity_id];
            const name = (entity?.attributes?.friendly_name as string) ?? badge.entity_id.split(".")[1];
            const attrs = getAttributes(badge.entity_id);
            const effectiveIcon = resolveBadgeIcon(badge);

            return (
              <div
                key={badge.id}
                className="rounded-lg p-3"
                style={{ backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0" }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setIconPickBadgeId(badge.id)}
                    title="Change icon"
                    style={{
                      background: "none",
                      border: badge.icon_override ? `1.5px solid ${BRAND}` : "1.5px solid transparent",
                      borderRadius: 6,
                      padding: 2,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DomIcon icon={effectiveIcon} size={16} />
                  </button>
                  <span className="text-sm truncate flex-1" style={{ color: "var(--fp-text)" }}>
                    {name}
                  </span>
                  {badge.icon_override && (
                    <button
                      onClick={() => updateBadge(badge.id, { icon_override: undefined })}
                      title="Reset icon"
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ color: "var(--fp-text-secondary)", fontSize: 10 }}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => removeBadge(badge.id)}
                    className="text-xs px-2 py-1 rounded"
                    style={{ color: "#ef4444" }}
                  >
                    ✕
                  </button>
                </div>

                {/* Position + toggles */}
                <div className="flex items-start gap-3">
                  <BadgePositionPicker
                    value={badge.position}
                    onChange={(pos) => updateBadge(badge.id, { position: pos })}
                    isDark={isDark}
                  />
                  <div className="flex-1 space-y-1.5">
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={badge.show_icon}
                        onChange={(e) => updateBadge(badge.id, { show_icon: e.target.checked })}
                        style={{ width: 14, height: 14 }}
                      />
                      Icon
                    </label>
                    <label className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={badge.show_name}
                        onChange={(e) => updateBadge(badge.id, { show_name: e.target.checked })}
                        style={{ width: 14, height: 14 }}
                      />
                      Name
                    </label>
                    {/* Attribute selector */}
                    <div>
                      <select
                        value={badge.show_attribute ?? ""}
                        onChange={(e) =>
                          updateBadge(badge.id, {
                            show_attribute: e.target.value || undefined,
                          })
                        }
                        className="w-full px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#555" : "#d1d5db",
                          color: "var(--fp-text)",
                          border: "1px solid",
                        }}
                      >
                        <option value="">State</option>
                        {attrs.map((attr) => (
                          <option key={attr} value={attr}>
                            {attr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function RoomEditor({
  room,
  floor,
  onUpdate,
  onDelete,
  haAreas,
  hass,
  isDark,
  getEntitiesForArea,
  onAddEntity,
}: RoomEditorProps) {
  const { resolveEntityIcon } = useThemeConfig();

  const inputStyle = {
    backgroundColor: isDark ? "#333" : "#fff",
    borderColor: isDark ? "#555" : "#d1d5db",
    color: "var(--fp-text)",
  };

  // Get area entities and split into placed/unplaced
  const { placedIds, unplacedEntities } = useMemo(() => {
    const areaEntities = getEntitiesForArea(room.ha_area_id);
    // Filter to supported domains only
    const supported = areaEntities.filter((e) =>
      SUPPORTED_DOMAINS.includes(e.entity_id.split(".")[0])
    );
    // Which entity_ids are already on this floor?
    const floorEntityIds = new Set(floor.entities.map((e) => e.entity_id));
    const placed = new Set<string>();
    const unplaced: HaEntityRegistryEntry[] = [];
    for (const e of supported) {
      if (floorEntityIds.has(e.entity_id)) {
        placed.add(e.entity_id);
      } else {
        unplaced.push(e);
      }
    }
    return { placedIds: placed, unplacedEntities: unplaced };
  }, [room.ha_area_id, getEntitiesForArea, floor.entities]);

  const handleAddEntity = (entityId: string) => {
    const pos = findOpenPosition(room, floor.entities, 20);
    onAddEntity(entityId, pos.x, pos.y);
  };

  const handleAddAll = () => {
    let currentEntities = [...floor.entities];
    for (const entry of unplacedEntities) {
      const pos = findOpenPosition(room, currentEntities, 20);
      const result = onAddEntity(entry.entity_id, pos.x, pos.y);
      if (result) {
        currentEntities.push(result);
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Edit Room
      </h3>

      {/* Name */}
      <div>
        <label className="block text-xs mb-1" style={{ color: "var(--fp-text-secondary)" }}>
          Name
        </label>
        <input
          type="text"
          value={room.name}
          onChange={(e) => onUpdate(room.id, { name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-blue-500"
          style={inputStyle}
        />
      </div>

      {/* HA Area link */}
      <div>
        <label className="block text-xs mb-1" style={{ color: "var(--fp-text-secondary)" }}>
          Home Assistant Area
        </label>
        <select
          value={room.ha_area_id ?? ""}
          onChange={(e) =>
            onUpdate(room.id, {
              ha_area_id: e.target.value || null,
              name: e.target.value
                ? haAreas.find((a) => a.area_id === e.target.value)?.name ?? room.name
                : room.name,
            })
          }
          className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-blue-500"
          style={inputStyle}
        >
          <option value="">-- Not linked --</option>
          {haAreas.map((area) => (
            <option key={area.area_id} value={area.area_id}>
              {area.name}
            </option>
          ))}
        </select>
      </div>

      {/* Area entities */}
      {room.ha_area_id && (unplacedEntities.length > 0 || placedIds.size > 0) && (
        <>
          <hr style={{ borderColor: "var(--fp-border)" }} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase" style={{ color: "var(--fp-text-secondary)" }}>
                Area Entities
              </h4>
              {unplacedEntities.length > 1 && (
                <button
                  onClick={handleAddAll}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    backgroundColor: "var(--fp-accent)",
                    color: "#fff",
                  }}
                >
                  Add All ({unplacedEntities.length})
                </button>
              )}
            </div>

            <div className="space-y-0.5" style={{ maxHeight: 280, overflowY: "auto" }}>
              {/* Unplaced entities first */}
              {unplacedEntities.map((entry) => {
                const domain = entry.entity_id.split(".")[0];
                const state = hass.states[entry.entity_id]?.state ?? "unknown";
                const { icon } = resolveEntityIcon(domain, state);
                return (
                  <div
                    key={entry.entity_id}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm"
                    style={{ color: "var(--fp-text)" }}
                  >
                    <DomIcon icon={icon} size={16} />
                    <span className="truncate flex-1">
                      {getFriendlyName(entry.entity_id, hass)}
                    </span>
                    <button
                      onClick={() => handleAddEntity(entry.entity_id)}
                      className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        backgroundColor: isDark ? "#333" : "#e8e8e8",
                        color: "var(--fp-text)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--fp-accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = isDark ? "#333" : "#e8e8e8")
                      }
                    >
                      Add
                    </button>
                  </div>
                );
              })}
              {/* Already placed entities */}
              {Array.from(placedIds).map((entityId) => {
                const domain = entityId.split(".")[0];
                const state = hass.states[entityId]?.state ?? "unknown";
                const { icon } = resolveEntityIcon(domain, state);
                return (
                  <div
                    key={entityId}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm"
                    style={{ color: "var(--fp-text-secondary)", opacity: 0.6 }}
                  >
                    <DomIcon icon={icon} size={16} />
                    <span className="truncate flex-1">
                      {getFriendlyName(entityId, hass)}
                    </span>
                    <span className="flex-shrink-0 text-xs" style={{ color: BRAND }}>
                      Placed
                    </span>
                  </div>
                );
              })}
            </div>

            {unplacedEntities.length === 0 && placedIds.size > 0 && (
              <p className="text-xs mt-1" style={{ color: "var(--fp-text-secondary)" }}>
                All area entities are placed.
              </p>
            )}
          </div>
        </>
      )}

      {/* Show label */}
      <label className="flex items-center gap-3 text-sm cursor-pointer py-1">
        <input
          type="checkbox"
          checked={room.label_visible !== false}
          onChange={(e) => onUpdate(room.id, { label_visible: e.target.checked })}
          style={{ width: 18, height: 18 }}
        />
        Show label
      </label>

      {/* Label position grid */}
      {room.label_visible !== false && (
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
            Label position
          </label>
          <LabelPositionPicker
            v={room.label_v ?? "middle"}
            h={room.label_h ?? "center"}
            onChange={(v, h) => onUpdate(room.id, { label_v: v, label_h: h })}
            isDark={isDark}
          />
        </div>
      )}

      {/* Badges */}
      <BadgesSection
        room={room}
        hass={hass}
        isDark={isDark}
        onUpdate={onUpdate}
        resolveEntityIcon={resolveEntityIcon}
      />

      {/* Info */}
      <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        {room.points.length} vertices
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(room.id)}
        className="w-full px-3 py-3 rounded-lg text-sm font-medium bg-red-600/10 text-red-500 hover:bg-red-600/20"
      >
        Delete Room
      </button>
    </div>
  );
}
