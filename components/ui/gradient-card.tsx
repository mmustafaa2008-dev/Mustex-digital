"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps } from "react";

import { cardHover } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type GradientCardProps = ComponentProps<"div"> & {
  interactive?: boolean;
  motionPreset?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  /** Gradient accent treatment */
  accent?: "primary" | "atmosphere" | "border";
};

const paddingClass = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

const accentClass = {
  primary:
    "bg-[image:var(--gradient-primary-solid)] text-[var(--ds-primary-foreground)] border-transparent",
  atmosphere:
    "border-[var(--ds-border)] bg-[var(--ds-surface)] [background-image:var(--gradient-hero-atmosphere),linear-gradient(var(--ds-surface),var(--ds-surface))]",
  border:
    "border-transparent bg-[var(--ds-surface)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] [background-image:linear-gradient(var(--ds-surface),var(--ds-surface)),var(--gradient-border-glow)]",
} as const;

/**
 * Gradient-accented card — uses gradient library tokens.
 */
function GradientCard({
  className,
  interactive = false,
  motionPreset = false,
  padding = "md",
  accent = "atmosphere",
  ...props
}: GradientCardProps) {
  const classes = cn(
    "relative overflow-hidden rounded-[var(--ds-radius-xl)] border shadow-[var(--ds-shadow-md)]",
    accentClass[accent],
    uiTransition,
    paddingClass[padding],
    interactive &&
      cn(
        "cursor-pointer hover:shadow-[var(--ds-shadow-card)]",
        uiFocusRing,
      ),
    className,
  );

  if (motionPreset) {
    return (
      <motion.div
        data-slot="gradient-card"
        className={classes}
        tabIndex={interactive ? 0 : undefined}
        {...(cardHover as HTMLMotionProps<"div">)}
        {...(props as HTMLMotionProps<"div">)}
      />
    );
  }

  return (
    <div
      data-slot="gradient-card"
      className={classes}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  );
}

export { GradientCard };
