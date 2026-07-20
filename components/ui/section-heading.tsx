import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

const sectionHeadingVariants = cva(
  "font-semibold text-[var(--ds-foreground)] tracking-[var(--tracking-heading)] text-balance",
  {
    variants: {
      size: {
        sm: "text-[length:var(--text-heading-sm)] leading-[var(--leading-heading)]",
        md: "text-[length:var(--text-heading-md)] leading-[var(--leading-heading)]",
        lg: "text-[length:var(--text-heading-lg)] leading-[var(--leading-heading)]",
        xl: "text-[length:var(--text-heading-xl)] leading-[var(--leading-heading)]",
        display:
          "text-[length:var(--text-display-md)] leading-[var(--leading-display)] tracking-[var(--tracking-display)] font-bold md:text-[length:var(--text-display-lg)]",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "lg",
      align: "left",
    },
  },
);

export type SectionHeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof sectionHeadingVariants> & {
    as?: ElementType;
  };

/**
 * Typography primitive for section titles — token-driven scale.
 */
function SectionHeading({
  className,
  size = "lg",
  align = "left",
  as: Comp = "h2",
  ...props
}: SectionHeadingProps) {
  return (
    <Comp
      data-slot="section-heading"
      className={cn(sectionHeadingVariants({ size, align }), className)}
      {...props}
    />
  );
}

export { SectionHeading, sectionHeadingVariants };
