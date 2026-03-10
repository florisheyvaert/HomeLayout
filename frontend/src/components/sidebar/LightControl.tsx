import { useState, useEffect } from "react";
import type { HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface LightControlProps {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
}

export function LightControl({ entityId, entity, hass, isDark }: LightControlProps) {
  const { resolveEntityIcon, colors } = useThemeConfig();
  const state = entity?.state ?? "unknown";
  const isOn = state === "on";
  const attrs = entity?.attributes ?? {};

  const colorModes = Array.isArray(attrs.supported_color_modes) ? attrs.supported_color_modes as string[] : [];
  const supportsBrightness = colorModes.length > 0;
  const supportsColorTemp = colorModes.some((m) =>
    ["color_temp", "hs", "xy", "rgb", "rgbw", "rgbww"].includes(m)
  );
  const hasColorTemp = colorModes.includes("color_temp");

  const [brightness, setBrightness] = useState<number>(
    (attrs.brightness as number) ?? 255
  );
  const [colorTemp, setColorTemp] = useState<number>(
    (attrs.color_temp as number) ?? 300
  );

  // Sync from HA state
  useEffect(() => {
    if (attrs.brightness !== undefined) setBrightness(attrs.brightness as number);
    if (attrs.color_temp !== undefined) setColorTemp(attrs.color_temp as number);
  }, [attrs.brightness, attrs.color_temp]);

  const minMireds = (attrs.min_mireds as number) ?? 153;
  const maxMireds = (attrs.max_mireds as number) ?? 500;

  const handleToggle = () => {
    hass.callService("light", isOn ? "turn_off" : "turn_on", {}, { entity_id: entityId });
  };

  const handleBrightness = (val: number) => {
    setBrightness(val);
    hass.callService("light", "turn_on", { brightness: val }, { entity_id: entityId });
  };

  const handleColorTemp = (val: number) => {
    setColorTemp(val);
    hass.callService("light", "turn_on", { color_temp: val }, { entity_id: entityId });
  };

  const brightPct = Math.round((brightness / 255) * 100);
  const warmColor = "#ffa726";
  const coolColor = "#90caf9";

  const lightWarm = colors.light;
  const { icon } = resolveEntityIcon("light", state);

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <button
        onClick={handleToggle}
        className="w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 py-3"
        style={{
          backgroundColor: isOn ? hexToRgba(lightWarm, 0.2) : isDark ? "#333" : "#e8e8e8",
          color: isOn ? lightWarm : "var(--fp-text)",
          border: `1px solid ${isOn ? hexToRgba(lightWarm, 0.3) : "transparent"}`,
        }}
      >
        <DomIcon icon={icon} size={20} />
        {isOn ? "Turn Off" : "Turn On"}
      </button>

      {/* Brightness */}
      {supportsBrightness && isOn && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Brightness
            </label>
            <span className="text-xs font-medium">{brightPct}%</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={1}
              max={255}
              value={brightness}
              onChange={(e) => handleBrightness(Number(e.target.value))}
              className="w-full accent-amber-400"
              style={{
                background: `linear-gradient(to right, #333 0%, ${lightWarm} ${brightPct}%, ${isDark ? "#444" : "#ddd"} ${brightPct}%)`,
                borderRadius: "4px",
                height: "6px",
              }}
            />
          </div>
        </div>
      )}

      {/* Color temperature */}
      {hasColorTemp && isOn && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Color Temperature
            </label>
            <span className="text-xs font-medium">{colorTemp} mireds</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={minMireds}
              max={maxMireds}
              value={colorTemp}
              onChange={(e) => handleColorTemp(Number(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, ${coolColor}, ${warmColor})`,
                borderRadius: "4px",
                height: "6px",
              }}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>Cool</span>
              <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>Warm</span>
            </div>
          </div>
        </div>
      )}

      {/* Color mode indicator */}
      {supportsColorTemp && isOn && Boolean(attrs.color_mode) && (
        <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
          Mode: {String(attrs.color_mode)}{" "}
          {Array.isArray(attrs.rgb_color) && (
            <span className="ml-2 inline-flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full inline-block border"
                style={{
                  backgroundColor: `rgb(${(attrs.rgb_color as number[]).join(",")})`,
                  borderColor: isDark ? "#555" : "#ccc",
                }}
              />
            </span>
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
