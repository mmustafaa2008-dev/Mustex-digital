/**
 * Layout spacing utilities — 4px grid, semantic section/gutter roles.
 */

export const layoutSpace = {
  none: "0",
  "3xs": "0.5",
  "2xs": "1",
  xs: "2",
  sm: "3",
  md: "4",
  lg: "6",
  xl: "8",
  "2xl": "12",
  "3xl": "16",
  "4xl": "20",
  "5xl": "24",
} as const;

export type LayoutSpace = keyof typeof layoutSpace;

/** Gap utility class map */
export const gapClassName: Record<LayoutSpace, string> = {
  none: "gap-0",
  "3xs": "gap-0.5",
  "2xs": "gap-1",
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
  "3xl": "gap-16",
  "4xl": "gap-20",
  "5xl": "gap-24",
};

export const gapXClassName: Record<LayoutSpace, string> = {
  none: "gap-x-0",
  "3xs": "gap-x-0.5",
  "2xs": "gap-x-1",
  xs: "gap-x-2",
  sm: "gap-x-3",
  md: "gap-x-4",
  lg: "gap-x-6",
  xl: "gap-x-8",
  "2xl": "gap-x-12",
  "3xl": "gap-x-16",
  "4xl": "gap-x-20",
  "5xl": "gap-x-24",
};

export const gapYClassName: Record<LayoutSpace, string> = {
  none: "gap-y-0",
  "3xs": "gap-y-0.5",
  "2xs": "gap-y-1",
  xs: "gap-y-2",
  sm: "gap-y-3",
  md: "gap-y-4",
  lg: "gap-y-6",
  xl: "gap-y-8",
  "2xl": "gap-y-12",
  "3xl": "gap-y-16",
  "4xl": "gap-y-20",
  "5xl": "gap-y-24",
};

/** Vertical stack spacing (space-y) */
export const stackClassName: Record<LayoutSpace, string> = {
  none: "space-y-0",
  "3xs": "space-y-0.5",
  "2xs": "space-y-1",
  xs: "space-y-2",
  sm: "space-y-3",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
  "2xl": "space-y-12",
  "3xl": "space-y-16",
  "4xl": "space-y-20",
  "5xl": "space-y-24",
};

/** Section vertical padding — responsive */
export const sectionSpaceClassName = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-28",
  "2xl": "py-24 md:py-32",
} as const;

export type SectionSpace = keyof typeof sectionSpaceClassName;

/** Container horizontal gutters from design tokens */
export const gutterClassName = {
  none: "px-0",
  default:
    "px-[var(--ds-space-margin-mobile)] md:px-[var(--ds-space-margin-desktop)]",
  tight: "px-4 md:px-6",
  loose: "px-6 md:px-16",
} as const;

export type Gutter = keyof typeof gutterClassName;

export function resolveStackClass(space: LayoutSpace = "md"): string {
  return stackClassName[space];
}
