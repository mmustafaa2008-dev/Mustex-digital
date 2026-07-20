/**
 * Standardized Lucide icon sizes (px).
 * Naming: xs → 2xl (aligned with design-token scale language).
 */

export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
  /** Inline with body text */
  inline: 16,
  /** Default UI chrome */
  ui: 20,
  /** Feature / section markers */
  feature: 24,
  /** Hero / empty-state emphasis */
  display: 32,
} as const;

export type IconSize = keyof typeof iconSizes;

export function resolveIconSize(size: IconSize | number = "md"): number {
  return typeof size === "number" ? size : iconSizes[size];
}
