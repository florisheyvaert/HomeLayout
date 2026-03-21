import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import type { HomeAssistant, HassEntity, FloorConfig, EntityPlacement } from "../../types";
import { useThemeConfig, DomIcon } from "../../theme";

interface MultiEntityPanelProps {
  entityIds: string[];
  hass: HomeAssistant;
  isDark: boolean;
  isMobile?: boolean;
  onDeselectEntity: (entityId: string) => void;
  onDeselectAll: () => void;
  /** Floor config for accessing entity placements (needed for vacuum map config) */
  floor?: FloorConfig | null;
  /** Update entity placement (needed for vacuum map config) */
  onUpdateEntity?: (id: string, updates: Partial<EntityPlacement>) => void;
  /** Current app mode */
  isEditMode?: boolean;
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
  floor,
  onUpdateEntity,
  isEditMode,
}: {
  entityId: string;
  hass: HomeAssistant;
  isDark: boolean;
  isMobile: boolean;
  onDismiss: () => void;
  floor?: FloorConfig | null;
  onUpdateEntity?: (id: string, updates: Partial<EntityPlacement>) => void;
  isEditMode?: boolean;
}) {
  const { getDomainColor, resolveEntityIcon, colors } = useThemeConfig();
  const entity = hass.states[entityId];
  const domain = getDomain(entityId);
  const name = getFriendlyName(entity, entityId);
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};
  const domainColor = getDomainColor(domain);
  const isActive =
    state === "on" || state === "open" || state === "playing" || state === "unlocked" || state === "cleaning"
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

  /* ─── Vacuum state ─── */
  const vacuumFeatures = (attrs.supported_features as number) ?? 0;
  const vacuumBattery = attrs.battery_level as number | undefined;
  const vacuumFanSpeed = attrs.fan_speed as string | undefined;
  const vacuumFanSpeedList = attrs.fan_speed_list as string[] | undefined;
  const vacuumIsCleaning = state === "cleaning";
  const vacuumIsPaused = state === "paused";
  const vacuumIsReturning = state === "returning";
  const vacuumIsDocked = state === "docked";
  const vacuumHasStart = vacuumFeatures & 8192;
  const vacuumHasPause = vacuumFeatures & 4;
  const vacuumHasStop = vacuumFeatures & 8;
  const vacuumHasReturn = vacuumFeatures & 16;
  const vacuumHasFanSpeed = vacuumFeatures & 32;
  const vacuumHasLocate = vacuumFeatures & 512;
  const vacuumStatus = attrs.status as string | undefined;

  // Auto-detect related vacuum entities by prefix (e.g. "roborock_qrevo_5ae")
  const vacuumPrefix = domain === "vacuum" ? entityId.split(".")[1] : "";
  const vacuumRelated = useMemo(() => {
    if (domain !== "vacuum") return { mopMode: null, mopIntensity: null, rooms: null, buttons: [] as { id: string; label: string }[] };
    const states = hass.states;
    const mopModeId = `select.${vacuumPrefix}_mop_mode`;
    const mopIntensityId = `select.${vacuumPrefix}_mop_intensity`;
    const currentRoomId = `sensor.${vacuumPrefix}_current_room`;

    const mopMode = states[mopModeId] ?? null;
    const mopIntensity = states[mopIntensityId] ?? null;
    const rooms = states[currentRoomId] ?? null;

    // Find button entities for this vacuum (quick actions like deep clean)
    const buttons: { id: string; label: string }[] = [];
    for (const eid of Object.keys(states)) {
      if (eid.startsWith(`button.${vacuumPrefix}_`) && states[eid]) {
        const friendly = (states[eid].attributes?.friendly_name as string) ?? eid.split(".")[1];
        // Strip the vacuum name prefix from the label
        const vacuumName = (entity?.attributes?.friendly_name as string) ?? "";
        const label = friendly.startsWith(vacuumName) ? friendly.slice(vacuumName.length).trim() : friendly;
        buttons.push({ id: eid, label });
      }
    }

    return { mopMode, mopIntensity, rooms, buttons };
  }, [domain, vacuumPrefix, hass.states, entity?.attributes?.friendly_name]);

  /* ─── Sensor state ─── */
  const sensorUnit = attrs.unit_of_measurement as string | undefined;
  const sensorNumeric = parseFloat(state);
  const sensorIsNumeric = !isNaN(sensorNumeric);

  /* ─── Handlers ─── */
  const toggle = () => {
    if (domain === "light" || domain === "switch" || domain === "fan")
      hass.callService(domain, isActive ? "turn_off" : "turn_on", {}, { entity_id: entityId });
    else if (domain === "vacuum")
      hass.callService("vacuum", isActive ? "return_to_base" : "start", {}, { entity_id: entityId });
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
    vacuum: ["Dock", "Start"],
    lock: ["Locked", "Unlocked"],
    media_player: ["Paused", "Playing"],
    cover: ["Closed", "Open"],
  };
  const [activeLabel, inactiveLabel] = toggleLabels[domain] ?? ["Off", "On"];

  const isVacuum = domain === "vacuum";
  const isToggleable = ["light", "switch", "fan", "lock", "media_player", "cover"].includes(domain);
  const isSensor = domain === "sensor" || domain === "binary_sensor";
  const isCamera = domain === "camera";

  /* ─── Right-side action element ─── */
  const actionElement = isVacuum ? (
    <span className="text-[10px] font-medium capitalize flex-shrink-0" style={{ color: isActive ? domainColor : "var(--fp-text-secondary)" }}>
      {vacuumStatus ?? state}
      {vacuumBattery != null && <span style={{ color: "var(--fp-text-secondary)", marginLeft: 4 }}>{vacuumBattery}%</span>}
    </span>
  ) : isToggleable ? (
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
  ) : isCamera ? (
    <span className="text-[10px] capitalize flex-shrink-0" style={{ color: "var(--fp-text-secondary)" }}>
      {state}
    </span>
  ) : null;

  /* ─── Camera feed ─── */
  const entityPicture = attrs.entity_picture as string | undefined;
  const [cameraSrc, setCameraSrc] = useState("");
  useEffect(() => {
    if (!isCamera || !entityPicture) return;
    const sep = entityPicture.includes("?") ? "&" : "?";
    const update = () => setCameraSrc(`${entityPicture}${sep}ts=${Date.now()}`);
    update();
    const iv = setInterval(update, 10000);
    return () => clearInterval(iv);
  }, [isCamera, entityPicture]);

  /* ─── Has extra controls below? ─── */
  const hasSliders = lightSupportsBrightness || lightHasColorTemp
    || (domain === "cover" && coverPosition !== undefined)
    || (domain === "climate" && isActive && climateTarget !== undefined)
    || isVacuum;

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

        {/* Camera preview */}
        {isCamera && cameraSrc && (
          <div className="px-2.5 pb-2">
            <img
              src={cameraSrc}
              style={{
                width: "100%",
                borderRadius: 6,
                aspectRatio: "16 / 9",
                objectFit: "cover",
                display: "block",
                backgroundColor: isDark ? "#1a1a1a" : "#e0e0e0",
              }}
            />
          </div>
        )}

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

            {/* ─── Vacuum controls ─── */}
            {isVacuum && (
              <div className="space-y-2 pt-1">
                {/* Battery bar */}
                {vacuumBattery != null && (
                  <div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: isDark ? "#444" : "#ddd" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${vacuumBattery}%`,
                          backgroundColor: vacuumBattery > 20 ? domainColor : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Main action buttons */}
                <div className="flex gap-1">
                  {vacuumHasStart && !vacuumIsCleaning && !vacuumIsPaused && (
                    <button
                      onClick={() => hass.callService("vacuum", "start", {}, { entity_id: entityId })}
                      className="flex-1 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-center gap-1"
                      style={{ backgroundColor: hexToRgba(domainColor, 0.15), color: domainColor, border: "none", cursor: "pointer" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                      Start
                    </button>
                  )}
                  {vacuumIsCleaning && vacuumHasPause && (
                    <button
                      onClick={() => hass.callService("vacuum", "pause", {}, { entity_id: entityId })}
                      className="flex-1 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-center gap-1"
                      style={{ backgroundColor: hexToRgba(domainColor, 0.15), color: domainColor, border: "none", cursor: "pointer" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                      Pause
                    </button>
                  )}
                  {vacuumIsPaused && vacuumHasStart && (
                    <button
                      onClick={() => hass.callService("vacuum", "start", {}, { entity_id: entityId })}
                      className="flex-1 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-center gap-1"
                      style={{ backgroundColor: hexToRgba(domainColor, 0.15), color: domainColor, border: "none", cursor: "pointer" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
                      Resume
                    </button>
                  )}
                  {vacuumHasStop && (vacuumIsCleaning || vacuumIsPaused) && (
                    <button
                      onClick={() => hass.callService("vacuum", "stop", {}, { entity_id: entityId })}
                      className="flex-1 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-center gap-1"
                      style={{ backgroundColor: isDark ? "#333" : "#e8e8e8", color: "var(--fp-text)", border: "none", cursor: "pointer" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
                      Stop
                    </button>
                  )}
                  {vacuumHasReturn && !vacuumIsDocked && !vacuumIsReturning && (
                    <button
                      onClick={() => hass.callService("vacuum", "return_to_base", {}, { entity_id: entityId })}
                      className="flex-1 py-1.5 rounded-md text-[10px] font-medium flex items-center justify-center gap-1"
                      style={{ backgroundColor: isDark ? "#333" : "#e8e8e8", color: "var(--fp-text)", border: "none", cursor: "pointer" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                      Dock
                    </button>
                  )}
                  {vacuumIsReturning && (
                    <span className="flex-1 text-[10px] text-center py-1.5 rounded-md" style={{ backgroundColor: hexToRgba(domainColor, 0.1), color: domainColor }}>
                      Returning...
                    </span>
                  )}
                  {vacuumHasLocate && (
                    <button
                      onClick={() => hass.callService("vacuum", "locate", {}, { entity_id: entityId })}
                      className="py-1.5 px-2 rounded-md text-[10px] font-medium flex items-center justify-center"
                      style={{ backgroundColor: isDark ? "#333" : "#e8e8e8", color: "var(--fp-text)", border: "none", cursor: "pointer" }}
                      title="Locate"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                    </button>
                  )}
                </div>

                {/* Fan speed / suction */}
                {vacuumHasFanSpeed && vacuumFanSpeedList && vacuumFanSpeedList.length > 0 && (
                  <div>
                    <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>Suction</label>
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: `repeat(${Math.min(vacuumFanSpeedList.length, 4)}, 1fr)` }}
                    >
                      {vacuumFanSpeedList.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => hass.callService("vacuum", "set_fan_speed", { fan_speed: speed }, { entity_id: entityId })}
                          className="rounded-md text-[10px] font-medium capitalize"
                          style={{
                            backgroundColor: vacuumFanSpeed === speed ? hexToRgba(domainColor, 0.15) : isDark ? "#333" : "#e8e8e8",
                            color: vacuumFanSpeed === speed ? domainColor : "var(--fp-text)",
                            height: 26,
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

                {/* Mop mode */}
                {vacuumRelated.mopMode && (() => {
                  const opts = (vacuumRelated.mopMode.attributes?.options as string[]) ?? [];
                  const current = vacuumRelated.mopMode.state;
                  if (opts.length === 0) return null;
                  return (
                    <div>
                      <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>Mop mode</label>
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(opts.length, 3)}, 1fr)` }}>
                        {opts.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => hass.callService("select", "select_option", { option: opt }, { entity_id: `select.${vacuumPrefix}_mop_mode` })}
                            className="rounded-md text-[10px] font-medium capitalize"
                            style={{
                              backgroundColor: current === opt ? hexToRgba(domainColor, 0.15) : isDark ? "#333" : "#e8e8e8",
                              color: current === opt ? domainColor : "var(--fp-text)",
                              height: 26, border: "none", cursor: "pointer",
                            }}
                          >
                            {opt.replace(/_/g, " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Mop intensity */}
                {vacuumRelated.mopIntensity && (() => {
                  const opts = (vacuumRelated.mopIntensity.attributes?.options as string[]) ?? [];
                  const current = vacuumRelated.mopIntensity.state;
                  if (opts.length === 0) return null;
                  return (
                    <div>
                      <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>Mop intensity</label>
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(opts.length, 4)}, 1fr)` }}>
                        {opts.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => hass.callService("select", "select_option", { option: opt }, { entity_id: `select.${vacuumPrefix}_mop_intensity` })}
                            className="rounded-md text-[10px] font-medium capitalize"
                            style={{
                              backgroundColor: current === opt ? hexToRgba(domainColor, 0.15) : isDark ? "#333" : "#e8e8e8",
                              color: current === opt ? domainColor : "var(--fp-text)",
                              height: 26, border: "none", cursor: "pointer",
                            }}
                          >
                            {opt.replace(/_/g, " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Room selection */}
                {vacuumRelated.rooms && (() => {
                  const roomOpts = (vacuumRelated.rooms.attributes?.options as string[]) ?? [];
                  if (roomOpts.length === 0) return null;
                  return (
                    <div>
                      <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>Clean room</label>
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(roomOpts.length + 1, 4)}, 1fr)` }}>
                        <button
                          onClick={() => hass.callService("vacuum", "start", {}, { entity_id: entityId })}
                          className="rounded-md text-[10px] font-medium"
                          style={{
                            backgroundColor: isDark ? "#333" : "#e8e8e8",
                            color: "var(--fp-text)",
                            height: 26, border: "none", cursor: "pointer",
                          }}
                        >
                          All
                        </button>
                        {roomOpts.map((room) => (
                          <button
                            key={room}
                            onClick={() => hass.callService("vacuum", "send_command", { command: "app_segment_clean", params: [{ name: room }] }, { entity_id: entityId })}
                            className="rounded-md text-[10px] font-medium"
                            style={{
                              backgroundColor: isDark ? "#333" : "#e8e8e8",
                              color: "var(--fp-text)",
                              height: 26, border: "none", cursor: "pointer",
                            }}
                          >
                            {room}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Quick action buttons (deep clean, intensive sweep, etc.) */}
                {vacuumRelated.buttons.length > 0 && (
                  <div>
                    <label className="block text-[10px] mb-1" style={{ color: "var(--fp-text-secondary)" }}>Quick actions</label>
                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(vacuumRelated.buttons.length, 3)}, 1fr)` }}>
                      {vacuumRelated.buttons.map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => hass.callService("button", "press", {}, { entity_id: btn.id })}
                          className="rounded-md text-[10px] font-medium capitalize"
                          style={{
                            backgroundColor: isDark ? "#333" : "#e8e8e8",
                            color: "var(--fp-text)",
                            height: 26, border: "none", cursor: "pointer",
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vacuum map overlay config — edit mode only */}
                {isEditMode && floor && onUpdateEntity && (() => {
                  const placement = floor.entities.find((e) => e.entity_id === entityId);
                  if (!placement) return null;

                  // Auto-detect image entities for this vacuum
                  const imageEntities = Object.keys(hass.states).filter(
                    (eid) => eid.startsWith(`image.${vacuumPrefix}`)
                  );
                  const hasMap = !!placement.vacuum_map_entity_id;

                  return (
                    <div>
                      <label className="flex items-center gap-2 text-[10px] cursor-pointer py-0.5" style={{ color: "var(--fp-text-secondary)" }}>
                        <input
                          type="checkbox"
                          style={{ width: 14, height: 14 }}
                          checked={hasMap}
                          onChange={(e) => {
                            if (e.target.checked) {
                              const autoId = imageEntities[0];
                              onUpdateEntity(placement.id, { vacuum_map_entity_id: autoId });
                            } else {
                              onUpdateEntity(placement.id, { vacuum_map_entity_id: undefined });
                            }
                          }}
                        />
                        Show map overlay
                      </label>

                      {hasMap && (
                        <div className="space-y-1.5 mt-1">
                          {/* Map source selector */}
                          {imageEntities.length > 1 && (
                            <select
                              value={placement.vacuum_map_entity_id ?? ""}
                              onChange={(e) => onUpdateEntity(placement.id, { vacuum_map_entity_id: e.target.value || undefined })}
                              className="w-full px-2 py-1 rounded text-[10px] border"
                              style={{ backgroundColor: isDark ? "#333" : "#fff", borderColor: isDark ? "#555" : "#d1d5db", color: "var(--fp-text)" }}
                            >
                              {imageEntities.map((eid) => (
                                <option key={eid} value={eid}>{(hass.states[eid]?.attributes?.friendly_name as string) ?? eid}</option>
                              ))}
                            </select>
                          )}

                          {/* Opacity slider */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] flex-shrink-0" style={{ color: "var(--fp-text-secondary)" }}>Opacity</span>
                            <input
                              type="range"
                              min={10}
                              max={100}
                              value={Math.round((placement.vacuum_map_transform?.opacity ?? 0.2) * 100)}
                              onChange={(e) => {
                                const t = placement.vacuum_map_transform ?? { x: placement.x - 150, y: placement.y - 150, width: 300, height: 300, rotation: 0, opacity: 0.2 };
                                onUpdateEntity(placement.id, { vacuum_map_transform: { ...t, opacity: Number(e.target.value) / 100 } });
                              }}
                              className="flex-1"
                              style={{ accentColor: domainColor, height: 4 }}
                            />
                            <span className="text-[10px] tabular-nums" style={{ width: 28, textAlign: "right" }}>
                              {Math.round((placement.vacuum_map_transform?.opacity ?? 0.2) * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
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

  const toggleableDomains = ["light", "switch", "fan", "media_player", "lock", "cover", "vacuum"];
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
      else if (domain === "vacuum") hass.callService("vacuum", "start", {}, { entity_id: eid });
      else hass.callService(domain, "turn_on", {}, { entity_id: eid });
    }
  };

  const handleAllOff = () => {
    for (const eid of entityIds) {
      if (domain === "cover") hass.callService("cover", "close_cover", {}, { entity_id: eid });
      else if (domain === "lock") hass.callService("lock", "lock", {}, { entity_id: eid });
      else if (domain === "vacuum") hass.callService("vacuum", "return_to_base", {}, { entity_id: eid });
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
  floor,
  onUpdateEntity,
  isEditMode = false,
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
            floor={floor}
            onUpdateEntity={onUpdateEntity}
            isEditMode={isEditMode}
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
