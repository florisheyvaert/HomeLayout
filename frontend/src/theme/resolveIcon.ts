import type { IconPack, IconEntry, ResolvedIcon, IconStateStyle } from "./types";

/**
 * Resolve the icon + style for an entity given a pack.
 *
 * Lookup cascade:
 * 1. pack.domains[domain].deviceClasses[deviceClass].states[state]
 * 2. pack.domains[domain].deviceClasses[deviceClass].default
 * 3. pack.domains[domain].states[state]
 * 4. pack.domains[domain].default
 * 5. pack.fallback
 */
export function resolveIcon(
  pack: IconPack,
  domain: string,
  state: string,
  deviceClass?: string,
): ResolvedIcon {
  const domainConfig = pack.domains[domain];

  let entry: IconEntry | undefined;

  if (domainConfig) {
    // 1. deviceClass + state
    if (deviceClass && domainConfig.deviceClasses?.[deviceClass]?.states?.[state]) {
      entry = domainConfig.deviceClasses[deviceClass].states![state];
    }
    // 2. deviceClass default
    if (!entry && deviceClass && domainConfig.deviceClasses?.[deviceClass]) {
      entry = domainConfig.deviceClasses[deviceClass].default;
    }
    // 3. domain + state
    if (!entry && domainConfig.states?.[state]) {
      entry = domainConfig.states[state];
    }
    // 4. domain default
    if (!entry) {
      entry = domainConfig.default;
    }
  }

  // 5. fallback
  if (!entry) {
    entry = pack.fallback;
  }

  const style = entry.stateStyles?.[state] ?? entry.defaultStyle ?? { opacity: 1, colorMode: "static" as const };

  return { icon: entry.icon, style };
}

/**
 * Compute the effective fill color and opacity for a light entity icon.
 */
export function computeLightStyle(
  style: IconStateStyle,
  state: string,
  brightness?: number,
  rgbColor?: [number, number, number],
): { opacity: number; fillColor?: string } {
  let opacity = style.opacity ?? 1;
  let fillColor: string | undefined;

  if (state === "on") {
    // Brightness-based opacity: 0.3 (min) to 1.0 (full)
    if (brightness !== undefined && brightness < 255) {
      opacity = 0.3 + (brightness / 255) * 0.7;
    }
    // RGB tinting
    if (style.colorMode === "entity_rgb" && rgbColor) {
      fillColor = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    }
  }

  return { opacity, fillColor };
}
