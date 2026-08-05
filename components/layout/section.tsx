import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { sectionSpaceClassName, type SectionSpace } from "@/lib/layout";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: sectionSpaceClassName.none,
      sm: sectionSpaceClassName.sm,
      md: sectionSpaceClassName.md,
      lg: sectionSpaceClassName.lg,
      xl: sectionSpaceClassName.xl,
      "2xl": sectionSpaceClassName["2xl"],
    },
    bleed: {
      false: "",
      true: "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
    },
  },
  defaultVariants: {
    spacing: "lg",
    bleed: false,
  },
});

export type SectionProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: ElementType;
  };

/**
 * Vertical section band with responsive spacing.
 */
export function Section({
  className,
  spacing = "lg",
  bleed = false,
  as: Comp = "section",
  ...props
}: SectionProps) {
  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "div";
  return (
    <Component
      data-slot="section"
      className={cn(
        sectionVariants({
          spacing: spacing as SectionSpace,
          bleed,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { sectionVariants };
