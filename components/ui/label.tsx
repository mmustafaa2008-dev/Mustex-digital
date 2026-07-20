"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "inline-flex items-center gap-1.5 font-medium text-[var(--ds-foreground)] select-none",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      tone: {
        default: "text-[var(--ds-foreground)]",
        muted: "text-[var(--ds-foreground-muted)]",
        subtle: "text-[var(--ds-foreground-subtle)]",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  },
);

export type LabelProps = ComponentProps<"label"> &
  VariantProps<typeof labelVariants> & {
    required?: boolean;
    optional?: boolean;
  };

function Label({
  className,
  size = "md",
  tone = "default",
  required = false,
  optional = false,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ size, tone }), className)}
      {...props}
    >
      {children}
      {required ? (
        <span className="text-[var(--ds-error-text)]" aria-hidden="true">
          *
        </span>
      ) : null}
      {optional ? (
        <span className="font-normal text-[var(--ds-foreground-muted)]">
          (optional)
        </span>
      ) : null}
    </label>
  );
}

export { Label, labelVariants };
