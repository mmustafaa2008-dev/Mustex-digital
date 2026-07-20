"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { uiDisabled, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-[var(--ds-radius-full)] border font-medium whitespace-nowrap select-none",
    uiTransition,
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-[var(--ds-border)] bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground)]",
        primary:
          "border-transparent bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]",
        outline:
          "border-[var(--ds-border)] bg-transparent text-[var(--ds-foreground)]",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-8 px-3 text-sm",
        lg: "h-9 px-3.5 text-sm",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      disabled: false,
    },
  },
);

export type ChipProps = VariantProps<typeof chipVariants> & {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
};

function Chip({
  className,
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  onRemove,
  removeLabel = "Remove",
  children,
  onClick,
}: ChipProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <span
      data-slot="chip"
      data-state={loading ? "loading" : isDisabled ? "disabled" : "idle"}
      className={cn(
        chipVariants({ variant, size, disabled: isDisabled }),
        className,
      )}
    >
      {onClick ? (
        <button
          type="button"
          disabled={isDisabled}
          aria-busy={loading || undefined}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[inherit] outline-none",
            "hover:opacity-90",
            uiFocusRing,
            uiDisabled,
          )}
          onClick={onClick}
        >
          {icon ? <span className="[&_svg]:size-3.5">{icon}</span> : null}
          <span>{children}</span>
        </button>
      ) : (
        <>
          {icon ? <span className="[&_svg]:size-3.5">{icon}</span> : null}
          <span>{children}</span>
        </>
      )}

      {onRemove ? (
        <button
          type="button"
          disabled={isDisabled}
          aria-label={removeLabel}
          className={cn(
            "inline-flex size-4 items-center justify-center rounded-full",
            "hover:bg-[var(--ds-muted)]",
            uiFocusRing,
            uiDisabled,
          )}
          onClick={onRemove}
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}

export { Chip, chipVariants };
