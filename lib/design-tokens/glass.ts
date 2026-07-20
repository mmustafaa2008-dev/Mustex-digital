/**
 * Glassmorphism tokens — translucent layers with AA-safe borders.
 */

import { blur } from "./blur";
import { colors } from "./colors";
import { shadows } from "./shadows";

export const glass = {
  panel: {
    background: "rgba(15, 23, 42, 0.72)",
    backgroundStrong: "rgba(15, 23, 42, 0.88)",
    backgroundSoft: "rgba(15, 23, 42, 0.56)",
    border: colors.border.DEFAULT,
    borderSubtle: colors.border.subtle,
    blur: blur.lg,
    blurStrong: blur["2xl"],
    shadow: shadows.md,
  },
  nav: {
    background: "rgba(5, 8, 22, 0.8)",
    border: colors.border.DEFAULT,
    blur: blur.md,
  },
  overlay: {
    background: "rgba(5, 8, 22, 0.64)",
    blur: blur.xl,
  },
  chip: {
    background: colors.primary.muted,
    border: colors.border.DEFAULT,
    blur: blur.xs,
  },
} as const;

export type GlassTokens = typeof glass;
