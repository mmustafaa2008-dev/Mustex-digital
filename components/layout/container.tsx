import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import {
  contentWidths,
  gutterClassName,
  maxWidthClassName,
  type ContentWidth,
  type Gutter,
  type MaxWidth,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      xs: maxWidthClassName.xs,
      sm: maxWidthClassName.sm,
      md: maxWidthClassName.md,
      lg: maxWidthClassName.lg,
      xl: maxWidthClassName.xl,
      "2xl": maxWidthClassName["2xl"],
      "3xl": maxWidthClassName["3xl"],
      "4xl": maxWidthClassName["4xl"],
      "5xl": maxWidthClassName["5xl"],
      "6xl": maxWidthClassName["6xl"],
      "7xl": maxWidthClassName["7xl"],
      prose: maxWidthClassName.prose,
      full: maxWidthClassName.full,
      none: maxWidthClassName.none,
      screen: maxWidthClassName.screen,
    },
    gutter: {
      none: gutterClassName.none,
      default: gutterClassName.default,
      tight: gutterClassName.tight,
      loose: gutterClassName.loose,
    },
  },
  defaultVariants: {
    width: "7xl",
    gutter: "default",
  },
});

type ContainerVariantProps = VariantProps<typeof containerVariants>;

export type ContainerProps = HTMLAttributes<HTMLElement> &
  Omit<ContainerVariantProps, "width"> & {
    /** Scale key or semantic content width */
    width?: MaxWidth | ContentWidth;
    as?: ElementType;
  };

function resolveWidth(
  width: MaxWidth | ContentWidth | null | undefined,
): MaxWidth {
  if (!width) return "7xl";
  if (width in contentWidths) {
    return contentWidths[width as ContentWidth];
  }
  return width as MaxWidth;
}

/**
 * Centered page rail with responsive gutters and max-width.
 */
export function Container({
  className,
  width = "7xl",
  gutter = "default",
  as: Comp = "div",
  ...props
}: ContainerProps) {
  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "div";
  return (
    <Component
      data-slot="container"
      className={cn(
        containerVariants({
          width: resolveWidth(width),
          gutter: gutter as Gutter,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { containerVariants };
