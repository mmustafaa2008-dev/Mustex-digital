/**
 * Shadow system — aligned to elevation levels.
 * Naming: none | xs | sm | md | lg | xl + glow.{sm|md|lg} + focus | inset
 */

export const shadows = {
  none: "none",
  /** Elevation 0–1 micro depth */
  xs: "0 1px 2px rgba(5, 8, 22, 0.5)",
  /** Elevation 1 */
  sm: "0 4px 12px rgba(5, 8, 22, 0.45)",
  /** Elevation 2 */
  md: "0 12px 32px rgba(5, 8, 22, 0.5)",
  /** Elevation 3 */
  lg: "0 24px 48px rgba(5, 8, 22, 0.55)",
  /** Elevation 4 */
  xl: "0 40px 80px rgba(5, 8, 22, 0.6)",
  glow: {
    sm: "0 0 24px rgba(37, 99, 235, 0.18)",
    md: "0 0 40px rgba(37, 99, 235, 0.22)",
    lg: "0 0 64px rgba(37, 99, 235, 0.28)",
  },
  /** Keyboard focus halo — pairs with colors.focus */
  focus: "0 0 0 2px #050816, 0 0 0 4px rgba(96, 165, 250, 0.85)",
  inset: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  /** Composite card treatment (elevation 2 + soft glow) */
  card: "0 12px 32px rgba(5, 8, 22, 0.5), 0 0 40px rgba(37, 99, 235, 0.06)",
} as const;

export type ShadowTokens = typeof shadows;
