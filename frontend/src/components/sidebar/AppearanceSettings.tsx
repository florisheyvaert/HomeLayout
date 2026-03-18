import { useState, useCallback } from "react";
import type { GlobalSettings, FloorBackground, FloorBackgroundType, FurnitureType, SerializedIconRef, DeviceType, DeviceViewportPreset } from "../../types";
import type { ThemeColors, IconData } from "../../theme/types";
import { themePresets, iconPacks, DomIcon, BRAND, useThemeConfig } from "../../theme";
import { resolveIcon } from "../../theme/resolveIcon";
import { BACKGROUND_PRESETS } from "../../backgroundPresets";
import { IconPicker } from "./IconPicker";

// Default preset/pack used when user hasn't overridden
const DEFAULT_THEME_ID = "default";
const DEFAULT_PACK_ID = "emoji";

/* ─── Types ─── */

interface AppearanceSettingsProps {
  settings: GlobalSettings;
  onUpdateSettings: (updates: Partial<GlobalSettings>) => void;
  isDark: boolean;
  themePreference: GlobalSettings["theme"];
  onSetTheme: (theme: GlobalSettings["theme"]) => void;
  floorBackground?: FloorBackground;
  onUpdateFloorBackground?: (bg: FloorBackground) => void;
}

type PickerTarget =
  | { type: "domain"; domain: string; deviceClass?: string }
  | { type: "furniture"; furnitureType: string };

/* ─── Preset color swatches ─── */

const COLOR_SWATCHES: { label: string; colors: string[] }[] = [
  {
    label: "Vivid",
    colors: [
      "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
      "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
      "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
      "#ec4899", "#f43f5e", "#78716c", "#6b7280", "#a3a3a3",
    ],
  },
  {
    label: "Pastel",
    colors: [
      "#fca5a5", "#fdba74", "#fcd34d", "#fde68a", "#bef264",
      "#86efac", "#6ee7b7", "#99f6e4", "#a5f3fc", "#93c5fd",
      "#a5b4fc", "#c4b5fd", "#d8b4fe", "#e9d5ff", "#f0abfc",
      "#f9a8d4", "#fda4af", "#d6d3d1", "#d4d4d8", "#e5e5e5",
    ],
  },
  {
    label: "Mono",
    colors: [
      "#fafafa", "#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373",
      "#525252", "#404040", "#262626", "#171717", "#0a0a0a",
    ],
  },
  {
    label: "Color Blind",
    colors: [
      "#ee7733", "#0077bb", "#33bbee", "#ee3377", "#cc3311",
      "#009988", "#aa3377", "#ccbb44", "#888888", "#000000",
    ],
  },
];

/* ─── Constants ─── */

const themeLabels: Record<GlobalSettings["theme"], string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const DOMAIN_COLOR_LABELS: Record<string, string> = {
  light: "Lights",
  switch: "Switches",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate_heating: "Heating",
  climate_cooling: "Cooling",
  cover: "Covers",
  lock: "Locks",
  media_player: "Media",
  fan: "Fans",
  vacuum: "Vacuums",
  automation: "Automations",
  camera: "Cameras",
};

const DOMAIN_ICON_LABELS: Record<string, string> = {
  light: "Lights",
  switch: "Switches",
  sensor: "Sensors",
  binary_sensor: "Binary Sensors",
  climate: "Climate",
  cover: "Covers",
  lock: "Locks",
  media_player: "Media",
  fan: "Fans",
  vacuum: "Vacuums",
  automation: "Automations",
  camera: "Cameras",
};

