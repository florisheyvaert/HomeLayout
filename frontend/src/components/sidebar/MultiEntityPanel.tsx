import { useRef, useCallback, useState, useEffect } from "react";
import type { HomeAssistant, HassEntity } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface MultiEntityPanelProps {
  entityIds: string[];
  hass: HomeAssistant;
  isDark: boolean;
  isMobile?: boolean;
  onDeselectEntity: (entityId: string) => void;
  onDeselectAll: () => void;
}

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

function getFriendlyName(entity: HassEntity | undefined, entityId: string): string {
  return (entity?.attributes?.friendly_name as string) ?? entityId.split(".")[1];
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ─── Swipeable wrapper (mobile) ─── */

function SwipeableCard({
  children,
  onDismiss,
  isMobile,
}: {
  children: React.ReactNode;
  onDismiss: () => void;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || !ref.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (!swiping.current && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiping.current = true;
    }
    if (swiping.current) {
      ref.current.style.transform = `translateX(${dx}px)`;
      ref.current.style.opacity = `${Math.max(0, 1 - Math.abs(dx) / 200)}`;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || !ref.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    touchStart.current = null;
    if (swiping.current && Math.abs(dx) > 80) {
      ref.current.style.transition = "transform 0.2s, opacity 0.2s";
      ref.current.style.transform = `translateX(${dx > 0 ? 300 : -300}px)`;
      ref.current.style.opacity = "0";
      setTimeout(onDismiss, 200);
    } else {
      ref.current.style.transition = "transform 0.15s, opacity 0.15s";
      ref.current.style.transform = "translateX(0)";
      ref.current.style.opacity = "1";
      setTimeout(() => { if (ref.current) ref.current.style.transition = ""; }, 150);
    }
    swiping.current = false;
  }, [onDismiss]);

  return (
    <div
      ref={ref}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      style={{ willChange: isMobile ? "transform" : undefined }}
    >
      {children}
    </div>
  );
}

/* ─── Inline toggle button ─── */

function ToggleButton({
  isActive,
  accentColor,
  isDark,
  onClick,
  icon,
  label,
}: {
  isActive: boolean;
  accentColor: string;
  isDark: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex-shrink-0"
      style={{
        backgroundColor: isActive ? hexToRgba(accentColor, 0.18) : isDark ? "#3a3a3a" : "#e4e4e4",
        color: isActive ? accentColor : "var(--fp-text-secondary)",
        border: "none",
        cursor: "pointer",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ─── Compact slider row ─── */

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  accent,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  accent: string;
  isDark?: boolean;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--fp-text-secondary)", width: 52 }}>
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
        style={{ accentColor: accent, height: 4 }}
      />
      <span className="text-[10px] font-medium tabular-nums flex-shrink-0" style={{ width: 32, textAlign: "right" }}>
        {suffix ?? value}
      </span>
    </div>
  );
}

/* ─── Entity card ─── */

function EntityCard({
  entityId,
  hass,
  isDark,
  isMobile,
  onDismiss,
}: {
  entityId: string;
  hass: HomeAssistant;
  isDark: boolean;
  isMobile: boolean;
  onDismiss: () => void;
}) {
  const { getDomainColor, resolveEntityIcon, colors } = useThemeConfig();
  const entity = hass.states[entityId];
  const domain = getDomain(entityId);
  const name = getFriendlyName(entity, entityId);
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};
  const domainColor = getDomainColor(domain);
  const isActive =
    state === "on" || state === "open" || state === "playing" || state === "unlocked"
    || (domain === "climate" && !["off", "unavailable", "unknown"].includes(state));

  /* ─── Light state ─── */
  const lightColorModes = domain === "light" && Array.isArray(attrs.supported_color_modes)
    ? attrs.supported_color_modes as string[] : [];
  const lightSupportsBrightness = domain === "light" && lightColorModes.length > 0;
  const lightHasColorTemp = domain === "light" && lightColorModes.includes("color_temp");

  const [brightness, setBrightness] = useState<number>((attrs.brightness as number) ?? 0);
  const [colorTemp, setColorTemp] = useState<number>((attrs.color_temp as number) ?? 300);
  useEffect(() => {
    setBrightness((attrs.brightness as number) ?? 0);
  }, [attrs.brightness]);
  useEffect(() => {
    if (attrs.color_temp !== undefined) setColorTemp(attrs.color_temp as number);
  }, [attrs.color_temp]);

  /* ─── Climate state ─── */
  const climateTarget = attrs.temperature as number | undefined;
  const climateUnit = (attrs.unit_of_measurement as string) ?? "°C";
  const climateMin = (attrs.min_temp as number) ?? 7;
  const climateMax = (attrs.max_temp as number) ?? 35;
  const climateStep = (attrs.target_temp_step as number) ?? 0.5;
  const [tempValue, setTempValue] = useState<number>(climateTarget ?? 20);
  useEffect(() => {
    if (climateTarget !== undefined) setTempValue(climateTarget);
  }, [climateTarget]);

  /* ─── Cover state ─── */
  const coverPosition = attrs.current_position as number | undefined;

  /* ─── Sensor state ─── */
  const sensorUnit = attrs.unit_of_measurement as string | undefined;
  const sensorNumeric = parseFloat(state);
  const sensorIsNumeric = !isNaN(sensorNumeric);

  /* ─── Handlers ─── */
  const toggle = () => {
    if (domain === "light" || domain === "switch" || domain === "fan")
      hass.callService(domain, isActive ? "turn_off" : "turn_on", {}, { entity_id: entityId });
    else if (domain === "lock")
      hass.callService("lock", isActive ? "lock" : "unlock", {}, { entity_id: entityId });
    else if (domain === "media_player")
      hass.callService("media_player", isActive ? "media_pause" : "media_play", {}, { entity_id: entityId });
    else if (domain === "cover")
      hass.callService("cover", isActive ? "close_cover" : "open_cover", {}, { entity_id: entityId });
  };

  const setBright = (v: number) => {
    setBrightness(v);
    hass.callService("light", "turn_on", { brightness: v }, { entity_id: entityId });
  };

  const setTemp = (v: number) => {
    setColorTemp(v);
    hass.callService("light", "turn_on", { color_temp: v }, { entity_id: entityId });
  };

  const setClimateTemp = (v: number) => {
    setTempValue(v);
    hass.callService("climate", "set_temperature", { temperature: v }, { entity_id: entityId });
  };

  const setCoverPos = (v: number) => {
    hass.callService("cover", "set_cover_position", { position: v }, { entity_id: entityId });
  };

  /* ─── Resolve icon for current state ─── */
  const { icon } = resolveEntityIcon(domain, state);

  /* ─── Determine toggle labels ─── */
  const toggleLabels: Record<string, [string, string]> = {
    light: ["Off", "On"],
    switch: ["Off", "On"],
    fan: ["Off", "On"],
    lock: ["Locked", "Unlocked"],
    media_player: ["Paused", "Playing"],
    cover: ["Closed", "Open"],
  };
  const [activeLabel, inactiveLabel] = toggleLabels[domain] ?? ["Off", "On"];

  const isToggleable = ["light", "switch", "fan", "lock", "media_player", "cover"].includes(domain);
  const isSensor = domain === "sensor" || domain === "binary_sensor";

  /* ─── Right-side action element ─── */
  const actionElement = isToggleable ? (
    <ToggleButton
      isActive={isActive}
      accentColor={domainColor}
      isDark={isDark}
      onClick={toggle}
      icon={<DomIcon icon={icon} size={12} />}
      label={isActive ? activeLabel : inactiveLabel}
    />
  ) : isSensor ? (
    <span className="text-xs font-medium tabular-nums flex-shrink-0" style={{ color: "var(--fp-text)" }}>
      {sensorIsNumeric ? sensorNumeric.toLocaleString() : state}
      {sensorUnit && <span className="text-[10px] ml-0.5" style={{ color: "var(--fp-text-secondary)" }}>{sensorUnit}</span>}
    </span>
  ) : domain === "climate" ? (
    <span className="text-xs font-medium tabular-nums flex-shrink-0">
      {attrs.current_temperature != null ? `${attrs.current_temperature}${climateUnit}` : state}
    </span>
  ) : null;

  /* ─── Has extra controls below? ─── */
  const hasSliders = lightSupportsBrightness || lightHasColorTemp
    || (domain === "cover" && coverPosition !== undefined)
    || (domain === "climate" && isActive && climateTarget !== undefined);

  const brightPct = Math.round((brightness / 255) * 100);

  return (
    <SwipeableCard onDismiss={onDismiss} isMobile={isMobile}>
      <div
        className="rounded-lg"
        style={{
          backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
          border: `1px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
        }}
      >
        {/* Row 1: name + action */}
        <div className="flex items-center gap-2 px-2.5 py-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: isActive ? domainColor : colors.stateInactive }}
          />
          <span className="text-xs font-medium truncate flex-1 min-w-0">{name}</span>
          {actionElement}
          {!isMobile && (
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(); }}
              title="Remove"
              style={{
                width: 18, height: 18, borderRadius: 4,
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "transparent",
                color: isDark ? "#555" : "#bbb",
                flexShrink: 0,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Row 2: sliders */}
        {hasSliders && (
          <div
            className="px-2.5 pb-2 space-y-1"
            style={{ borderTop: `1px solid ${isDark ? "#333" : "#eaeaea"}` }}
          >
            <div style={{ height: 4 }} />
            {lightSupportsBrightness && (
              <SliderRow
                label="Brightness"
                value={brightness}
                min={1}
                max={255}
                accent={domainColor}
                isDark={isDark}
                onChange={setBright}
                suffix={`${brightPct}%`}
              />
            )}
            {lightHasColorTemp && (
              <SliderRow
                label="Color temp"
                value={colorTemp}
                min={(attrs.min_mireds as number) ?? 153}
                max={(attrs.max_mireds as number) ?? 500}
                accent="#ffa726"
                isDark={isDark}
                onChange={setTemp}
                suffix={`${colorTemp}`}
              />
            )}
            {domain === "cover" && coverPosition !== undefined && (
              <SliderRow
                label="Position"
                value={coverPosition}
                min={0}
                max={100}
                accent={domainColor}
                isDark={isDark}
                onChange={setCoverPos}
                suffix={`${coverPosition}%`}
              />
            )}
            {domain === "climate" && isActive && climateTarget !== undefined && (
              <SliderRow
                label="Target"
                value={tempValue}
                min={climateMin}
                max={climateMax}
                step={climateStep}
                accent={domainColor}
                isDark={isDark}
                onChange={setClimateTemp}
                suffix={`${tempValue}${climateUnit}`}
              />
            )}
          </div>
        )}
      </div>
    </SwipeableCard>
  );
}

/* ─── Bulk control for single-domain selection ─── */

function SingleDomainBulk({
  entityIds,
  hass,
  isDark,
}: {
  entityIds: string[];
  hass: HomeAssistant;
  isDark: boolean;
}) {
  const { getDomainColor } = useThemeConfig();
  const domain = getDomain(entityIds[0]);
  const domainColor = getDomainColor(domain);

  const toggleableDomains = ["light", "switch", "fan", "media_player", "lock", "cover"];
  const isToggleable = toggleableDomains.includes(domain);

  // Compute average brightness / cover position from actual HA state
  const avgBrightness = domain === "light" ? (() => {
    let sum = 0, count = 0;
    for (const eid of entityIds) {
      const b = hass.states[eid]?.attributes?.brightness;
      if (typeof b === "number") { sum += b; count++; }
    }
    return count > 0 ? Math.round(sum / count) : 0;
  })() : 0;

  const avgCoverPos = domain === "cover" ? (() => {
    let sum = 0, count = 0;
    for (const eid of entityIds) {
      const p = hass.states[eid]?.attributes?.current_position;
      if (typeof p === "number") { sum += p; count++; }
    }
    return count > 0 ? Math.round(sum / count) : 50;
  })() : 50;

  const handleAllOn = () => {
    for (const eid of entityIds) {
      if (domain === "cover") hass.callService("cover", "open_cover", {}, { entity_id: eid });
      else if (domain === "lock") hass.callService("lock", "unlock", {}, { entity_id: eid });
      else hass.callService(domain, "turn_on", {}, { entity_id: eid });
    }
  };

  const handleAllOff = () => {
    for (const eid of entityIds) {
      if (domain === "cover") hass.callService("cover", "close_cover", {}, { entity_id: eid });
      else if (domain === "lock") hass.callService("lock", "lock", {}, { entity_id: eid });
      else hass.callService(domain, "turn_off", {}, { entity_id: eid });
    }
  };

  const handleBulkBrightness = (val: number) => {
    for (const eid of entityIds) {
      hass.callService("light", "turn_on", { brightness: val }, { entity_id: eid });
    }
  };

  const handleBulkCoverPosition = (val: number) => {
    for (const eid of entityIds) {
      hass.callService("cover", "set_cover_position", { position: val }, { entity_id: eid });
    }
  };

  return (
    <div
      className="rounded-lg p-2.5 space-y-2"
      style={{
        backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
        border: `1px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--fp-text-secondary)" }}>
        Bulk — {entityIds.length} {domain.replace("_", " ")}{entityIds.length > 1 ? "s" : ""}
      </div>

      {isToggleable && (
        <div className="flex gap-1">
          <button
            onClick={handleAllOn}
            className="flex-1 py-1.5 rounded-md text-[11px] font-medium transition-all"
            style={{
              backgroundColor: hexToRgba(domainColor, 0.15),
              color: domainColor,
              border: "none",
              cursor: "pointer",
            }}
          >
            All On
          </button>
          <button
            onClick={handleAllOff}
            className="flex-1 py-1.5 rounded-md text-[11px] font-medium transition-all"
            style={{
              backgroundColor: isDark ? "#333" : "#e8e8e8",
              color: "var(--fp-text)",
              border: "none",
              cursor: "pointer",
            }}
          >
            All Off
          </button>
        </div>
      )}

      {domain === "light" && (
        <SliderRow
          label="Brightness"
          value={avgBrightness}
          min={1}
          max={255}
          accent={domainColor}
          onChange={handleBulkBrightness}
          suffix={`${Math.round((avgBrightness / 255) * 100)}%`}
        />
      )}

      {domain === "cover" && (
        <SliderRow
          label="Position"
          value={avgCoverPos}
          min={0}
          max={100}
          accent={domainColor}
          onChange={handleBulkCoverPosition}
          suffix={`${avgCoverPos}%`}
        />
      )}
    </div>
  );
}

/* ─── Main panel ─── */

export function MultiEntityPanel({
  entityIds,
  hass,
  isDark,
  isMobile = false,
  onDeselectEntity,
  onDeselectAll,
}: MultiEntityPanelProps) {
  const domains = new Set(entityIds.map(getDomain));
  const isSingleDomain = domains.size === 1 && entityIds.length > 1;
  const reversed = [...entityIds].reverse();

  return (
    <div className="flex flex-col" style={{ minHeight: 0, flex: 1 }}>
      {/* Header — extra right padding to avoid overlap with close button */}
      <div className="flex items-center gap-2 pt-4 pb-2" style={{ paddingLeft: 16, paddingRight: 44 }}>
        <span className="text-sm font-semibold uppercase tracking-wide flex-1">
          {entityIds.length} Entities
        </span>
        {isMobile && (
          <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
            Swipe to remove
          </span>
        )}
      </div>

      {/* Scrollable entity list */}
      <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-1.5" style={{ scrollbarWidth: "thin" }}>
        {reversed.map((entityId) => (
          <EntityCard
            key={entityId}
            entityId={entityId}
            hass={hass}
            isDark={isDark}
            isMobile={isMobile}
            onDismiss={() => onDeselectEntity(entityId)}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="px-4 pb-4 space-y-2"
        style={{
          flexShrink: 0,
          borderTop: `1px solid ${isDark ? "#333" : "#e8e8e8"}`,
          paddingTop: 12,
        }}
      >
        {isSingleDomain && (
          <SingleDomainBulk entityIds={entityIds} hass={hass} isDark={isDark} />
        )}
        <button
          onClick={onDeselectAll}
          className="w-full text-[11px] py-1.5 rounded-md"
          style={{
            backgroundColor: isDark ? "#333" : "#e8e8e8",
            color: "var(--fp-text-secondary)",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
