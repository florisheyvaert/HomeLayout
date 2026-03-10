import type { HassEntity, HomeAssistant } from "../../types";
import { useThemeConfig } from "../../theme";

interface CoverControlProps {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
}

export function CoverControl({ entityId, entity, hass, isDark }: CoverControlProps) {
  const { colors, getDomainColor } = useThemeConfig();
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};
  const position = attrs.current_position as number | undefined;
  const tiltPosition = attrs.current_tilt_position as number | undefined;
  const isOpen = state === "open" || state === "opening";
  const isMoving = state === "opening" || state === "closing";

  const handleOpen = () => hass.callService("cover", "open_cover", {}, { entity_id: entityId });
  const handleClose = () => hass.callService("cover", "close_cover", {}, { entity_id: entityId });
  const handleStop = () => hass.callService("cover", "stop_cover", {}, { entity_id: entityId });

  const handlePosition = (val: number) => {
    hass.callService("cover", "set_cover_position", { position: val }, { entity_id: entityId });
  };

  const handleTilt = (val: number) => {
    hass.callService("cover", "set_cover_tilt_position", { tilt_position: val }, { entity_id: entityId });
  };

  const btnBase = "flex-1 py-2.5 rounded-lg text-sm font-medium transition-all";
  const accent = getDomainColor("cover");
  const warning = colors.stateWarning;

  return (
    <div className="space-y-3">
      {/* Open / Stop / Close buttons */}
      <div className="flex gap-1.5">
        <button
          onClick={handleOpen}
          className={btnBase}
          style={{
            backgroundColor: isOpen && !isMoving ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
            color: isOpen && !isMoving ? accent : "var(--fp-text)",
          }}
        >
          ▲ Open
        </button>
        <button
          onClick={handleStop}
          className={btnBase}
          style={{
            backgroundColor: isMoving ? hexToRgba(warning, 0.15) : isDark ? "#333" : "#e8e8e8",
            color: isMoving ? warning : "var(--fp-text)",
          }}
        >
          ■ Stop
        </button>
        <button
          onClick={handleClose}
          className={btnBase}
          style={{
            backgroundColor: state === "closed" ? hexToRgba(accent, 0.15) : isDark ? "#333" : "#e8e8e8",
            color: state === "closed" ? accent : "var(--fp-text)",
          }}
        >
          ▼ Close
        </button>
      </div>

      {/* Position slider */}
      {position !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Position
            </label>
            <span className="text-xs font-medium">{position}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => handlePosition(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>Closed</span>
            <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>Open</span>
          </div>
        </div>
      )}

      {/* Tilt slider */}
      {tiltPosition !== undefined && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
              Tilt
            </label>
            <span className="text-xs font-medium">{tiltPosition}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={tiltPosition}
            onChange={(e) => handleTilt(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      )}

      {/* State indicator */}
      {isMoving && (
        <div
          className="text-xs text-center py-1.5 rounded"
          style={{ backgroundColor: hexToRgba(warning, 0.1), color: warning }}
        >
          {state === "opening" ? "Opening..." : "Closing..."}
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
