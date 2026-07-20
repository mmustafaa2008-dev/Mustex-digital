/**
 * Flex layout utilities — direction, alignment, wrap, gap.
 */

import { gapClassName, type LayoutSpace } from "./spacing";

export const flexDirections = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
} as const;

export type FlexDirection = keyof typeof flexDirections;

export const flexAlign = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

export type FlexAlign = keyof typeof flexAlign;

export const flexJustify = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const;

export type FlexJustify = keyof typeof flexJustify;

export const flexWrap = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  reverse: "flex-wrap-reverse",
} as const;

export type FlexWrap = keyof typeof flexWrap;

export type FlexUtilityOptions = {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: LayoutSpace;
};

/**
 * Compose flex utility classes without a component.
 */
export function resolveFlexClassName(options: FlexUtilityOptions = {}): string {
  const {
    direction = "row",
    align = "stretch",
    justify = "start",
    wrap = "nowrap",
    gap = "none",
  } = options;

  return [
    "flex",
    flexDirections[direction],
    flexAlign[align],
    flexJustify[justify],
    flexWrap[wrap],
    gapClassName[gap],
  ]
    .filter(Boolean)
    .join(" ");
}

/** Common flex presets */
export const flexPresets = {
  row: resolveFlexClassName({
    direction: "row",
    align: "center",
    gap: "md",
  }),
  rowBetween: resolveFlexClassName({
    direction: "row",
    align: "center",
    justify: "between",
    gap: "md",
  }),
  col: resolveFlexClassName({
    direction: "col",
    align: "stretch",
    gap: "md",
  }),
  colCenter: resolveFlexClassName({
    direction: "col",
    align: "center",
    justify: "center",
    gap: "md",
  }),
  cluster: resolveFlexClassName({
    direction: "row",
    align: "center",
    wrap: "wrap",
    gap: "sm",
  }),
} as const;
