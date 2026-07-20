import type { ElementType, HTMLAttributes } from "react";

import {
  gridPresets,
  resolveGridColumns,
  resolveGridGap,
  type GridColumnCount,
  type LayoutSpace,
  type ResponsiveColumns,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

export type GridProps = HTMLAttributes<HTMLElement> & {
  /** Column count or responsive map */
  cols?: GridColumnCount | ResponsiveColumns;
  /** Named preset — overridden by `cols` when both provided */
  preset?: keyof typeof gridPresets;
  gap?: LayoutSpace;
  as?: ElementType;
};

/**
 * Responsive CSS Grid primitive.
 *
 * @example
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" />
 * <Grid preset="cards" />
 */
export function Grid({
  className,
  cols,
  preset,
  gap = "lg",
  as: Comp = "div",
  ...props
}: GridProps) {
  const resolvedCols = cols ?? (preset ? gridPresets[preset] : 1);

  return (
    <Comp
      data-slot="grid"
      className={cn(
        "grid w-full",
        resolveGridColumns(resolvedCols),
        resolveGridGap(gap),
        className,
      )}
      {...props}
    />
  );
}
