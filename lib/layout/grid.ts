/**
 * Responsive grid utilities — 12-column technical grid foundation.
 */

import type { Breakpoint } from "@/lib/design-tokens";

import { gapClassName, type LayoutSpace } from "./spacing";

export const gridColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type GridColumnCount = (typeof gridColumns)[number];

export type ResponsiveColumns = Partial<
  Record<"base" | Breakpoint, GridColumnCount>
>;

const colClass: Record<GridColumnCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const colClassAt: Record<Breakpoint, Record<GridColumnCount, string>> = {
  xs: {
    1: "xs:grid-cols-1",
    2: "xs:grid-cols-2",
    3: "xs:grid-cols-3",
    4: "xs:grid-cols-4",
    5: "xs:grid-cols-5",
    6: "xs:grid-cols-6",
    7: "xs:grid-cols-7",
    8: "xs:grid-cols-8",
    9: "xs:grid-cols-9",
    10: "xs:grid-cols-10",
    11: "xs:grid-cols-11",
    12: "xs:grid-cols-12",
  },
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  },
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12",
  },
  xl: {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  },
  "2xl": {
    1: "2xl:grid-cols-1",
    2: "2xl:grid-cols-2",
    3: "2xl:grid-cols-3",
    4: "2xl:grid-cols-4",
    5: "2xl:grid-cols-5",
    6: "2xl:grid-cols-6",
    7: "2xl:grid-cols-7",
    8: "2xl:grid-cols-8",
    9: "2xl:grid-cols-9",
    10: "2xl:grid-cols-10",
    11: "2xl:grid-cols-11",
    12: "2xl:grid-cols-12",
  },
};

/**
 * Resolve grid column classes from a number or responsive map.
 *
 * @example
 * resolveGridColumns(3) // grid-cols-3
 * resolveGridColumns({ base: 1, md: 2, lg: 3 })
 */
export function resolveGridColumns(
  cols: GridColumnCount | ResponsiveColumns = 1,
): string {
  if (typeof cols === "number") {
    return colClass[cols];
  }

  const classes: string[] = [];

  if (cols.base) {
    classes.push(colClass[cols.base]);
  } else {
    classes.push(colClass[1]);
  }

  (Object.keys(colClassAt) as Breakpoint[]).forEach((bp) => {
    const value = cols[bp];
    if (value) {
      classes.push(colClassAt[bp][value]);
    }
  });

  return classes.join(" ");
}

export function resolveGridGap(gap: LayoutSpace = "lg"): string {
  return gapClassName[gap];
}

/** Common marketing / product grid presets */
export const gridPresets = {
  /** Mobile 1 → tablet 2 → desktop 3 */
  cards: { base: 1, md: 2, lg: 3 } as ResponsiveColumns,
  /** Mobile 1 → desktop 2 */
  split: { base: 1, lg: 2 } as ResponsiveColumns,
  /** Mobile 2 → desktop 4 */
  quartet: { base: 2, lg: 4 } as ResponsiveColumns,
  /** Full 12-column technical grid */
  twelve: { base: 4, md: 8, lg: 12 } as ResponsiveColumns,
  /** Feature bento: 1 → 2 → 3 */
  features: { base: 1, sm: 2, xl: 3 } as ResponsiveColumns,
} as const;
