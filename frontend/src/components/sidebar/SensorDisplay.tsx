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
    <div className="space-y-3">
      {/* Main value card */}
      <div
        className="p-4 rounded-lg text-center"
        style={{ backgroundColor: isDark ? "#333" : "#f0f0f0" }}
      >
        <div className="text-2xl mb-1 flex justify-center">
          <DomIcon icon={icon} size={28} />
        </div>
        {isBinary ? (
          <div className="flex items-center justify-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: isActive ? getDomainColor(domain) : colors.stateInactive,
                boxShadow: isActive ? `0 0 8px ${hexToRgba(getDomainColor(domain), 0.5)}` : "none",
              }}
            />
            <span className="text-xl font-semibold capitalize">{state}</span>
          </div>
        ) : (
          <div className="text-3xl font-light">
            {displayValue}
            {unit && (
              <span className="text-sm ml-1" style={{ color: "var(--fp-text-secondary)" }}>
                {unit}
              </span>
            )}
          </div>
        )}
        {deviceClass && (
          <div className="text-xs mt-1 capitalize" style={{ color: "var(--fp-text-secondary)" }}>
            {deviceClass.replace("_", " ")}
          </div>
        )}
      </div>

      {/* Last changed */}
      {entity?.last_changed && (
        <div className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
          Last changed: {new Date(entity.last_changed).toLocaleString()}
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
