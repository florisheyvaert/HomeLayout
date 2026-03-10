import { useState, useEffect, useCallback } from "react";
import type { GlobalSettings } from "../types";

type ThemePreference = GlobalSettings["theme"];
type ResolvedTheme = "light" | "dark";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

export function useTheme(savedPreference: ThemePreference) {
  const [preference, setPreference] = useState<ThemePreference>(savedPreference);
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    resolveTheme(savedPreference)
  );

  // Listen for system theme changes
  useEffect(() => {
    if (preference !== "system") {
      setResolved(preference);
      return;
    }

    setResolved(getSystemTheme());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setResolved(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const setTheme = useCallback((pref: ThemePreference) => {
    setPreference(pref);
  }, []);

  const isDark = resolved === "dark";

  return { preference, resolved, isDark, setTheme };
}
