import type { ElementType, HTMLAttributes } from "react";

import {
  flexPresets,
  resolveFlexClassName,
  type FlexAlign,
  type FlexDirection,
  type FlexJustify,
  type FlexWrap,
  type LayoutSpace,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

export type FlexProps = HTMLAttributes<HTMLElement> & {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: LayoutSpace;
  /** Named flex preset — use instead of individual props */
  preset?: keyof typeof flexPresets;
  as?: ElementType;
};

/**
 * Flexbox primitive with standardized alignment & gap tokens.
 *
 * @example
 * <Flex direction="row" align="center" justify="between" gap="md" />
 * <Flex preset="cluster" />
 */
export function Flex({
  className,
  direction = "row",
  align = "stretch",
  justify = "start",
  wrap = "nowrap",
  gap = "none",
  preset,
  as: Comp = "div",
  ...props
}: FlexProps) {
  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "div";
  return (
    <Component
      data-slot="flex"
      className={cn(
        preset
          ? flexPresets[preset]
          : resolveFlexClassName({
              direction,
              align,
              justify,
              wrap,
              gap,
            }),
        className,
      )}
      {...props}
    />
  );
}
