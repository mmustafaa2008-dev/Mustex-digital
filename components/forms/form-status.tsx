"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FormStatusState = "idle" | "loading" | "success" | "error";

export type FormStatusProps = {
  state?: FormStatusState;
  message?: string;
  className?: string;
};

const statusStyles: Record<
  Exclude<FormStatusState, "idle">,
  { className: string; icon: typeof Loader2 }
> = {
  loading: {
    className:
      "border-[var(--ds-border)] bg-[var(--ds-muted)] text-[var(--ds-foreground-subtle)]",
    icon: Loader2,
  },
  success: {
    className:
      "border-[var(--ds-success-border)] bg-[var(--ds-success-muted)] text-[var(--ds-success-text)]",
    icon: CheckCircle2,
  },
  error: {
    className:
      "border-[var(--ds-error-border)] bg-[var(--ds-error-muted)] text-[var(--ds-error-text)]",
    icon: AlertCircle,
  },
};

/**
 * Form-level status banner — loading / success / error.
 */
function FormStatus({
  state = "idle",
  message,
  className,
}: FormStatusProps) {
  if (state === "idle" || !message) return null;

  const config = statusStyles[state];
  const Icon = config.icon;

  return (
    <div
      data-slot="form-status"
      data-state={state}
      role={state === "error" ? "alert" : "status"}
      aria-live={state === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2.5 rounded-[var(--ds-radius-md)] border px-3 py-2.5 text-sm",
        config.className,
        className,
      )}
    >
      <Icon
        {...createIconProps({ size: "sm", decorative: true })}
        className={cn(
          "mt-0.5 shrink-0",
          state === "loading" && "animate-spin",
        )}
      />
      <p>{message}</p>
    </div>
  );
}

export { FormStatus };
