/**
 * Max-width & content-width scales — mirrors design-token containers.
 */

import { containers } from "@/lib/design-tokens";

/** Full max-width scale (CSS length values) */
export const maxWidths = {
  xs: containers.xs,
  sm: containers.sm,
  md: containers.md,
  lg: containers.lg,
  xl: containers.xl,
  "2xl": containers["2xl"],
  "3xl": containers["3xl"],
  "4xl": containers["4xl"],
  "5xl": containers["5xl"],
  "6xl": containers["6xl"],
  "7xl": containers["7xl"],
  prose: containers.prose,
  full: containers.full,
  none: "none",
  screen: "100vw",
} as const;

export type MaxWidth = keyof typeof maxWidths;

/**
 * Semantic content widths for marketing / product layouts.
 * Prefer these over raw scale keys in UI composition.
 */
export const contentWidths = {
  /** Long-form reading */
  prose: "prose",
  /** Narrow forms / dialogs */
  narrow: "lg",
  /** Default article / feature column */
  default: "4xl",
  /** Primary site content rail */
  wide: "7xl",
  /** Bleed to viewport */
  full: "full",
} as const satisfies Record<string, MaxWidth>;

export type ContentWidth = keyof typeof contentWidths;

/** Tailwind-ready max-width class map (CSS variable driven) */
export const maxWidthClassName: Record<MaxWidth, string> = {
  xs: "max-w-[var(--ds-container-xs)]",
  sm: "max-w-[var(--ds-container-sm)]",
  md: "max-w-[var(--ds-container-md)]",
  lg: "max-w-[var(--ds-container-lg)]",
  xl: "max-w-[var(--ds-container-xl)]",
  "2xl": "max-w-[var(--ds-container-2xl)]",
  "3xl": "max-w-[var(--ds-container-3xl)]",
  "4xl": "max-w-[var(--ds-container-4xl)]",
  "5xl": "max-w-[var(--ds-container-5xl)]",
  "6xl": "max-w-[var(--ds-container-6xl)]",
  "7xl": "max-w-[var(--ds-container-7xl)]",
  prose: "max-w-[var(--ds-container-prose)]",
  full: "max-w-full",
  none: "max-w-none",
  screen: "max-w-screen",
};

export function resolveMaxWidthClass(
  width: MaxWidth | ContentWidth = "7xl",
): string {
  if (width in contentWidths) {
    return maxWidthClassName[contentWidths[width as ContentWidth]];
  }

  return maxWidthClassName[width as MaxWidth];
}
