"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps } from "react";

import { cardHover } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type GlassCardProps = ComponentProps<"div"> & {
  interactive?: boolean;
  motionPreset?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingClass = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

/**
 * Glassmorphism card — lift, border glow, glass reflection, soft scale.
 */
function GlassCard({
  className,
  interactive = false,
  motionPreset = false,
  padding = "md",
  ...props
}: GlassCardProps) {
  const classes = cn(
    "relative rounded-[var(--ds-radius-xl)] border border-[var(--ds-border)]",
    "bg-[var(--glass-panel-bg)] shadow-[var(--ds-shadow-md)]",
    "backdrop-blur-[var(--glass-panel-blur)]",
    "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
    "before:bg-[image:var(--gradient-glass-highlight)] before:opacity-80",
    "polish-gradient-border polish-glass-reflection",
    uiTransition,
    paddingClass[padding],
    !motionPreset && "hover:-translate-y-1 hover:scale-[1.015]",
    "hover:border-[var(--ds-primary-text)]/40 hover:shadow-[var(--ds-shadow-glow-md)]",
    interactive && cn("cursor-pointer", uiFocusRing),
    className,
  );

  if (motionPreset) {
    return (
      <motion.div
        data-slot="glass-card"
        className={classes}
        tabIndex={interactive ? 0 : undefined}
        {...(cardHover as HTMLMotionProps<"div">)}
        {...(props as HTMLMotionProps<"div">)}
      />
    );
  }

  return (
    <div
      data-slot="glass-card"
      className={classes}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  );
}

export { GlassCard };