const DOMAIN_DEVICE_CLASSES: Record<string, { dc: string; label: string }[]> = {
  sensor: [
    { dc: "temperature", label: "Temperature" },
    { dc: "humidity", label: "Humidity" },
    { dc: "battery", label: "Battery" },
    { dc: "power", label: "Power" },
    { dc: "energy", label: "Energy" },
    { dc: "illuminance", label: "Illuminance" },
    { dc: "pressure", label: "Pressure" },
  ],
  binary_sensor: [
    { dc: "door", label: "Door" },
    { dc: "window", label: "Window" },
    { dc: "motion", label: "Motion" },
    { dc: "occupancy", label: "Occupancy" },
    { dc: "smoke", label: "Smoke" },
    { dc: "moisture", label: "Moisture" },
  ],
};

const FURNITURE_TYPES: FurnitureType[] = [
  "sofa", "chair", "table", "desk", "bed",
  "wardrobe", "bookshelf", "tv", "plant",
  "door", "window",
  "toilet", "shower", "sink", "bathtub",
  "fridge", "oven", "dishwasher",
];

const FURNITURE_LABELS: Record<FurnitureType, string> = {
  sofa: "Sofa", chair: "Chair", table: "Table", desk: "Desk", bed: "Bed",
  wardrobe: "Wardrobe", bookshelf: "Bookshelf", tv: "TV", plant: "Plant",
  door: "Door", window: "Window",
  toilet: "Toilet", shower: "Shower", sink: "Sink", bathtub: "Bathtub",
  fridge: "Fridge", oven: "Oven", dishwasher: "Dishwasher",
};

/* ─── Build a flat index of every icon in every pack (computed once) ─── */


/* ─── Color Picker Row ─── */

