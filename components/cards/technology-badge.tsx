"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { createIconProps } from "@/lib/icons";
import { transitionPresets } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type TechnologyBadgeProps = {
  label: string;
  icon?: LucideIcon;
  /** Visual emphasis */
  tone?: "default" | "primary" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Enable interactive hover motion */
  interactive?: boolean;
  /** Soft idle float (avoid on marquees) */
  float?: boolean;
};

const toneClass = {
  default:
    "border-[var(--ds-border)] bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground)]",
  primary:
    "border-[var(--ds-primary-text)]/30 bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]",
  muted:
    "border-[var(--ds-border-subtle)] bg-[var(--ds-muted)] text-[var(--ds-foreground-muted)]",
} as const;

const sizeClass = {
  sm: "h-7 gap-1.5 px-2.5 text-xs",
  md: "h-8 gap-2 px-3 text-sm",
  lg: "h-9 gap-2 px-3.5 text-sm",
} as const;

/**
 * Compact technology / stack identifier with optional interactive hover.
 */
function TechnologyBadge({
  label,
  icon: Icon,
  tone = "default",
  size = "md",
  className,
  interactive = true,
  float = false,
}: TechnologyBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  const classes = cn(
    "inline-flex items-center rounded-[var(--ds-radius-sm)] border font-medium whitespace-nowrap",
    toneClass[tone],
    sizeClass[size],
    float && !prefersReducedMotion && "polish-float-soft",
    interactive &&
      cn(
        "cursor-default",
        "hover:border-[var(--ds-primary-text)]/45 hover:bg-[var(--ds-primary-muted)]",
        "hover:text-[var(--ds-primary-text)] hover:shadow-[var(--ds-shadow-glow-sm)]",
        uiTransition,
        uiFocusRing,
      ),
    className,
  );

  const content = (
    <>
      {Icon ? (
        <Icon
          {...createIconProps({
            size: size === "lg" ? "md" : "sm",
            decorative: true,
            color: "current",
          })}
        />
      ) : null}
      {label}
    </>
  );

  if (!interactive || prefersReducedMotion) {
    return (
      <span data-slot="technology-badge" className={classes}>
        {content}
      </span>
    );
  }

  return (
    <motion.span
      data-slot="technology-badge"
      className={classes}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={transitionPresets.springSnappy}
    >
      {content}
    </motion.span>
  );
}

export { TechnologyBadge };
