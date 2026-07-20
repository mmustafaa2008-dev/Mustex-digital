"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { uiControlBase } from "@/lib/ui";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [uiControlBase, "min-h-24 resize-y py-2.5 leading-[var(--leading-body)]"].join(
    " ",
  ),
  {
    variants: {
      size: {
        sm: "px-2.5 text-sm",
        md: "px-3 text-sm",
        lg: "px-3.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    loading?: boolean;
  };

function Textarea({
  className,
  size = "md",
  loading = false,
  disabled,
  ...props
}: TextareaProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <textarea
      data-slot="textarea"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
