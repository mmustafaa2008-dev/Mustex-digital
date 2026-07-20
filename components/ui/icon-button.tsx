"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { uiDisabled, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center border border-transparent",
    "rounded-[var(--ds-radius-sm)]",
    "active:translate-y-px",
    uiTransition,
    uiFocusRing,
    uiDisabled,
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--ds-primary)] text-[var(--ds-primary-foreground)] hover:bg-[color-mix(in_srgb,var(--ds-primary)_88%,white)]",
        secondary:
          "bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground)] border-[var(--ds-border)] hover:bg-[var(--ds-surface-bright)]",
        outline:
          "border-[var(--ds-border)] bg-transparent text-[var(--ds-foreground)] hover:bg-[var(--ds-muted)]",
        ghost:
          "bg-transparent text-[var(--ds-foreground)] hover:bg-[var(--ds-muted)]",
        destructive:
          "bg-[var(--ds-error-muted)] text-[var(--ds-error-text)] border-[var(--ds-error-border)] hover:bg-[color-mix(in_srgb,var(--ds-error-muted)_140%,transparent)]",
      },
      size: {
        xs: "size-7 [&_svg:not([class*='size-'])]:size-3",
        sm: "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        md: "size-10 [&_svg:not([class*='size-'])]:size-4",
        lg: "size-11 [&_svg:not([class*='size-'])]:size-5",
        xl: "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export type IconButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof iconButtonVariants> & {
    /** Accessible name — required for icon-only controls */
    label: string;
    loading?: boolean;
    icon?: ReactNode;
  };

function IconButton({
  className,
  variant = "ghost",
  size = "md",
  loading = false,
  disabled,
  label,
  icon,
  children,
  ...props
}: IconButtonProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <ButtonPrimitive
      data-slot="icon-button"
      data-state={loading ? "loading" : isDisabled ? "disabled" : "idle"}
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        (icon ?? children)
      )}
    </ButtonPrimitive>
  );
}

export { IconButton, iconButtonVariants };
