import { useState, useEffect } from "react";
import type { HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface ClimateControlProps {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
}

export function ClimateControl({ entityId, entity, hass, isDark }: ClimateControlProps) {
  const { resolveEntityIcon, colors, getDomainColor } = useThemeConfig();
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};

  const hvacModes = (attrs.hvac_modes as string[]) ?? [];
  const fanModes = (attrs.fan_modes as string[]) ?? [];
  const currentTemp = attrs.current_temperature as number | undefined;
  const targetTemp = attrs.temperature as number | undefined;
  const minTemp = (attrs.min_temp as number) ?? 7;
  const maxTemp = (attrs.max_temp as number) ?? 35;
  const tempStep = (attrs.target_temp_step as number) ?? 0.5;
  const unit = (attrs.unit_of_measurement as string) ?? "°C";
  const fanMode = attrs.fan_mode as string | undefined;
  const hvacAction = attrs.hvac_action as string | undefined;

  const [tempValue, setTempValue] = useState<number>(targetTemp ?? 20);

  useEffect(() => {
    if (targetTemp !== undefined) setTempValue(targetTemp);
  }, [targetTemp]);

  const handleSetTemp = (val: number) => {
    setTempValue(val);
    hass.callService("climate", "set_temperature", { temperature: val }, { entity_id: entityId });
  };

  const handleSetMode = (mode: string) => {
    hass.callService("climate", "set_hvac_mode", { hvac_mode: mode }, { entity_id: entityId });
  };

  const handleSetFanMode = (mode: string) => {
    hass.callService("climate", "set_fan_mode", { fan_mode: mode }, { entity_id: entityId });
  };

  const isActive = state !== "off" && state !== "unknown" && state !== "unavailable";

  const actionColors: Record<string, string> = {
    heating: colors.climate_heating,
    cooling: colors.climate_cooling,
    drying: "#f59e0b",
    idle: colors.stateInactive,
    off: colors.stateInactive,
    fan: "#06b6d4",
  };

  const accent = getDomainColor("climate");

  return (
    <div className="space-y-3">
      {/* Current temperature */}
      {currentTemp !== undefined && (
        <div
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
        >
          <div className="text-xs mb-1" style={{ color: "var(--fp-text-secondary)" }}>
            Current
          </div>
          <div className="text-3xl font-light">
            {currentTemp}
            <span className="text-base ml-0.5">{unit}</span>
          </div>
          {hvacAction && hvacAction !== "off" && (
            <div
              className="text-xs mt-1 capitalize"
              style={{ color: actionColors[hvacAction] ?? "var(--fp-text-secondary)" }}
            >
              {hvacAction}
            </div>
          )}
        </div>
      )}

      {/* Target temperature */}
      {isActive && targetTemp !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Target
            </label>
            <span className="text-sm font-medium">{tempValue}{unit}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSetTemp(Math.max(minTemp, tempValue - tempStep))}
              className="w-8 h-8 rounded-lg text-lg flex items-center justify-center"
              style={{ backgroundColor: isDark ? "#333" : "#e8e8e8" }}
            >
              −
            </button>
            <input
              type="range"
              min={minTemp}
              max={maxTemp}
              step={tempStep}
              value={tempValue}
              onChange={(e) => handleSetTemp(Number(e.target.value))}
              className="flex-1 accent-orange-400"
            />
            <button
              onClick={() => handleSetTemp(Math.min(maxTemp, tempValue + tempStep))}
              className="w-8 h-8 rounded-lg text-lg flex items-center justify-center"
              style={{ backgroundColor: isDark ? "#333" : "#e8e8e8" }}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* HVAC mode selector */}
      {hvacModes.length > 0 && (
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
            Mode
          </label>
          <div className="flex flex-wrap gap-1">
            {hvacModes.map((mode) => {
              const { icon: modeIcon } = resolveEntityIcon("climate", mode);
              return (
                <button
                  key={mode}
                  onClick={() => handleSetMode(mode)}
                  className="px-2.5 py-1.5 rounded text-xs font-medium capitalize transition-all flex items-center gap-1"
                  style={{
                    backgroundColor: state === mode ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                    color: state === mode ? accent : "var(--fp-text)",
                  }}
                >
                  <DomIcon icon={modeIcon} size={14} /> {mode.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fan mode selector */}
      {fanModes.length > 0 && isActive && (
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
            Fan
          </label>
          <div className="flex flex-wrap gap-1">
            {fanModes.map((mode) => (
              <button
                key={mode}
                onClick={() => handleSetFanMode(mode)}
                className="px-2.5 py-1.5 rounded text-xs font-medium capitalize transition-all"
                style={{
                  backgroundColor: fanMode === mode ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                  color: fanMode === mode ? accent : "var(--fp-text)",
                }}
              >
                {mode.replace("_", " ")}
              </button>
            ))}
          </div>
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
