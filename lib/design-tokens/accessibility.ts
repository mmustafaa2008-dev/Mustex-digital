/**
 * Accessibility contract for the design system.
 * Usage rules — not components.
 */

import { colors } from "./colors";

/**
 * Approved text-on-surface pairings that meet WCAG 2.1 AA.
 * Prefer these roles over raw hex values.
 */
export const contrastPairs = {
  bodyOnCanvas: {
    foreground: colors.foreground.DEFAULT,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Primary body copy on page canvas",
  },
  bodyOnSurface: {
    foreground: colors.foreground.DEFAULT,
    background: colors.surface.DEFAULT,
    minRatio: 4.5,
    usage: "Body copy on cards and panels",
  },
  subtleOnCanvas: {
    foreground: colors.foreground.subtle,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Supporting copy; never for essential instructions alone",
  },
  mutedOnCanvas: {
    foreground: colors.foreground.muted,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Meta, timestamps, captions",
  },
  linkOnCanvas: {
    foreground: colors.primary.text,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Inline links and text buttons on dark canvases",
  },
  onPrimaryFill: {
    foreground: colors.primary.foreground,
    background: colors.primary.DEFAULT,
    minRatio: 4.5,
    usage: "Label/icon inside solid primary controls",
  },
  onSecondaryFill: {
    foreground: colors.secondary.foreground,
    background: colors.secondary.DEFAULT,
    minRatio: 4.5,
    usage: "Label/icon inside solid secondary controls",
  },
  successOnCanvas: {
    foreground: colors.success.text,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Success messaging as text",
  },
  warningOnCanvas: {
    foreground: colors.warning.text,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Warning messaging as text",
  },
  errorOnCanvas: {
    foreground: colors.error.text,
    background: colors.background.DEFAULT,
    minRatio: 4.5,
    usage: "Error messaging as text",
  },
  uiBorderOnSurface: {
    foreground: colors.border.DEFAULT,
    background: colors.surface.DEFAULT,
    minRatio: 3,
    usage: "Interactive control outlines and structural edges",
  },
} as const;

export const a11yRules = {
  /** Never use primary.DEFAULT as body/link text on dark canvases */
  preferPrimaryTextRole: true,
  /** Decorative borders must not be the only affordance for controls */
  interactiveControlsNeedAaBorderOrFill: true,
  /** Focus must remain visible; use colors.focus + shadows.focus */
  visibleFocusRequired: true,
  /** Honor reduced motion at the motion-token layer */
  respectPrefersReducedMotion: true,
  /** Minimum target size guidance (CSS px) */
  minTouchTargetPx: 44,
  /** Caption.sm (12px) requires AA contrast — use foreground.muted+ */
  smallTextMinContrast: 4.5,
} as const;

export type ContrastPairs = typeof contrastPairs;
