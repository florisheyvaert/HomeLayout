import type { HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface SwitchControlProps {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
  domain: string;
}

export function SwitchControl({ entityId, entity, hass, isDark, domain }: SwitchControlProps) {
  const { resolveEntityIcon, getDomainColor } = useThemeConfig();
  const state = entity?.state ?? "unknown";

  const isActive =
    state === "on" || state === "open" || state === "playing" || state === "unlocked";

  const handleToggle = () => {
    if (domain === "lock") {
      hass.callService("lock", isActive ? "lock" : "unlock", {}, { entity_id: entityId });
    } else if (domain === "media_player") {
      hass.callService("media_player", isActive ? "media_pause" : "media_play", {}, { entity_id: entityId });
    } else {
      hass.callService(domain, isActive ? "turn_off" : "turn_on", {}, { entity_id: entityId });
    }
  };

  const labels: Record<string, [string, string]> = {
    switch: ["Turn Off", "Turn On"],
    fan: ["Turn Off", "Turn On"],
    lock: ["Lock", "Unlock"],
    media_player: ["Pause", "Play"],
  };

  const [activeLabel, inactiveLabel] = labels[domain] ?? ["Turn Off", "Turn On"];

  // Resolve icons for active and inactive states
  const activeState = domain === "lock" ? "unlocked" : domain === "media_player" ? "playing" : "on";
  const inactiveState = domain === "lock" ? "locked" : domain === "media_player" ? "paused" : "off";
  const { icon: activeIcon } = resolveEntityIcon(domain, activeState);
  const { icon: inactiveIcon } = resolveEntityIcon(domain, inactiveState);

  // Fan speed control
  const fanSpeed = entity?.attributes?.percentage as number | undefined;
  const fanPresets = entity?.attributes?.preset_modes as string[] | undefined;
  const currentPreset = entity?.attributes?.preset_mode as string | undefined;

  const accent = getDomainColor(domain);

  return (
    <div className="space-y-2">
      {/* Toggle */}
      <button
        onClick={handleToggle}
        className="w-full rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 py-2"
        style={{
          backgroundColor: isActive ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
          color: isActive ? accent : "var(--fp-text)",
          border: `1px solid ${isActive ? hexToRgba(accent, 0.2) : "transparent"}`,
        }}
      >
        <DomIcon icon={isActive ? activeIcon : inactiveIcon} size={14} />
        {isActive ? activeLabel : inactiveLabel}
      </button>

      {/* Fan speed */}
      {domain === "fan" && isActive && fanSpeed !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
              Speed
            </label>
            <span className="text-[10px] font-medium">{fanSpeed}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={fanSpeed}
            onChange={(e) =>
              hass.callService("fan", "set_percentage", { percentage: Number(e.target.value) }, { entity_id: entityId })
            }
            className="w-full accent-blue-500"
          />
        </div>
      )}

      {/* Fan presets */}
      {domain === "fan" && isActive && fanPresets && fanPresets.length > 0 && (
        <div>
          <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>
            Preset
          </label>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${Math.min(fanPresets.length, 3)}, 1fr)` }}
          >
            {fanPresets.map((preset) => (
              <button
                key={preset}
                onClick={() =>
                  hass.callService("fan", "set_preset_mode", { preset_mode: preset }, { entity_id: entityId })
                }
                className="rounded-md text-[10px] font-medium capitalize"
                style={{
                  backgroundColor: currentPreset === preset ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                  color: currentPreset === preset ? accent : "var(--fp-text)",
                  height: 30,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {preset.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Media player info */}
      {domain === "media_player" && isActive && (
        <div className="space-y-1.5">
          {Boolean(entity?.attributes?.media_title) && (
            <div
              className="p-1.5 rounded text-[10px]"
              style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
            >
              <div className="font-medium truncate">{String(entity?.attributes?.media_title)}</div>
              {Boolean(entity?.attributes?.media_artist) && (
                <div className="truncate" style={{ color: "var(--fp-text-secondary)" }}>
                  {String(entity?.attributes?.media_artist)}
                </div>
              )}
            </div>
          )}
          {entity?.attributes?.volume_level !== undefined && (
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
                  Volume
                </label>
                <span className="text-[10px] font-medium">
                  {Math.round((entity.attributes.volume_level as number) * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={entity.attributes.volume_level as number}
                onChange={(e) =>
                  hass.callService("media_player", "volume_set", { volume_level: Number(e.target.value) }, { entity_id: entityId })
                }
                className="w-full accent-blue-500"
              />
            </div>
          )}
        </div>
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
