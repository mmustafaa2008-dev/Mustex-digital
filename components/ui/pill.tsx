import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border font-medium whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]",
        secondary:
          "border-[var(--ds-border)] bg-[var(--ds-muted)] text-[var(--ds-foreground-subtle)]",
        outline:
          "border-[var(--ds-border)] bg-transparent text-[var(--ds-foreground)]",
        success:
          "border-[var(--ds-success-border)] bg-[var(--ds-success-muted)] text-[var(--ds-success-text)]",
        warning:
          "border-[var(--ds-warning-border)] bg-[var(--ds-warning-muted)] text-[var(--ds-warning-text)]",
        error:
          "border-[var(--ds-error-border)] bg-[var(--ds-error-muted)] text-[var(--ds-error-text)]",
      },
      size: {
        sm: "h-6 px-2.5 text-xs",
        md: "h-7 px-3 text-sm",
        lg: "h-8 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type PillProps = ComponentProps<"span"> &
  VariantProps<typeof pillVariants>;

function Pill({
  className,
  variant = "default",
  size = "md",
  ...props
}: PillProps) {
  return (
    <span
      data-slot="pill"
      className={cn(pillVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Pill, pillVariants };
