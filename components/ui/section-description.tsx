import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

const sectionDescriptionVariants = cva(
  "text-[var(--ds-foreground-muted)] leading-[var(--leading-body)] text-pretty",
  {
    variants: {
      size: {
        sm: "text-[length:var(--text-body-sm)] max-w-[var(--ds-container-prose)]",
        md: "text-[length:var(--text-body-md)] max-w-[var(--ds-container-prose)]",
        lg: "text-[length:var(--text-body-lg)] max-w-[var(--ds-container-2xl)]",
      },
      align: {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto",
      },
      tone: {
        muted: "text-[var(--ds-foreground-muted)]",
        subtle: "text-[var(--ds-foreground-subtle)]",
        default: "text-[var(--ds-foreground)]",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
      tone: "muted",
    },
  },
);

export type SectionDescriptionProps = ComponentProps<"p"> &
  VariantProps<typeof sectionDescriptionVariants> & {
    as?: ElementType;
  };

/**
 * Supporting copy under a section heading — AA muted text on dark/light.
 */
function SectionDescription({
  className,
  size = "md",
  align = "left",
  tone = "muted",
  as: Comp = "p",
  ...props
}: SectionDescriptionProps) {
  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "p";
  return (
    <Component
      data-slot="section-description"
      className={cn(
        sectionDescriptionVariants({ size, align, tone }),
        className,
      )}
      {...props}
    />
  );
}

export { SectionDescription, sectionDescriptionVariants };
