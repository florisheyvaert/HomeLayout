import type { HassEntity } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface SensorDisplayProps {
  entityId: string;
  entity: HassEntity | undefined;
  isDark: boolean;
  domain: string;
}

export function SensorDisplay({ entity, isDark, domain }: SensorDisplayProps) {
  const { resolveEntityIcon, colors, getDomainColor } = useThemeConfig();
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};
  const unit = attrs.unit_of_measurement as string | undefined;
  const deviceClass = attrs.device_class as string | undefined;

  const { icon } = resolveEntityIcon(domain, state, deviceClass);

  const isBinary = domain === "binary_sensor";
  const isActive = state === "on";

  // Numeric formatting
  const numericState = parseFloat(state);
  const isNumeric = !isNaN(numericState);
  const displayValue = isNumeric ? numericState.toLocaleString() : state;

  return (
    <div className="space-y-1.5">
      {/* Compact value row */}
      <div
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
        style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
      >
        <DomIcon icon={icon} size={18} />
        {isBinary ? (
          <div className="flex items-center gap-1.5 flex-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isActive ? getDomainColor(domain) : colors.stateInactive,
                boxShadow: isActive ? `0 0 6px ${hexToRgba(getDomainColor(domain), 0.5)}` : "none",
              }}
            />
            <span className="text-sm font-medium capitalize">{state}</span>
          </div>
        ) : (
          <span className="text-lg font-light flex-1">
            {displayValue}
            {unit && (
              <span className="text-[10px] ml-0.5" style={{ color: "var(--fp-text-secondary)" }}>
                {unit}
              </span>
            )}
          </span>
        )}
        {deviceClass && (
          <span className="text-[10px] capitalize" style={{ color: "var(--fp-text-secondary)" }}>
            {deviceClass.replace("_", " ")}
          </span>
        )}
      </div>

      {/* Last changed */}
      {entity?.last_changed && (
        <div className="text-[10px] px-1" style={{ color: "var(--fp-text-secondary)" }}>
          Updated {new Date(entity.last_changed).toLocaleString()}
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
