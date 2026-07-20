/**
 * Elevation system — tonal layering first, shadow second.
 * Scale: 0 (canvas) → 4 (modal/popover)
 */

import { colors } from "./colors";
import { shadows } from "./shadows";

export const elevation = {
  0: {
    name: "canvas",
    background: colors.background.DEFAULT,
    border: "transparent",
    shadow: shadows.none,
    blur: "0px",
  },
  1: {
    name: "raised",
    background: colors.surface.DEFAULT,
    border: colors.border.subtle,
    shadow: shadows.sm,
    blur: "0px",
  },
  2: {
    name: "overlay",
    background: colors.surface.elevated,
    border: colors.border.DEFAULT,
    shadow: shadows.md,
    blur: "0px",
  },
  3: {
    name: "floating",
    background: colors.surface.elevated,
    border: colors.border.DEFAULT,
    shadow: shadows.lg,
    blur: "0px",
  },
  4: {
    name: "modal",
    background: colors.surface.bright,
    border: colors.border.strong,
    shadow: shadows.xl,
    blur: "0px",
  },
} as const;

export type ElevationTokens = typeof elevation;
export type ElevationLevel = keyof typeof elevation;
