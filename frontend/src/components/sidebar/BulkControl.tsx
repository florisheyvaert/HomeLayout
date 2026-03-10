import type { FloorConfig, EntityPlacement, HomeAssistant, HassEntity } from "../../types";
import { useThemeConfig } from "../../theme";

interface BulkControlProps {
  floor: FloorConfig;
  selectedRoomIds: string[];
  selectedEntityIds: string[];
  hass: HomeAssistant;
  onDeleteSelected: () => void;
  isDark: boolean;
  isEditMode: boolean;
}

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

function getFriendlyName(entity: HassEntity | undefined, entityId: string): string {
  return (entity?.attributes?.friendly_name as string) ?? entityId.split(".")[1];
}

export function BulkControl({
  floor,
  selectedRoomIds,
  selectedEntityIds,
  hass,
  onDeleteSelected,
  isDark,
  isEditMode,
}: BulkControlProps) {
  const { colors, getDomainColor } = useThemeConfig();
  const selectedRooms = floor.rooms.filter((r) => selectedRoomIds.includes(r.id));
  const selectedPlacements = floor.entities.filter((e) => selectedEntityIds.includes(e.id));
  // Deduplicate by entity_id (multiple placements of same entity count as one)
  const seenEntityIds = new Set<string>();
  const uniqueEntities: EntityPlacement[] = [];
  for (const p of selectedPlacements) {
    if (!seenEntityIds.has(p.entity_id)) {
      seenEntityIds.add(p.entity_id);
      uniqueEntities.push(p);
    }
  }
  const totalCount = selectedRooms.length + uniqueEntities.length;

  // Group unique entities by domain
  const domainGroups: Record<string, EntityPlacement[]> = {};
  for (const entity of uniqueEntities) {
    const domain = getDomain(entity.entity_id);
    if (!domainGroups[domain]) domainGroups[domain] = [];
    domainGroups[domain].push(entity);
  }

  const lightEntities = domainGroups["light"] ?? [];
  const coverEntities = domainGroups["cover"] ?? [];

  const toggleableDomains = ["light", "switch", "fan", "media_player", "lock"];
  const toggleableEntities = uniqueEntities.filter((e) =>
    toggleableDomains.includes(getDomain(e.entity_id))
  );

  const handleBulkTurnOn = () => {
    for (const entity of toggleableEntities) {
      const domain = getDomain(entity.entity_id);
      if (domain === "cover") {
        hass.callService("cover", "open_cover", {}, { entity_id: entity.entity_id });
      } else if (domain === "lock") {
        hass.callService("lock", "unlock", {}, { entity_id: entity.entity_id });
      } else {
        hass.callService(domain, "turn_on", {}, { entity_id: entity.entity_id });
      }
    }
  };

  const handleBulkTurnOff = () => {
    for (const entity of toggleableEntities) {
      const domain = getDomain(entity.entity_id);
      if (domain === "cover") {
        hass.callService("cover", "close_cover", {}, { entity_id: entity.entity_id });
      } else if (domain === "lock") {
        hass.callService("lock", "lock", {}, { entity_id: entity.entity_id });
      } else {
        hass.callService(domain, "turn_off", {}, { entity_id: entity.entity_id });
      }
    }
  };

  const handleBulkBrightness = (val: number) => {
    for (const entity of lightEntities) {
      hass.callService("light", "turn_on", { brightness: val }, { entity_id: entity.entity_id });
    }
  };

  const handleBulkCoverPosition = (val: number) => {
    for (const entity of coverEntities) {
      hass.callService("cover", "set_cover_position", { position: val }, { entity_id: entity.entity_id });
    }
  };

  const btnBase = "flex-1 py-2 rounded-lg text-sm font-medium transition-all";

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Selection
      </h3>

      <div className="text-sm" style={{ color: "var(--fp-text-secondary)" }}>
        {totalCount} items selected
      </div>

      {/* Selection summary */}
      <div className="space-y-1.5">
        {selectedRooms.length > 0 && (
          <div className="text-xs">
            <span className="font-medium">{selectedRooms.length} room{selectedRooms.length > 1 ? "s" : ""}</span>
            <div className="ml-2 mt-0.5 space-y-0.5" style={{ color: "var(--fp-text-secondary)" }}>
              {selectedRooms.map((r) => (
                <div key={r.id}>{r.name}</div>
              ))}
            </div>
          </div>
        )}
        {uniqueEntities.length > 0 && (
          <div className="text-xs">
            <span className="font-medium">
              {uniqueEntities.length} entit{uniqueEntities.length > 1 ? "ies" : "y"}
              {selectedPlacements.length > uniqueEntities.length && (
                <span style={{ color: "var(--fp-text-secondary)", fontWeight: 400 }}>
                  {" "}({selectedPlacements.length} placements)
                </span>
              )}
            </span>
            <div className="ml-2 mt-0.5 space-y-0.5" style={{ color: "var(--fp-text-secondary)" }}>
              {uniqueEntities.slice(0, 8).map((e) => (
                <div key={e.entity_id} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        hass.states[e.entity_id]?.state === "on" ||
                        hass.states[e.entity_id]?.state === "open"
                          ? getDomainColor(getDomain(e.entity_id))
                          : colors.stateInactive,
                    }}
                  />
                  {getFriendlyName(hass.states[e.entity_id], e.entity_id)}
                </div>
              ))}
              {uniqueEntities.length > 8 && (
                <div style={{ color: "var(--fp-text-secondary)" }}>
                  +{uniqueEntities.length - 8} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bulk state controls (view mode only) */}
      {!isEditMode && toggleableEntities.length > 0 && (
        <>
          <hr style={{ borderColor: "var(--fp-border)" }} />
          <h4 className="text-xs font-semibold uppercase" style={{ color: "var(--fp-text-secondary)" }}>
            Bulk Actions
          </h4>
          <div className="flex gap-1.5">
            <button
              onClick={handleBulkTurnOn}
              className={btnBase}
              style={{
                backgroundColor: hexToRgba(colors.fallback, 0.15),
                color: colors.fallback,
              }}
            >
              All On
            </button>
            <button
              onClick={handleBulkTurnOff}
              className={btnBase}
              style={{
                backgroundColor: isDark ? "#333" : "#e8e8e8",
                color: "var(--fp-text)",
              }}
            >
              All Off
            </button>
          </div>
        </>
      )}

      {!isEditMode && lightEntities.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Brightness ({lightEntities.length} light{lightEntities.length > 1 ? "s" : ""})
            </label>
          </div>
          <input
            type="range"
            min={1}
            max={255}
            defaultValue={128}
            onChange={(e) => handleBulkBrightness(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
        </div>
      )}

      {!isEditMode && coverEntities.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Cover Position ({coverEntities.length} cover{coverEntities.length > 1 ? "s" : ""})
            </label>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            onChange={(e) => handleBulkCoverPosition(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      )}

      {/* Edit-mode only: drag hint + delete */}
      {isEditMode && (
        <>
          <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
            Drag to move all selected items together.
          </p>

          <hr style={{ borderColor: "var(--fp-border)" }} />
          <button
            onClick={onDeleteSelected}
            className="w-full px-3 py-2 rounded text-sm bg-red-600/10 text-red-500 hover:bg-red-600/20"
          >
            Delete Selected ({totalCount})
          </button>

          <p className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
            Shift+click to add/remove items. Ctrl+A to select all.
          </p>
        </>
      )}
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
