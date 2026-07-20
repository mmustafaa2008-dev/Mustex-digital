"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type WizardStepIndicatorItem = {
  id: number;
  label: string;
};

export type WizardStepIndicatorProps = {
  steps: readonly WizardStepIndicatorItem[];
  currentStep: number;
  className?: string;
};

/**
 * Horizontal step indicator with completed / active / upcoming states.
 */
function WizardStepIndicator({
  steps,
  currentStep,
  className,
}: WizardStepIndicatorProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 sm:gap-3",
        className,
      )}
      aria-label="Project inquiry steps"
    >
      {steps.map((step, index) => {
        const complete = step.id < currentStep;
        const active = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.id}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-2",
              isLast && "flex-none sm:flex-1",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  "transition-[background-color,border-color,color,box-shadow] duration-200",
                  complete &&
                    "border-[var(--ds-primary)] bg-[var(--ds-primary)] text-[var(--ds-primary-foreground)] shadow-[var(--ds-shadow-glow-sm)]",
                  active &&
                    !complete &&
                    "border-[var(--ds-primary)] bg-[var(--ds-primary-soft)]/20 text-[var(--ds-primary-text)] shadow-[var(--ds-shadow-glow-sm)]",
                  !complete &&
                    !active &&
                    "border-[var(--ds-border)] bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground-muted)]",
                )}
                aria-current={active ? "step" : undefined}
              >
                {complete ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : (
                  step.id
                )}
              </span>
              <span
                className={cn(
                  "truncate text-xs font-medium sm:text-sm",
                  active || complete
                    ? "text-[var(--ds-foreground)]"
                    : "text-[var(--ds-foreground-muted)]",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-1 hidden h-px min-w-4 flex-1 sm:block",
                  complete
                    ? "bg-[var(--ds-primary)]"
                    : "bg-[var(--ds-border-subtle)]",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export { WizardStepIndicator };
