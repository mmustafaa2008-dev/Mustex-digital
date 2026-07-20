"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { uiControlBase } from "@/lib/ui";
import { cn } from "@/lib/utils";

const inputVariants = cva(uiControlBase, {
  variants: {
    size: {
      sm: "h-8 px-2.5 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-11 px-3.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputProps = Omit<InputPrimitive.Props, "size"> &
  VariantProps<typeof inputVariants> & {
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

function Input({
  className,
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const isDisabled = Boolean(disabled || loading);
  const hasAdornment = Boolean(leftIcon || rightIcon || loading);

  if (!hasAdornment) {
    return (
      <InputPrimitive
        data-slot="input"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    );
  }

  return (
    <div
      data-slot="input-group"
      className={cn(
        "relative flex w-full items-center",
        isDisabled && "opacity-50",
      )}
    >
      {leftIcon ? (
        <span className="pointer-events-none absolute left-3 text-[var(--ds-foreground-muted)] [&_svg]:size-4">
          {leftIcon}
        </span>
      ) : null}
      <InputPrimitive
        data-slot="input"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          inputVariants({ size }),
          leftIcon && "pl-9",
          (rightIcon || loading) && "pr-9",
          className,
        )}
        {...props}
      />
      {loading ? (
        <span className="pointer-events-none absolute right-3 text-[var(--ds-foreground-muted)]">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        </span>
      ) : rightIcon ? (
        <span className="pointer-events-none absolute right-3 text-[var(--ds-foreground-muted)] [&_svg]:size-4">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
}

export { Input, inputVariants };
