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
    <div className="space-y-2">
      {/* Current temperature - compact inline */}
      {currentTemp !== undefined && (
        <div
          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
          style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
        >
          <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>Current</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-light">
              {currentTemp}<span className="text-[10px] ml-0.5">{unit}</span>
            </span>
            {hvacAction && hvacAction !== "off" && (
              <span
                className="text-[10px] capitalize"
                style={{ color: actionColors[hvacAction] ?? "var(--fp-text-secondary)" }}
              >
                {hvacAction}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Target temperature */}
      {isActive && targetTemp !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-0.5">
            <label className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
              Target
            </label>
            <span className="text-xs font-medium">{tempValue}{unit}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleSetTemp(Math.max(minTemp, tempValue - tempStep))}
              className="w-7 h-7 rounded-md text-sm flex items-center justify-center"
              style={{ backgroundColor: isDark ? "#333" : "#e8e8e8", border: "none", cursor: "pointer", color: "var(--fp-text)" }}
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
              className="w-7 h-7 rounded-md text-sm flex items-center justify-center"
              style={{ backgroundColor: isDark ? "#333" : "#e8e8e8", border: "none", cursor: "pointer", color: "var(--fp-text)" }}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* HVAC mode selector */}
      {hvacModes.length > 0 && (
        <div>
          <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>
            Mode
          </label>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${Math.min(hvacModes.length, 4)}, 1fr)` }}
          >
            {hvacModes.map((mode) => {
              const { icon: modeIcon } = resolveEntityIcon("climate", mode);
              return (
                <button
                  key={mode}
                  onClick={() => handleSetMode(mode)}
                  className="rounded-md text-[10px] font-medium capitalize transition-all flex flex-col items-center justify-center gap-0.5"
                  style={{
                    backgroundColor: state === mode ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                    color: state === mode ? accent : "var(--fp-text)",
                    height: 36,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <DomIcon icon={modeIcon} size={12} />
                  <span>{mode.replace("_", " ")}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fan mode selector */}
      {fanModes.length > 0 && isActive && (
        <div>
          <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>
            Fan
          </label>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${Math.min(fanModes.length, 4)}, 1fr)` }}
          >
            {fanModes.map((mode) => (
              <button
                key={mode}
                onClick={() => handleSetFanMode(mode)}
                className="rounded-md text-[10px] font-medium capitalize transition-all"
                style={{
                  backgroundColor: fanMode === mode ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                  color: fanMode === mode ? accent : "var(--fp-text)",
                  height: 30,
                  border: "none",
                  cursor: "pointer",
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
