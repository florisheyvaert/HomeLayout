import type { HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig } from "../../theme";

interface VacuumControlProps {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
}

// HA VacuumEntityFeature bitmask (homeassistant/components/vacuum)
const FEATURE_PAUSE = 4;
const FEATURE_STOP = 8;
const FEATURE_RETURN_HOME = 16;
const FEATURE_FAN_SPEED = 32;
const FEATURE_LOCATE = 512;
const FEATURE_CLEAN_SPOT = 1024;
const FEATURE_START = 8192;

export function VacuumControl({ entityId, entity, hass, isDark }: VacuumControlProps) {
  const { getDomainColor } = useThemeConfig();
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};
  const features = (attrs.supported_features as number) ?? 0;

  const isCleaning = state === "cleaning";
  const isPaused = state === "paused";
  const isReturning = state === "returning";
  const isDocked = state === "docked";
  const isError = state === "error";

  // Attributes
  const battery = attrs.battery_level as number | undefined;
  const fanSpeed = attrs.fan_speed as string | undefined;
  const fanSpeedList = attrs.fan_speed_list as string[] | undefined;
  const status = attrs.status as string | undefined;

  const accent = getDomainColor("vacuum");

  const hasStart = features & FEATURE_START;
  const hasPause = features & FEATURE_PAUSE;
  const hasStop = features & FEATURE_STOP;
  const hasReturn = features & FEATURE_RETURN_HOME;
  const hasFanSpeed = features & FEATURE_FAN_SPEED;
  const hasLocate = features & FEATURE_LOCATE;
  const hasSpotClean = features & FEATURE_CLEAN_SPOT;

  const handleStart = () => hass.callService("vacuum", "start", {}, { entity_id: entityId });
  const handlePause = () => hass.callService("vacuum", "pause", {}, { entity_id: entityId });
  const handleStop = () => hass.callService("vacuum", "stop", {}, { entity_id: entityId });
  const handleReturn = () => hass.callService("vacuum", "return_to_base", {}, { entity_id: entityId });
  const handleLocate = () => hass.callService("vacuum", "locate", {}, { entity_id: entityId });
  const handleSpotClean = () => hass.callService("vacuum", "clean_spot", {}, { entity_id: entityId });
  const handleFanSpeed = (speed: string) =>
    hass.callService("vacuum", "set_fan_speed", { fan_speed: speed }, { entity_id: entityId });

  const btnBase = "flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1";

  return (
    <div className="space-y-3">
      {/* Status + battery bar */}
      <div
        className="p-2.5 rounded-lg"
        style={{ backgroundColor: isDark ? "#222" : "#f5f5f5" }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium capitalize">
            {status ?? state}
          </span>
          {battery != null && (
            <span className="text-[10px] flex items-center gap-1" style={{ color: "var(--fp-text-secondary)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
                <line x1="23" y1="10" x2="23" y2="14" />
              </svg>
              {battery}%
            </span>
          )}
        </div>
        {battery != null && (
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: isDark ? "#444" : "#ddd" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${battery}%`,
                backgroundColor: battery > 20 ? accent : "#ef4444",
              }}
            />
          </div>
        )}
      </div>

      {/* Error state */}
      {isError && (
        <div
          className="text-xs text-center py-2 rounded-lg"
          style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
        >
          Error — check vacuum
        </div>
      )}

      {/* Main controls: Start/Pause + Return */}
      <div className="flex gap-1.5">
        {hasStart && !isCleaning && !isPaused && (
          <button
            onClick={handleStart}
            className={btnBase}
            style={{
              backgroundColor: hexToRgba(accent, 0.15),
              color: accent,
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            Start
          </button>
        )}

        {isCleaning && hasPause && (
          <button
            onClick={handlePause}
            className={btnBase}
            style={{
              backgroundColor: hexToRgba(accent, 0.15),
              color: accent,
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            Pause
          </button>
        )}

        {isPaused && hasStart && (
          <button
            onClick={handleStart}
            className={btnBase}
            style={{
              backgroundColor: hexToRgba(accent, 0.15),
              color: accent,
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
            Resume
          </button>
        )}

        {hasStop && (isCleaning || isPaused) && (
          <button
            onClick={handleStop}
            className={btnBase}
            style={{
              backgroundColor: isDark ? "#333" : "#e8e8e8",
              color: "var(--fp-text)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
            Stop
          </button>
        )}

        {hasReturn && !isDocked && !isReturning && (
          <button
            onClick={handleReturn}
            className={btnBase}
            style={{
              backgroundColor: isDocked ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
              color: isDocked ? accent : "var(--fp-text)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            Dock
          </button>
        )}

        {isReturning && (
          <div
            className="flex-1 text-xs text-center py-2 rounded-lg"
            style={{ backgroundColor: hexToRgba(accent, 0.1), color: accent }}
          >
            Returning to dock...
          </div>
        )}
      </div>

      {/* Secondary actions: Locate + Spot clean */}
      {(hasLocate || hasSpotClean) && (
        <div className="flex gap-1.5">
          {hasLocate && (
            <button
              onClick={handleLocate}
              className={btnBase}
              style={{
                backgroundColor: isDark ? "#333" : "#e8e8e8",
                color: "var(--fp-text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
              Locate
            </button>
          )}
          {hasSpotClean && (
            <button
              onClick={handleSpotClean}
              className={btnBase}
              style={{
                backgroundColor: isDark ? "#333" : "#e8e8e8",
                color: "var(--fp-text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></svg>
              Spot Clean
            </button>
          )}
        </div>
      )}

      {/* Fan speed / suction power */}
      {hasFanSpeed && fanSpeedList && fanSpeedList.length > 0 && (
        <div>
          <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>
            Suction power
          </label>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${Math.min(fanSpeedList.length, 4)}, 1fr)` }}
          >
            {fanSpeedList.map((speed) => (
              <button
                key={speed}
                onClick={() => handleFanSpeed(speed)}
                className="rounded-lg text-[10px] font-medium capitalize"
                style={{
                  backgroundColor: fanSpeed === speed ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
                  color: fanSpeed === speed ? accent : "var(--fp-text)",
                  height: 30,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {speed.replace(/_/g, " ")}
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
