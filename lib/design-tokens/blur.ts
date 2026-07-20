/**
 * Blur scale — glass and atmospheric depth.
 */

export const blur = {
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "20px",
  xl: "32px",
  "2xl": "40px",
  "3xl": "64px",
} as const;

export type BlurTokens = typeof blur;
