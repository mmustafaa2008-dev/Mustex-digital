/**
 * Semantic color tokens — Mustex Digital
 *
 * Naming: {role}.{variant}
 * - DEFAULT  = fill / brand action surface
 * - foreground = text/icon on that fill
 * - text = AA body/link text on dark canvases
 * - soft / muted / glow = non-text accents
 *
 * Contrast targets (WCAG 2.1 AA):
 * - Text vs canvas ≥ 4.5:1 (normal) / 3:1 (large)
 * - UI borders & focus vs adjacent surface ≥ 3:1
 */

export const colors = {
  primary: {
    /** Solid action fill — not for body text on dark canvases */
    DEFAULT: "#2563EB",
    /** Text/icon on primary fill (white improves AA headroom) */
    foreground: "#FFFFFF",
    /** AA link/text on dark backgrounds (≥ 4.5:1) */
    text: "#60A5FA",
    soft: "#B4C5FF",
    muted: "rgba(37, 99, 235, 0.14)",
    glow: "rgba(37, 99, 235, 0.35)",
  },
  secondary: {
    DEFAULT: "#60A5FA",
    foreground: "#001C39",
    text: "#93C5FD",
    soft: "#A4C9FF",
    muted: "rgba(96, 165, 250, 0.14)",
  },
  accent: {
    DEFAULT: "#ADC6FF",
    foreground: "#002A78",
    text: "#C7D7FF",
    muted: "rgba(173, 198, 255, 0.16)",
  },
  surface: {
    DEFAULT: "#0F172A",
    elevated: "#1B1F2E",
    sunken: "#0A0D1C",
    overlay: "rgba(15, 23, 42, 0.8)",
    bright: "#303444",
  },
  background: {
    DEFAULT: "#050816",
    subtle: "#0F1321",
    inverse: "#E8EAED",
  },
  foreground: {
    /** Primary body text on dark canvases */
    DEFAULT: "#E8EAED",
    /** Secondary supporting text */
    subtle: "#C3C6D7",
    /** Tertiary/meta — AA on background & surface */
    muted: "#A1A1AA",
    inverse: "#0B0F10",
  },
  border: {
    /**
     * Decorative hairlines only — do not rely on these alone
     * to identify interactive controls (WCAG 1.4.11).
     */
    subtle: "rgba(255, 255, 255, 0.1)",
    /** Structural / interactive UI edges (≥ 3:1 on dark surfaces) */
    DEFAULT: "rgba(255, 255, 255, 0.36)",
    /** Strong dividers and emphasized outlines */
    strong: "#8D90A0",
    /** Focus indicator stroke (pair with focus ring) */
    focus: "#60A5FA",
  },
  muted: {
    /** Aligned to surface elevation step */
    DEFAULT: "#1B1F2E",
    foreground: "#A1A1AA",
  },
  success: {
    DEFAULT: "#34D399",
    foreground: "#022C22",
    text: "#6EE7B7",
    muted: "rgba(52, 211, 153, 0.16)",
    border: "#34D399",
  },
  warning: {
    DEFAULT: "#FBBF24",
    foreground: "#422006",
    text: "#FCD34D",
    muted: "rgba(251, 191, 36, 0.16)",
    border: "#FBBF24",
  },
  error: {
    DEFAULT: "#FFB4AB",
    foreground: "#690005",
    /** Stronger error for icons/text that need emphasis */
    strong: "#F87171",
    text: "#FCA5A5",
    muted: "rgba(255, 180, 171, 0.16)",
    border: "#F87171",
  },
  focus: {
    /** Visible focus ring — 3:1+ against dark canvases */
    ring: "rgba(96, 165, 250, 0.55)",
    ringOffset: "#050816",
    width: "2px",
    offset: "2px",
  },
} as const;

export type ColorTokens = typeof colors;