function ColorRow({
  colorKey,
  label,
  effectiveColor,
  isOverridden,
  isDark,
  isExpanded,
  onToggle,
  onChange,
  onReset,
}: {
  colorKey: string;
  label: string;
  effectiveColor: string;
  isOverridden: boolean;
  isDark: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (color: string) => void;
  onReset: () => void;
}) {
  const rowBg = isDark ? "#2a2a2a" : "#f5f5f5";

  return (
    <div key={colorKey}>
      <div
        className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer"
        style={{ backgroundColor: rowBg }}
        onClick={onToggle}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 5,
            backgroundColor: effectiveColor,
            border: `2px solid ${isDark ? "#555" : "#ccc"}`,
            flexShrink: 0,
          }}
        />
        <span className="text-xs flex-1">{label}</span>
        {isOverridden && (
          <button
            onClick={(e) => { e.stopPropagation(); onReset(); }}
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: isDark ? "#444" : "#ddd",
              fontSize: 10,
              border: "none",
              cursor: "pointer",
              color: "var(--fp-text)",
            }}
          >
            Reset
          </button>
        )}
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth="1.5"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
            color: "var(--fp-text-secondary)",
          }}
        >
          <path d="M2 3.5l3 3 3-3" />
        </svg>
      </div>
      {isExpanded && (
        <div
          className="px-2 py-2 rounded-b"
          style={{ backgroundColor: isDark ? "#252525" : "#f0f0f0" }}
        >
          {COLOR_SWATCHES.map((group) => (
            <div key={group.label} className="mb-2">
              <div className="text-xs mb-1" style={{ fontSize: 9, color: "var(--fp-text-secondary)", letterSpacing: 0.5 }}>
                {group.label}
              </div>
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))" }}
              >
                {group.colors.map((swatch) => (
                  <button
                    key={swatch}
                    onClick={() => onChange(swatch)}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      borderRadius: 4,
                      backgroundColor: swatch,
                      border: effectiveColor === swatch
                        ? `2px solid ${isDark ? "#fff" : "#000"}`
                        : "2px solid transparent",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <label
            className="flex items-center gap-2 cursor-pointer"
            style={{ fontSize: 11, color: "var(--fp-text-secondary)" }}
          >
            <input
              type="color"
              value={effectiveColor}
              onChange={(e) => onChange(e.target.value)}
              style={{
                width: 24,
                height: 24,
                padding: 0,
                border: `2px solid ${isDark ? "#555" : "#ccc"}`,
                borderRadius: 4,
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            />
            Custom
          </label>
        </div>
      )}
    </div>
  );
}

/* ─── Device Viewport Settings ─── */

const DEVICE_TYPES: { key: DeviceType; label: string; icon: string }[] = [
  { key: "mobile", label: "Mobile", icon: "M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 18h.01" },
  { key: "tablet", label: "Tablet", icon: "M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm6 18h.01" },
  { key: "desktop", label: "Desktop", icon: "M3 4h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm5 16h8m-4-4v4" },
];

const ROTATION_OPTIONS: { value: 0 | 90 | 180 | 270; label: string }[] = [
  { value: 0, label: "0°" },
  { value: 90, label: "90°" },
  { value: 180, label: "180°" },
  { value: 270, label: "270°" },
];

function DeviceViewportSettings({
  settings,
  onUpdateSettings,
  isDark,
}: {
  settings: GlobalSettings;
  onUpdateSettings: (updates: Partial<GlobalSettings>) => void;
  isDark: boolean;
}) {
  const [expandedDevice, setExpandedDevice] = useState<DeviceType | null>(null);

  const getPresetForDevice = (device: DeviceType): DeviceViewportPreset => {
    return settings.device_viewports?.[device] ?? { default_zoom: 1, default_rotation: 0 };
  };

  const updateDevicePreset = (device: DeviceType, updates: Partial<DeviceViewportPreset>) => {
    const current = settings.device_viewports ?? {};
    const existing = current[device] ?? { default_zoom: 1, default_rotation: 0 };
    onUpdateSettings({
      device_viewports: {
        ...current,
        [device]: { ...existing, ...updates },
      },
    });
  };

  const resetDevice = (device: DeviceType) => {
    if (!settings.device_viewports) return;
    const next = { ...settings.device_viewports };
    delete next[device];
    onUpdateSettings({
      device_viewports: Object.keys(next).length > 0 ? next : undefined,
    });
  };

  const rowBg = isDark ? "#2a2a2a" : "#f5f5f5";

  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
        Default Viewport per Device
      </label>
      <p className="text-xs mb-2" style={{ color: "var(--fp-text-secondary)", opacity: 0.7 }}>
        Set the initial zoom and rotation when opening on each device type. Takes effect on next load.
      </p>
      <div className="space-y-1">
        {DEVICE_TYPES.map(({ key, label, icon }) => {
          const preset = getPresetForDevice(key);
          const isOverridden = !!settings.device_viewports?.[key];
          const isExpanded = expandedDevice === key;

          return (
            <div key={key}>
              <div
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer"
                style={{ backgroundColor: rowBg }}
                onClick={() => setExpandedDevice(isExpanded ? null : key)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
                <span className="text-xs flex-1">{label}</span>
                {isOverridden && (
                  <span className="text-xs tabular-nums" style={{ color: "var(--fp-text-secondary)" }}>
                    {Math.round(preset.default_zoom * 100)}% · {preset.default_rotation}°
                  </span>
                )}
                {isOverridden && (
                  <button
                    onClick={(e) => { e.stopPropagation(); resetDevice(key); }}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: isDark ? "#444" : "#ddd",
                      fontSize: 10,
                      border: "none",
                      cursor: "pointer",
                      color: "var(--fp-text)",
                    }}
                  >
                    Reset
                  </button>
                )}
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s",
                    color: "var(--fp-text-secondary)",
                  }}
                >
                  <path d="M2 3.5l3 3 3-3" />
                </svg>
              </div>

              {isExpanded && (
                <div
                  className="px-3 py-2.5 rounded-b space-y-3"
                  style={{ backgroundColor: isDark ? "#252525" : "#f0f0f0" }}
                >
                  {/* Zoom slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
                        Default Zoom
                      </label>
                      <span className="text-xs font-medium tabular-nums">
                        {Math.round(preset.default_zoom * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={300}
                      value={Math.round(preset.default_zoom * 100)}
                      onChange={(e) => updateDevicePreset(key, { default_zoom: Number(e.target.value) / 100 })}
                      className="w-full"
                      style={{ accentColor: BRAND }}
                    />
                    <div className="flex justify-between text-xs" style={{ color: "var(--fp-text-secondary)", fontSize: 9 }}>
                      <span>10%</span>
                      <span>100%</span>
                      <span>300%</span>
                    </div>
                  </div>

                  {/* Rotation */}
                  <div>
                    <label className="block text-xs mb-1" style={{ color: "var(--fp-text-secondary)" }}>
                      Default Rotation
                    </label>
                    <div className="flex gap-1">
                      {ROTATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateDevicePreset(key, { default_rotation: opt.value })}
                          className="flex-1 py-2 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: preset.default_rotation === opt.value ? BRAND : isDark ? "#333" : "#e8e8e8",
                            color: preset.default_rotation === opt.value ? "#fff" : "var(--fp-text)",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export function AppearanceSettings({
  settings,
  onUpdateSettings,
  isDark,
  themePreference,
  onSetTheme,
  floorBackground,
  onUpdateFloorBackground,
}: AppearanceSettingsProps) {
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [expandedColorKey, setExpandedColorKey] = useState<string | null>(null);
  const [bgCustomColor, setBgCustomColor] = useState(floorBackground?.color ?? "#1a1a2e");

  const currentTheme = themePresets[settings.theme_config_id ?? DEFAULT_THEME_ID] ?? themePresets[DEFAULT_THEME_ID];
  const currentPack = iconPacks[settings.icon_pack_id ?? DEFAULT_PACK_ID] ?? iconPacks[DEFAULT_PACK_ID];
  const { resolveEntityIcon, getDomainColor } = useThemeConfig();

  const getEffectiveColor = (key: string): string => {
    return settings.domain_colors?.[key] ?? currentTheme.colors[key as keyof ThemeColors] ?? "#888888";
  };

  const handleColorChange = (key: string, color: string) => {
    const current = settings.domain_colors ?? {};
    onUpdateSettings({ domain_colors: { ...current, [key]: color } });
  };

  const handleColorReset = (key: string) => {
    if (!settings.domain_colors) return;
    const next = { ...settings.domain_colors };
    delete next[key];
    onUpdateSettings({ domain_colors: Object.keys(next).length > 0 ? next : undefined });
  };

  const handleIconPick = useCallback(
    (ref: SerializedIconRef) => {
      if (!pickerTarget) return;
      if (pickerTarget.type === "domain") {
        const key = pickerTarget.deviceClass
          ? `${pickerTarget.domain}.${pickerTarget.deviceClass}`
          : pickerTarget.domain;
        const current = settings.domain_icons ?? {};
        onUpdateSettings({ domain_icons: { ...current, [key]: ref } });
      } else {
        const current = settings.furniture_icons ?? {};
        onUpdateSettings({ furniture_icons: { ...current, [pickerTarget.furnitureType]: ref } });
      }
    },
    [pickerTarget, settings, onUpdateSettings],
  );

  const handleDomainIconReset = (domain: string, deviceClass?: string) => {
    if (!settings.domain_icons) return;
    const key = deviceClass ? `${domain}.${deviceClass}` : domain;
    const next = { ...settings.domain_icons };
    delete next[key];
    onUpdateSettings({ domain_icons: Object.keys(next).length > 0 ? next : undefined });
  };

  const handleFurnitureIconReset = (type: string) => {
    if (!settings.furniture_icons) return;
    const next = { ...settings.furniture_icons };
    delete next[type];
    onUpdateSettings({ furniture_icons: Object.keys(next).length > 0 ? next : undefined });
  };

  const resolveCurrentDomainIcon = (domain: string, deviceClass?: string) => {
    // Use the same resolution path as the canvas (ThemeContext) for consistency
    return resolveEntityIcon(domain, "", deviceClass);
  };

  const resolveCurrentFurnitureIcon = (type: string) => {
    if (settings.furniture_icons?.[type]) {
      const ref = settings.furniture_icons[type];
      const pack = iconPacks[ref.pack_id];
      if (pack) return resolveIcon(pack, ref.domain, "on", ref.device_class);
    }
    return resolveIcon(currentPack, "furniture", "on", type);
  };

  /* ─── Icon picker overlay ─── */
  if (pickerTarget) {
    return (
      <IconPicker
        label={
          pickerTarget.type === "domain"
            ? (pickerTarget.deviceClass
                ? `${DOMAIN_ICON_LABELS[pickerTarget.domain] ?? pickerTarget.domain} → ${pickerTarget.deviceClass}`
                : DOMAIN_ICON_LABELS[pickerTarget.domain] ?? pickerTarget.domain)
            : FURNITURE_LABELS[pickerTarget.furnitureType as FurnitureType] ?? pickerTarget.furnitureType
        }
        isDark={isDark}
        onSelect={handleIconPick}
        onClose={() => setPickerTarget(null)}
      />
    );
  }

  /* ─── Shared styles ─── */
  const rowBg = isDark ? "#2a2a2a" : "#f5f5f5";

  const iconRow = (
    key: string,
    label: string,
    icon: IconData,
    isOverridden: boolean,
    onPick: () => void,
    onReset: () => void,
    domainColorKey?: string,
  ) => (
    <div
      key={key}
      className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer"
      style={{ backgroundColor: rowBg }}
      onClick={onPick}
    >
      <div
        style={{
          background: "none",
          border: `1.5px solid ${isDark ? "#555" : "#ccc"}`,
          borderRadius: 6,
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <DomIcon icon={icon} size={18} fill={domainColorKey ? getDomainColor(domainColorKey) : undefined} />
      </div>
      <span className="text-xs flex-1">{label}</span>
      {isOverridden && (
        <button
          onClick={(e) => { e.stopPropagation(); onReset(); }}
          className="text-xs px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: isDark ? "#444" : "#ddd",
            fontSize: 10,
            border: "none",
            cursor: "pointer",
            color: "var(--fp-text)",
          }}
        >
          Reset
        </button>
      )}
    </div>
  );

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Appearance
      </h3>

      {/* ─── Dark/Light/System ─── */}
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
          Mode
        </label>
        <div className="flex gap-1">
          {(["system", "light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onSetTheme(mode)}
              className="flex-1 py-2.5 rounded-lg text-xs font-medium capitalize"
              style={{
                backgroundColor:
                  themePreference === mode
                    ? "var(--fp-accent)"
                    : isDark ? "#333" : "#e8e8e8",
                color: themePreference === mode ? "#fff" : "var(--fp-text)",
              }}
            >
              {themeLabels[mode]}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Device Viewport Defaults ─── */}
      <DeviceViewportSettings
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        isDark={isDark}
      />

      {/* ─── Floor Background ─── */}
      {onUpdateFloorBackground && (() => {
        const bg = floorBackground ?? { type: "none" as FloorBackgroundType };
        const bgTypes: { value: FloorBackgroundType; label: string }[] = [
          { value: "none", label: "None" },
          { value: "color", label: "Color" },
          { value: "image", label: "Image" },
          { value: "preset", label: "Animated" },
        ];
        return (
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
              Floor Background
            </label>

            {/* Type selector */}
            <div className="flex gap-1 mb-2">
              {bgTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => onUpdateFloorBackground({ ...bg, type: t.value })}
                  className="flex-1 py-2.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: bg.type === t.value ? BRAND : isDark ? "#333" : "#e8e8e8",
                    color: bg.type === t.value ? "#fff" : "var(--fp-text)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Color picker */}
            {bg.type === "color" && (
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={bgCustomColor}
                    onChange={(e) => {
                      setBgCustomColor(e.target.value);
                      onUpdateFloorBackground({ ...bg, color: e.target.value });
                    }}
                    style={{ width: 36, height: 36, border: "none", borderRadius: 8, cursor: "pointer", backgroundColor: "transparent" }}
                  />
                  <span className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>{bgCustomColor}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["#1a1a2e", "#0f3460", "#16213e", "#2c3e50", "#1b2838", "#0d1b2a", "#1e1e2f", "#2d2d44",
                    "#fafafa", "#f0f0f0", "#e8e8e8", "#d4d4d4", "#f5f0eb", "#ede7d9", "#fef3c7", "#ecfdf5"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setBgCustomColor(c);
                        onUpdateFloorBackground({ ...bg, color: c });
                      }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: c,
                        border: bg.color === c ? `2px solid ${BRAND}` : `1px solid ${isDark ? "#555" : "#ccc"}`,
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Image URL */}
            {bg.type === "image" && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={bg.image ?? ""}
                  onChange={(e) => onUpdateFloorBackground({ ...bg, image: e.target.value })}
                  placeholder="/local/floorplan.png"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-blue-500"
                  style={{
                    backgroundColor: isDark ? "#333" : "#fff",
                    borderColor: isDark ? "#555" : "#d1d5db",
                    color: "var(--fp-text)",
                  }}
                />
                <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
                  Use a HA path like /local/floorplan.png or a full URL.
                </p>
                <label
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-medium cursor-pointer"
                  style={{ backgroundColor: BRAND, color: "#fff" }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        onUpdateFloorBackground({ ...bg, image: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>
            )}

            {/* Preset selector */}
            {bg.type === "preset" && (
              <div className="grid gap-1.5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {BACKGROUND_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onUpdateFloorBackground({ ...bg, preset: preset.id })}
                    className="rounded-lg text-xs font-medium py-3"
                    style={{
                      background: typeof preset.style.background === "string" ? preset.style.background : undefined,
                      backgroundSize: "cover",
                      border: bg.preset === preset.id ? `2px solid ${BRAND}` : `1px solid ${isDark ? "#444" : "#ddd"}`,
                      color: "#fff",
                      cursor: "pointer",
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            )}

            {/* Opacity slider (for color, image, preset) */}
            {bg.type !== "none" && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>Opacity</label>
                  <span className="text-xs font-medium">{Math.round((bg.opacity ?? 1) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={bg.opacity ?? 1}
                  onChange={(e) => onUpdateFloorBackground({ ...bg, opacity: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>
            )}
          </div>
        );
      })()}

      {/* ─── Icon Sizes ─── */}
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
          Icon Sizes
        </label>
        <div className="space-y-1.5">
          {/* Global default */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: rowBg }}>
            <span className="text-xs flex-1">All entities</span>
            <span className="text-xs tabular-nums" style={{ color: "var(--fp-text-secondary)", minWidth: 28, textAlign: "right" }}>
              {settings.default_icon_size ?? 36}px
            </span>
            {settings.default_icon_size != null && (
              <button
                onClick={() => onUpdateSettings({ default_icon_size: undefined })}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: isDark ? "#444" : "#ddd",
                  fontSize: 10,
                  border: "none",
                  cursor: "pointer",
                  color: "var(--fp-text)",
                }}
              >
                Reset
              </button>
            )}
          </div>
          <input
            type="range"
            min={16}
            max={80}
            value={settings.default_icon_size ?? 36}
            onChange={(e) => onUpdateSettings({ default_icon_size: Number(e.target.value) })}
            className="w-full"
            style={{ accentColor: BRAND }}
          />

          {/* Per-domain sizes */}
          {Object.entries(DOMAIN_ICON_LABELS).map(([domain, label]) => {
            const domainSize = settings.domain_icon_sizes?.[domain];
            const effective = domainSize ?? settings.default_icon_size ?? 36;
            const isOverridden = domainSize != null;
            return (
              <div key={domain}>
                <div className="flex items-center gap-2 px-2 py-1 rounded" style={{ backgroundColor: rowBg }}>
                  <span className="text-xs flex-1">{label}</span>
                  <span className="text-xs tabular-nums" style={{ color: "var(--fp-text-secondary)", minWidth: 28, textAlign: "right" }}>
                    {effective}px
                  </span>
                  {isOverridden && (
                    <button
                      onClick={() => {
                        const next = { ...settings.domain_icon_sizes };
                        delete next[domain];
                        onUpdateSettings({ domain_icon_sizes: Object.keys(next).length > 0 ? next : undefined });
                      }}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: isDark ? "#444" : "#ddd",
                        fontSize: 10,
                        border: "none",
                        cursor: "pointer",
                        color: "var(--fp-text)",
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>
                <input
                  type="range"
                  min={16}
                  max={80}
                  value={effective}
                  onChange={(e) => {
                    const current = settings.domain_icon_sizes ?? {};
                    onUpdateSettings({ domain_icon_sizes: { ...current, [domain]: Number(e.target.value) } });
                  }}
                  className="w-full"
                  style={{ accentColor: isOverridden ? BRAND : isDark ? "#555" : "#ccc" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Entity Colors + Entity Icons side by side ─── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Entity Colors */}
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
            Entity Colors
          </label>
          <div className="space-y-1">
            {Object.entries(DOMAIN_COLOR_LABELS).map(([key, label]) => (
              <ColorRow
                key={key}
                colorKey={key}
                label={label}
                effectiveColor={getEffectiveColor(key)}
                isOverridden={!!settings.domain_colors?.[key]}
                isDark={isDark}
                isExpanded={expandedColorKey === key}
                onToggle={() => setExpandedColorKey(expandedColorKey === key ? null : key)}
                onChange={(color) => handleColorChange(key, color)}
                onReset={() => handleColorReset(key)}
              />
            ))}
          </div>
        </div>

        {/* Entity Icons */}
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
            Entity Icons
          </label>
          <div className="space-y-1">
            {Object.entries(DOMAIN_ICON_LABELS).map(([domain, label]) => {
              const resolved = resolveCurrentDomainIcon(domain);
              const isOverridden = !!settings.domain_icons?.[domain];
              const dcList = DOMAIN_DEVICE_CLASSES[domain];
              return (
                <div key={domain}>
                  {iconRow(
                    domain,
                    label,
                    resolved.icon,
                    isOverridden,
                    () => setPickerTarget({ type: "domain", domain }),
                    () => handleDomainIconReset(domain),
                    domain,
                  )}
                  {dcList && (
                    <div style={{ paddingLeft: 16 }} className="space-y-1 mt-1">
                      {dcList.map(({ dc, label: dcLabel }) => {
                        const dcResolved = resolveCurrentDomainIcon(domain, dc);
                        const dcOverridden = !!settings.domain_icons?.[`${domain}.${dc}`];
                        return iconRow(
                          `${domain}.${dc}`,
                          dcLabel,
                          dcResolved.icon,
                          dcOverridden,
                          () => setPickerTarget({ type: "domain", domain, deviceClass: dc }),
                          () => handleDomainIconReset(domain, dc),
                          domain,
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Furniture Icons ─── */}
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
          Furniture Icons
        </label>
        <div className="space-y-1">
          {FURNITURE_TYPES.map((type) => {
            const resolved = resolveCurrentFurnitureIcon(type);
            const isOverridden = !!settings.furniture_icons?.[type];
            return iconRow(
              type,
              FURNITURE_LABELS[type],
              resolved.icon,
              isOverridden,
              () => setPickerTarget({ type: "furniture", furnitureType: type }),
              () => handleFurnitureIconReset(type),
            );
          })}
        </div>
      </div>
    </div>
  );
}
