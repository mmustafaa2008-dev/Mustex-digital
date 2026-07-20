/**
 * Spacing scale — strict 4px baseline.
 *
 * Numeric keys follow the Tailwind-like multiplier of 4px.
 * Semantic aliases map onto that same scale (no off-grid values).
 */

export const spacingUnit = 4;

export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",

  /** Semantic aliases (4px-aligned) */
  "3xs": "2px",
  "2xs": "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "80px",
  "5xl": "96px",

  section: "96px",
  gutter: "24px",
  gutterMobile: "16px",
  marginDesktop: "48px",
  marginMobile: "16px",
} as const;

export type SpacingTokens = typeof spacing;
