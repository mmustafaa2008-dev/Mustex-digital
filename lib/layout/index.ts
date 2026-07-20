/**
 * Mustex Digital responsive layout system — utilities & class resolvers.
 */

export {
  contentWidths,
  maxWidthClassName,
  maxWidths,
  resolveMaxWidthClass,
} from "./widths";
export type { ContentWidth, MaxWidth } from "./widths";

export {
  gapClassName,
  gapXClassName,
  gapYClassName,
  gutterClassName,
  layoutSpace,
  resolveGapClass,
  resolveStackClass,
  sectionSpaceClassName,
  stackClassName,
} from "./spacing";
export type { Gutter, LayoutSpace, SectionSpace } from "./spacing";

export {
  gridColumns,
  gridPresets,
  resolveGridColumns,
  resolveGridGap,
} from "./grid";
export type { GridColumnCount, ResponsiveColumns } from "./grid";

export {
  flexAlign,
  flexDirections,
  flexJustify,
  flexPresets,
  flexWrap,
  resolveFlexClassName,
} from "./flex";
export type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexUtilityOptions,
  FlexWrap,
} from "./flex";
