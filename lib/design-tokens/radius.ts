/**
 * Border radius — soft-industrial precision.
 * Naming: none | xs | sm | md | lg | xl | 2xl | full
 */

export const radius = {
  none: "0px",
  xs: "0.125rem", // 2px
  sm: "0.25rem", // 4px — controls
  md: "0.5rem", // 8px — standard
  lg: "0.75rem", // 12px — panels
  xl: "1rem", // 16px — feature blocks
  "2xl": "1.5rem", // 24px — large pods
  full: "9999px",
} as const;

export type RadiusTokens = typeof radius;
