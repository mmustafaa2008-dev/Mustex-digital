import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-[var(--ds-radius-xs)] border font-medium whitespace-nowrap select-none",
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
        sm: "h-5 px-1.5 text-[0.6875rem]",
        md: "h-6 px-2 text-xs",
        lg: "h-7 px-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
