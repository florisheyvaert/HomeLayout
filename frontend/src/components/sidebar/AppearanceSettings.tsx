import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { GlobalSettings, FurnitureType, SerializedIconRef } from "../../types";
import type { ThemeColors, IconData } from "../../theme/types";
import { themePresets, iconPacks, DomIcon, BRAND } from "../../theme";
import { resolveIcon } from "../../theme/resolveIcon";

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
}

interface IconCandidate {
  packId: string;
  packName: string;
  domain: string;
  deviceClass?: string;
  icon: IconData;
  /** Searchable text: "mdi light", "emoji sensor temperature", etc. */
  keywords: string;
}

type PickerTarget =
  | { type: "domain"; domain: string }
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

function buildIconIndex(): IconCandidate[] {
  const candidates: IconCandidate[] = [];
  const seen = new Set<string>();

  for (const pack of Object.values(iconPacks)) {
    // Fallback
    const fbKey = `${pack.id}::__fallback__`;
    if (!seen.has(fbKey)) {
      seen.add(fbKey);
      candidates.push({
        packId: pack.id,
        packName: pack.name,
        domain: "__fallback__",
        icon: pack.fallback.icon,
        keywords: `${pack.name} ${pack.id} fallback`.toLowerCase(),
      });
    }

    for (const [domain, domainConfig] of Object.entries(pack.domains)) {
      // Domain default
      const dKey = `${pack.id}::${domain}`;
      if (!seen.has(dKey)) {
        seen.add(dKey);
        candidates.push({
          packId: pack.id,
          packName: pack.name,
          domain,
          icon: domainConfig.default.icon,
          keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")}`.toLowerCase(),
        });
      }

      // Domain states (only add if icon differs from default)
      if (domainConfig.states) {
        for (const [state, entry] of Object.entries(domainConfig.states)) {
          const sKey = `${pack.id}::${domain}::state::${state}`;
          if (seen.has(sKey)) continue;
          // Skip if same icon as domain default
          if (JSON.stringify(entry.icon) === JSON.stringify(domainConfig.default.icon)) continue;
          seen.add(sKey);
          candidates.push({
            packId: pack.id,
            packName: pack.name,
            domain,
            icon: entry.icon,
            keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${state}`.toLowerCase(),
          });
        }
      }

      // Device classes
      if (domainConfig.deviceClasses) {
        for (const [dc, dcConfig] of Object.entries(domainConfig.deviceClasses)) {
          const dcKey = `${pack.id}::${domain}::${dc}`;
          if (seen.has(dcKey)) continue;
          seen.add(dcKey);
          candidates.push({
            packId: pack.id,
            packName: pack.name,
            domain,
            deviceClass: dc,
            icon: dcConfig.default.icon,
            keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${dc.replace(/_/g, " ")}`.toLowerCase(),
          });

          // Device class states with different icons
          if (dcConfig.states) {
            for (const [state, entry] of Object.entries(dcConfig.states)) {
              const dsKey = `${pack.id}::${domain}::${dc}::${state}`;
              if (seen.has(dsKey)) continue;
              if (JSON.stringify(entry.icon) === JSON.stringify(dcConfig.default.icon)) continue;
              seen.add(dsKey);
              candidates.push({
                packId: pack.id,
                packName: pack.name,
                domain,
                deviceClass: dc,
                icon: entry.icon,
                keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${dc.replace(/_/g, " ")} ${state}`.toLowerCase(),
              });
            }
          }
        }
      }
    }
  }

  return candidates;
}

let _iconIndex: IconCandidate[] | null = null;
function getIconIndex(): IconCandidate[] {
  if (!_iconIndex) _iconIndex = buildIconIndex();
  return _iconIndex;
}

/* ─── Icon Picker Component ─── */

function IconPicker({
  target,
  isDark,
  onSelect,
  onClose,
}: {
  target: PickerTarget;
  isDark: boolean;
  onSelect: (ref: SerializedIconRef) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allIcons = useMemo(() => getIconIndex(), []);

  useEffect(() => {
    // Focus search on open
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    const terms = q.split(/\s+/);
    return allIcons.filter((c) => terms.every((t) => c.keywords.includes(t)));
  }, [query, allIcons]);

  // Group by pack for display
  const grouped = useMemo(() => {
    const map = new Map<string, IconCandidate[]>();
    for (const c of filtered) {
      const list = map.get(c.packId) ?? [];
      list.push(c);
      map.set(c.packId, list);
    }
    return map;
  }, [filtered]);

  const handleSelect = useCallback(
    (c: IconCandidate) => {
      const ref: SerializedIconRef = {
        pack_id: c.packId,
        domain: c.domain,
        device_class: c.deviceClass,
      };
      onSelect(ref);
      onClose();
    },
    [onSelect, onClose],
  );

  const label =
    target.type === "domain"
      ? DOMAIN_ICON_LABELS[target.domain] ?? target.domain
      : FURNITURE_LABELS[target.furnitureType as FurnitureType] ?? target.furnitureType;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}` }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: "var(--fp-text)",
            padding: "2px 4px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
        </button>
        <span className="text-sm font-medium flex-1">Icon for {label}</span>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons... (e.g. light, mdi, temperature)"
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
            color: "var(--fp-text)",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
          }}
        />
        <div className="text-xs mt-1" style={{ color: "var(--fp-text-secondary)" }}>
          {filtered.length} icons found
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-3 pb-3" style={{ scrollbarWidth: "thin" }}>
        {Array.from(grouped.entries()).map(([packId, icons]) => (
          <div key={packId} className="mb-3">
            <div
              className="text-xs font-semibold mb-1.5 sticky top-0 py-1 px-1"
              style={{
                color: "var(--fp-text-secondary)",
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
              }}
            >
              {iconPacks[packId]?.name ?? packId}
            </div>
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" }}
            >
              {icons.map((c, i) => {
                const tooltip = [c.domain, c.deviceClass].filter(Boolean).join(" / ");
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(c)}
                    title={tooltip}
                    className="flex items-center justify-center rounded-lg transition-colors"
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
                      border: "1.5px solid transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = BRAND;
                      (e.currentTarget as HTMLElement).style.backgroundColor = isDark ? "#333" : "#e8e8e8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLElement).style.backgroundColor = isDark ? "#2a2a2a" : "#f5f5f5";
                    }}
                  >
                    <DomIcon icon={c.icon} size={22} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: "var(--fp-text-secondary)" }}>
            No icons match "{query}"
          </div>
        )}
      </div>
    </div>
  );
}

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

/* ─── Main Component ─── */

export function AppearanceSettings({
  settings,
  onUpdateSettings,
  isDark,
  themePreference,
  onSetTheme,
}: AppearanceSettingsProps) {
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [expandedColorKey, setExpandedColorKey] = useState<string | null>(null);

  const currentTheme = themePresets[settings.theme_config_id ?? DEFAULT_THEME_ID] ?? themePresets[DEFAULT_THEME_ID];
  const currentPack = iconPacks[settings.icon_pack_id ?? DEFAULT_PACK_ID] ?? iconPacks[DEFAULT_PACK_ID];

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
        const current = settings.domain_icons ?? {};
        onUpdateSettings({ domain_icons: { ...current, [pickerTarget.domain]: ref } });
      } else {
        const current = settings.furniture_icons ?? {};
        onUpdateSettings({ furniture_icons: { ...current, [pickerTarget.furnitureType]: ref } });
      }
    },
    [pickerTarget, settings, onUpdateSettings],
  );

  const handleDomainIconReset = (domain: string) => {
    if (!settings.domain_icons) return;
    const next = { ...settings.domain_icons };
    delete next[domain];
    onUpdateSettings({ domain_icons: Object.keys(next).length > 0 ? next : undefined });
  };

  const handleFurnitureIconReset = (type: string) => {
    if (!settings.furniture_icons) return;
    const next = { ...settings.furniture_icons };
    delete next[type];
    onUpdateSettings({ furniture_icons: Object.keys(next).length > 0 ? next : undefined });
  };

  const resolveCurrentDomainIcon = (domain: string) => {
    if (settings.domain_icons?.[domain]) {
      const ref = settings.domain_icons[domain];
      const pack = iconPacks[ref.pack_id];
      if (pack) return resolveIcon(pack, ref.domain, "on", ref.device_class);
    }
    return resolveIcon(currentPack, domain, "on");
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
      <div style={{ position: "relative", height: "100%", minHeight: 400 }}>
        <IconPicker
          target={pickerTarget}
          isDark={isDark}
          onSelect={handleIconPick}
          onClose={() => setPickerTarget(null)}
        />
      </div>
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
  ) => (
    <div
      key={key}
      className="flex items-center gap-2 px-2 py-1.5 rounded"
      style={{ backgroundColor: rowBg }}
    >
      <button
        onClick={onPick}
        style={{
          background: "none",
          border: `1.5px solid ${isDark ? "#555" : "#ccc"}`,
          borderRadius: 6,
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
        title="Change icon"
      >
        <DomIcon icon={icon} size={18} />
      </button>
      <span className="text-xs flex-1">{label}</span>
      {isOverridden && (
        <button
          onClick={onReset}
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
              className="flex-1 py-1.5 rounded text-xs font-medium capitalize"
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

      {/* ─── Entity Colors ─── */}
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

      {/* ─── Entity Icons ─── */}
      <div>
        <label className="block text-xs mb-1.5" style={{ color: "var(--fp-text-secondary)" }}>
          Entity Icons
        </label>
        <div className="space-y-1">
          {Object.entries(DOMAIN_ICON_LABELS).map(([domain, label]) => {
            const resolved = resolveCurrentDomainIcon(domain);
            const isOverridden = !!settings.domain_icons?.[domain];
            return iconRow(
              domain,
              label,
              resolved.icon,
              isOverridden,
              () => setPickerTarget({ type: "domain", domain }),
              () => handleDomainIconReset(domain),
            );
          })}
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
