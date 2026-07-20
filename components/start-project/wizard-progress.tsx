"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type WizardProgressProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

/**
 * Animated progress bar for the multi-step project wizard.
 */
function WizardProgress({
  currentStep,
  totalSteps,
  className,
}: WizardProgressProps) {
  const prefersReducedMotion = useReducedMotion();
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <div className="flex items-center justify-between text-xs font-medium tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--ds-surface-sunken)]">
        <motion.div
          className="h-full rounded-full bg-[var(--ds-primary)] shadow-[var(--ds-shadow-glow-sm)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 20 }
          }
        />
      </div>
    </div>
  );
}

export { WizardProgress };
