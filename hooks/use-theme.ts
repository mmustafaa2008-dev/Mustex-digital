"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light";

const STORAGE_KEY = "mustex-theme";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
}

/**
 * Theme switch foundation — toggles `dark` / `light` on <html>.
 * Persists preference to localStorage.
 */
export function useTheme(defaultTheme: ThemeMode = "dark") {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const initial =
      stored === "light" || stored === "dark" ? stored : defaultTheme;
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, [defaultTheme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isDark: theme === "dark",
  };
}
