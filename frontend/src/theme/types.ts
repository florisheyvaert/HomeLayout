// How an icon is rendered
export type IconData =
  | { type: "emoji"; value: string }
  | { type: "path"; value: string; viewBox?: { w: number; h: number } }; // SVG path d-string, default 24x24

// How state is visually shown on the icon
export interface IconStateStyle {
  opacity?: number; // 0.4 for off, 1.0 for on
  colorMode?: "static" | "entity_rgb"; // entity_rgb = use lamp's RGB color
  staticColor?: string; // fixed color when "static"
}

// An icon entry: which icon + how per state
export interface IconEntry {
  icon: IconData;
  stateStyles?: Record<string, IconStateStyle>; // "on", "off", "dimmed", etc.
  defaultStyle?: IconStateStyle;
}

// Domain config within a pack
export interface DomainIconConfig {
  default: IconEntry;
  states?: Record<string, IconEntry>;
  deviceClasses?: Record<
    string,
    { default: IconEntry; states?: Record<string, IconEntry> }
  >;
}

// The icon pack itself
export interface IconPack {
  id: string;
  name: string;
  description?: string;
  fallback: IconEntry;
  domains: Record<string, DomainIconConfig>;
}

// Theme colors — per-domain entity colors
export interface ThemeColors {
  light: string;
  switch: string;
  sensor: string;
  binary_sensor: string;
  climate_heating: string;
  climate_cooling: string;
  cover: string;
  lock: string;
  media_player: string;
  fan: string;
  vacuum: string;
  automation: string;
  camera: string;
  stateInactive: string;
  stateWarning: string;
  fallback: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: ThemeColors;
  fontFamily?: string; // CSS font-family string
}

// Resolved icon result from resolveIcon
export interface ResolvedIcon {
  icon: IconData;
  style: IconStateStyle;
}
