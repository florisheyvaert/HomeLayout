import { createContext, useContext, useMemo } from "react";
import type { IconPack, ThemeConfig, ThemeColors, ResolvedIcon } from "./types";
import type { SerializedIconRef } from "../types";
import { resolveIcon, computeLightStyle } from "./resolveIcon";
import { themePresets } from "./colors";
import { iconPacks } from "./packs";

const FONT_FAMILY = '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

interface ThemeContextValue {
  themeConfig: ThemeConfig;
  iconPack: IconPack;
  colors: ThemeColors;
  fontFamily: string;
  getDomainColor: (domain: string) => string;
  resolveEntityIcon: (
    domain: string,
    state: string,
    deviceClass?: string,
  ) => ResolvedIcon;
  resolveFurnitureIcon: (furnitureType: string) => ResolvedIcon;
  computeLightStyle: typeof computeLightStyle;
}

const ThemeCtx = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  themeConfigId: string;
  iconPackId: string;
  domainColors?: Record<string, string>;
  domainIcons?: Record<string, SerializedIconRef>;
  furnitureIcons?: Record<string, SerializedIconRef>;
  children: React.ReactNode;
}

function makeDomainColorFn(colors: ThemeColors): (domain: string) => string {
  const map: Record<string, string> = {
    light: colors.light,
    switch: colors.switch,
    sensor: colors.sensor,
    binary_sensor: colors.binary_sensor,
    climate: colors.climate_heating,
    cover: colors.cover,
    lock: colors.lock,
    media_player: colors.media_player,
    fan: colors.fan,
    vacuum: colors.vacuum,
    automation: colors.automation,
    script: colors.automation,
    scene: colors.automation,
    button: colors.automation,
    camera: colors.camera,
  };
  return (domain: string) => map[domain] ?? colors.fallback;
}

function resolveOverriddenIcon(
  ref: SerializedIconRef,
  state: string,
): ResolvedIcon | null {
  const pack = iconPacks[ref.pack_id];
  if (!pack) return null;
  return resolveIcon(pack, ref.domain, state, ref.device_class);
}

export function ThemeProvider({
  themeConfigId,
  iconPackId,
  domainColors,
  domainIcons,
  furnitureIcons,
  children,
}: ThemeProviderProps) {
  const value = useMemo(() => {
    const themeConfig = themePresets[themeConfigId] ?? themePresets.default;
    const iconPack = iconPacks[iconPackId] ?? iconPacks.emoji;

    // Merge preset colors with per-domain overrides
    const effectiveColors: ThemeColors = domainColors
      ? { ...themeConfig.colors, ...domainColors } as ThemeColors
      : themeConfig.colors;

    const resolveEntityIcon = (
      domain: string,
      state: string,
      deviceClass?: string,
    ): ResolvedIcon => {
      // Check domain icon override first
      if (domainIcons?.[domain]) {
        const override = resolveOverriddenIcon(domainIcons[domain], state);
        if (override) return override;
      }
      return resolveIcon(iconPack, domain, state, deviceClass);
    };

    const resolveFurnitureIcon = (furnitureType: string): ResolvedIcon => {
      if (furnitureIcons?.[furnitureType]) {
        const override = resolveOverriddenIcon(furnitureIcons[furnitureType], "on");
        if (override) return override;
      }
      return resolveIcon(iconPack, "furniture", "on", furnitureType);
    };

    const getDomainColor = makeDomainColorFn(effectiveColors);

    return {
      themeConfig,
      iconPack,
      colors: effectiveColors,
      fontFamily: FONT_FAMILY,
      getDomainColor,
      resolveEntityIcon,
      resolveFurnitureIcon,
      computeLightStyle,
    };
  }, [themeConfigId, iconPackId, domainColors, domainIcons, furnitureIcons]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useThemeConfig(): ThemeContextValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) {
    throw new Error("useThemeConfig must be used within a ThemeProvider");
  }
  return ctx;
}
