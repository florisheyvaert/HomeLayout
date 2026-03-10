import type { ThemeConfig } from "./types";

// Brand color from logo
export const BRAND = "#00bf63";

export const defaultTheme: ThemeConfig = {
  id: "default",
  name: "Default",
  colors: {
    light: "#ffb74d",
    switch: "#4caf50",
    sensor: "#2196f3",
    binary_sensor: "#ff9800",
    climate_heating: "#ef4444",
    climate_cooling: "#3b82f6",
    cover: "#9c27b0",
    lock: "#ff5722",
    media_player: "#e91e63",
    fan: "#00bcd4",
    vacuum: "#8bc34a",
    automation: "#ff9800",
    camera: "#607d8b",
    stateInactive: "#6b7280",
    stateWarning: "#fbbf24",
    fallback: "#34d399",
  },
};

export const warmAmberTheme: ThemeConfig = {
  id: "warm-amber",
  name: "Warm Amber",
  colors: {
    light: "#fbbf24",
    switch: "#f59e0b",
    sensor: "#d97706",
    binary_sensor: "#f97316",
    climate_heating: "#dc2626",
    climate_cooling: "#0ea5e9",
    cover: "#b45309",
    lock: "#ea580c",
    media_player: "#c2410c",
    fan: "#0891b2",
    vacuum: "#65a30d",
    automation: "#e67e22",
    camera: "#78716c",
    stateInactive: "#78716c",
    stateWarning: "#f97316",
    fallback: "#fbbf24",
  },
};

export const coolOceanTheme: ThemeConfig = {
  id: "cool-ocean",
  name: "Cool Ocean",
  colors: {
    light: "#fcd34d",
    switch: "#2dd4bf",
    sensor: "#38bdf8",
    binary_sensor: "#a78bfa",
    climate_heating: "#f43f5e",
    climate_cooling: "#38bdf8",
    cover: "#8b5cf6",
    lock: "#f472b6",
    media_player: "#c084fc",
    fan: "#22d3ee",
    vacuum: "#34d399",
    automation: "#fb923c",
    camera: "#64748b",
    stateInactive: "#64748b",
    stateWarning: "#eab308",
    fallback: "#2dd4bf",
  },
};

export const monochromeTheme: ThemeConfig = {
  id: "monochrome",
  name: "Monochrome",
  colors: {
    light: "#d4d4d4",
    switch: "#a3a3a3",
    sensor: "#a3a3a3",
    binary_sensor: "#a3a3a3",
    climate_heating: "#737373",
    climate_cooling: "#a3a3a3",
    cover: "#737373",
    lock: "#737373",
    media_player: "#737373",
    fan: "#a3a3a3",
    vacuum: "#a3a3a3",
    automation: "#737373",
    camera: "#737373",
    stateInactive: "#525252",
    stateWarning: "#737373",
    fallback: "#a3a3a3",
  },
};

export const pastelTheme: ThemeConfig = {
  id: "pastel",
  name: "Pastel",
  colors: {
    light: "#f5d0a9",
    switch: "#a8d8b9",
    sensor: "#a0c4e8",
    binary_sensor: "#d4b5e8",
    climate_heating: "#e8a0a0",
    climate_cooling: "#a0c4e8",
    cover: "#c4a0e8",
    lock: "#e8bfa0",
    media_player: "#e8a0c4",
    fan: "#a0d8e8",
    vacuum: "#b8e8a0",
    automation: "#e8d0a0",
    camera: "#b0aeb5",
    stateInactive: "#b0aeb5",
    stateWarning: "#f0d9a0",
    fallback: "#a8d8b9",
  },
};

export const colorBlindTheme: ThemeConfig = {
  id: "color-blind",
  name: "Color Blind",
  colors: {
    light: "#ee7733",
    switch: "#009988",
    sensor: "#0077bb",
    binary_sensor: "#cc3311",
    climate_heating: "#cc3311",
    climate_cooling: "#0077bb",
    cover: "#aa3377",
    lock: "#ee3377",
    media_player: "#aa3377",
    fan: "#33bbee",
    vacuum: "#009988",
    automation: "#ee7733",
    camera: "#888888",
    stateInactive: "#888888",
    stateWarning: "#ccbb44",
    fallback: "#ee7733",
  },
};

export const themePresets: Record<string, ThemeConfig> = {
  default: defaultTheme,
  "warm-amber": warmAmberTheme,
  "cool-ocean": coolOceanTheme,
  pastel: pastelTheme,
  monochrome: monochromeTheme,
  "color-blind": colorBlindTheme,
};

