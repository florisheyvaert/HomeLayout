import type { EntityPlacement, HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig } from "../../theme";
import { LightControl } from "./LightControl";
import { CoverControl } from "./CoverControl";
import { ClimateControl } from "./ClimateControl";
import { SwitchControl } from "./SwitchControl";
import { SensorDisplay } from "./SensorDisplay";

interface EntityControlProps {
  placement: EntityPlacement;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  onUpdate: (id: string, updates: Partial<EntityPlacement>) => void;
  onRemove: (id: string) => void;
  isDark: boolean;
  isEditMode: boolean;
  /** Cascaded size from domain → global default */
  effectiveIconSize?: number;
}

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

function getFriendlyName(entity: HassEntity | undefined, entityId: string): string {
  return (entity?.attributes?.friendly_name as string) ?? entityId.split(".")[1];
}

export function EntityControl({
  placement,
  entity,
  hass,
  onUpdate,
  onRemove,
  isDark,
  isEditMode,
  effectiveIconSize,
}: EntityControlProps) {
  const { colors, getDomainColor } = useThemeConfig();
  const domain = getDomain(placement.entity_id);
  const state = entity?.state ?? "unknown";
  const name = getFriendlyName(entity, placement.entity_id);

  const isActive =
    state === "on" || state === "open" || state === "playing" || state === "unlocked";

  const inputStyle = {
    backgroundColor: isDark ? "#333" : "#fff",
    borderColor: isDark ? "#555" : "#d1d5db",
    color: "var(--fp-text)",
  };

  return (
    <div className="p-4 space-y-4">
      {/* Entity header */}
      <div className="space-y-1">
        <div className="text-base font-medium">{name}</div>
        <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
          {placement.entity_id}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: isActive ? getDomainColor(domain) : colors.stateInactive }}
          />
          <span className="text-sm capitalize">{state}</span>
        </div>
      </div>

      {/* Domain-specific control (view mode only) */}
      {!isEditMode && (
        <>
          {domain === "light" && (
            <LightControl entityId={placement.entity_id} entity={entity} hass={hass} isDark={isDark} />
          )}

          {domain === "cover" && (
            <CoverControl entityId={placement.entity_id} entity={entity} hass={hass} isDark={isDark} />
          )}

          {domain === "climate" && (
            <ClimateControl entityId={placement.entity_id} entity={entity} hass={hass} isDark={isDark} />
          )}

          {(domain === "switch" || domain === "fan" || domain === "lock" || domain === "media_player") && (
            <SwitchControl entityId={placement.entity_id} entity={entity} hass={hass} isDark={isDark} domain={domain} />
          )}

          {(domain === "sensor" || domain === "binary_sensor") && (
            <SensorDisplay entityId={placement.entity_id} entity={entity} isDark={isDark} domain={domain} />
          )}

          {/* Attributes collapsible */}
          {entity && Object.keys(entity.attributes).length > 0 && (
            <details className="text-xs">
              <summary
                className="cursor-pointer py-1"
                style={{ color: "var(--fp-text-secondary)" }}
              >
                Attributes
              </summary>
              <div
                className="mt-1 p-2 rounded space-y-1 max-h-40 overflow-y-auto"
                style={{ backgroundColor: isDark ? "#222" : "#f5f5f5" }}
              >
                {Object.entries(entity.attributes)
                  .filter(([key]) => key !== "friendly_name" && key !== "icon")
                  .map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2">
                      <span style={{ color: "var(--fp-text-secondary)" }}>{key}</span>
                      <span className="text-right truncate">{String(val)}</span>
                    </div>
                  ))}
              </div>
            </details>
          )}
        </>
      )}

      {/* Edit mode settings */}
      {isEditMode && (
        <>
          <hr style={{ borderColor: "var(--fp-border)" }} />
          <h4 className="text-xs font-semibold uppercase" style={{ color: "var(--fp-text-secondary)" }}>
            Placement Settings
          </h4>

          {/* Display toggles */}
          <label className="flex items-center gap-3 text-sm cursor-pointer py-1">
            <input
              type="checkbox"
              style={{ width: 18, height: 18 }}
              checked={placement.show_icon !== false}
              onChange={(e) =>
                onUpdate(placement.id, { show_icon: e.target.checked })
              }
            />
            Show icon
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer py-1">
            <input
              type="checkbox"
              style={{ width: 18, height: 18 }}
              checked={placement.label_visible}
              onChange={(e) =>
                onUpdate(placement.id, { label_visible: e.target.checked })
              }
            />
            Show name
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer py-1">
            <input
              type="checkbox"
              style={{ width: 18, height: 18 }}
              checked={placement.show_state !== false && !!placement.show_state}
              onChange={(e) =>
                onUpdate(placement.id, { show_state: e.target.checked })
              }
            />
            Show state
          </label>

          {/* Camera preview toggle */}
          {domain === "camera" && (
            <label className="flex items-center gap-3 text-sm cursor-pointer py-1">
              <input
                type="checkbox"
                style={{ width: 18, height: 18 }}
                checked={placement.show_camera_preview !== false}
                onChange={(e) =>
                  onUpdate(placement.id, { show_camera_preview: e.target.checked })
                }
              />
              Show preview
            </label>
          )}

          {/* Show attribute picker — only when show_state is enabled */}
          {placement.show_state && entity && (() => {
            const attrs = Object.keys(entity.attributes).filter(
              (k) => k !== "friendly_name" && k !== "icon" && k !== "supported_features"
            );
            if (attrs.length === 0) return null;
            return (
              <div>
                <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
                  Display value
                </label>
                <select
                  value={placement.show_attribute ?? ""}
                  onChange={(e) =>
                    onUpdate(placement.id, {
                      show_attribute: e.target.value || undefined,
                    })
                  }
                  className="w-full mt-1 px-3 py-2.5 rounded-lg text-sm border"
                  style={inputStyle}
                >
                  <option value="">State ({entity.state})</option>
                  {attrs.map((key) => (
                    <option key={key} value={key}>
                      {key} ({String(entity.attributes[key])})
                    </option>
                  ))}
                </select>
              </div>
            );
          })()}

          {/* Icon size */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
                Icon size ({placement.icon_size ?? effectiveIconSize ?? 36}px)
              </label>
              {placement.icon_size != null && (
                <button
                  onClick={() => onUpdate(placement.id, { icon_size: undefined })}
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isDark ? "#444" : "#ddd",
                    fontSize: 10,
                    border: "none",
                    cursor: "pointer",
                    color: "var(--fp-text)",
                  }}
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="range"
              min={16}
              max={80}
              value={placement.icon_size ?? effectiveIconSize ?? 36}
              onChange={(e) =>
                onUpdate(placement.id, { icon_size: Number(e.target.value) })
              }
              className="w-full"
              style={inputStyle}
            />
          </div>

          {/* Font size */}
          {(placement.label_visible || placement.show_state) && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
                Font size ({placement.font_size ?? 10}px)
              </label>
              {placement.font_size != null && (
                <button
                  onClick={() => onUpdate(placement.id, { font_size: undefined })}
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isDark ? "#444" : "#ddd",
                    fontSize: 10,
                    border: "none",
                    cursor: "pointer",
                    color: "var(--fp-text)",
                  }}
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="range"
              min={6}
              max={32}
              value={placement.font_size ?? 10}
              onChange={(e) =>
                onUpdate(placement.id, { font_size: Number(e.target.value) })
              }
              className="w-full"
              style={inputStyle}
            />
          </div>
          )}

          {/* Remove */}
          <button
            onClick={() => onRemove(placement.id)}
            className="w-full px-3 py-3 rounded-lg text-sm font-medium bg-red-600/10 text-red-500 hover:bg-red-600/20"
          >
            Remove from Floor Plan
          </button>
        </>
      )}
    </div>
  );
}
