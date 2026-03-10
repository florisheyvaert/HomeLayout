import { useState } from "react";
import type { FavoriteItem, HomeAssistant, HassEntity } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface FavoriteCardProps {
  item: FavoriteItem;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
  editMode: boolean;
  onRemove: (id: string) => void;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ACTION_DOMAINS = ["scene", "script", "automation", "button"];
const SENSOR_DOMAINS = ["sensor", "binary_sensor"];

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

export function FavoriteCard({ item, entity, hass, isDark, editMode, onRemove }: FavoriteCardProps) {
  const { resolveEntityIcon, getDomainColor } = useThemeConfig();
  const [pressing, setPressing] = useState(false);
  const domain = getDomain(item.entity_id);
  const state = entity?.state ?? "unknown";

  const isAction = ACTION_DOMAINS.includes(domain);
  const isSensor = SENSOR_DOMAINS.includes(domain);

  const isActive =
    state === "on" || state === "open" || state === "playing" || state === "unlocked";

  const deviceClass = (entity?.attributes?.device_class as string) ?? undefined;
  const { icon } = resolveEntityIcon(domain, state, deviceClass);

  const unit = (entity?.attributes?.unit_of_measurement as string) ?? "";

  const handleTap = () => {
    if (editMode) return;

    if (isAction) {
      // Fire action service
      const serviceMap: Record<string, string> = {
        scene: "turn_on",
        script: "turn_on",
        automation: "trigger",
        button: "press",
      };
      const service = serviceMap[domain];
      if (service) {
        hass.callService(domain, service, {}, { entity_id: item.entity_id });
      }
    } else if (!isSensor) {
      // Toggle
      if (domain === "lock") {
        hass.callService("lock", isActive ? "lock" : "unlock", {}, { entity_id: item.entity_id });
      } else if (domain === "media_player") {
        hass.callService("media_player", isActive ? "media_pause" : "media_play", {}, { entity_id: item.entity_id });
      } else {
        hass.callService(domain, isActive ? "turn_off" : "turn_on", {}, { entity_id: item.entity_id });
      }
    }
  };

  const domainColor = getDomainColor(domain);
  const bgColor = !isSensor && !isAction && isActive
    ? hexToRgba(domainColor, 0.12)
    : isDark ? "#2a2a2a" : "#f0f0f0";

  const cardStyle: React.CSSProperties = {
    display: "flex",
    alignItems: isAction ? "center" : "center",
    justifyContent: isAction ? "center" : "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    height: 64,
    backgroundColor: bgColor,
    cursor: isSensor ? "default" : "pointer",
    position: "relative",
    transition: "transform 0.1s, background 0.2s",
    transform: pressing && !isSensor ? "scale(0.97)" : "scale(1)",
    userSelect: "none",
    overflow: "hidden",
  };

  const iconColor = !isSensor && !isAction && isActive ? domainColor : undefined;

  // Render variants
  if (isAction) {
    return (
      <div
        style={cardStyle}
        onPointerDown={() => setPressing(true)}
        onPointerUp={() => setPressing(false)}
        onPointerLeave={() => setPressing(false)}
        onClick={handleTap}
      >
        {editMode && <RemoveBadge onRemove={() => onRemove(item.id)} />}
        <DomIcon icon={icon} size={22} fill={iconColor} />
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fp-text)" }}>
          {item.label}
        </span>
      </div>
    );
  }

  if (isSensor) {
    return (
      <div style={cardStyle}>
        {editMode && <RemoveBadge onRemove={() => onRemove(item.id)} />}
        <DomIcon icon={icon} size={22} />
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: 11, color: "var(--fp-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.label}
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--fp-text)" }}>
            {state}{unit ? ` ${unit}` : ""}
          </span>
        </div>
      </div>
    );
  }

  // Toggle variant
  return (
    <div
      style={cardStyle}
      onPointerDown={() => setPressing(true)}
      onPointerUp={() => setPressing(false)}
      onPointerLeave={() => setPressing(false)}
      onClick={handleTap}
    >
      {editMode && <RemoveBadge onRemove={() => onRemove(item.id)} />}
      <DomIcon icon={icon} size={22} fill={iconColor} opacity={isActive ? 1 : 0.5} />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fp-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.label}
        </span>
        <span style={{ fontSize: 11, color: isActive ? domainColor : "var(--fp-text-secondary)" }}>
          {state}
        </span>
      </div>
    </div>
  );
}

function RemoveBadge({ onRemove }: { onRemove: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onRemove(); }}
      style={{
        position: "absolute",
        top: 4,
        right: 4,
        width: 20,
        height: 20,
        borderRadius: 10,
        border: "none",
        backgroundColor: "#e53935",
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        lineHeight: 1,
        zIndex: 2,
      }}
    >
      &times;
    </button>
  );
}
