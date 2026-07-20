"use client";

import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ProcessCardProps = {
  step: number | string;
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

/**
 * Numbered process / methodology step card — premium hover + glass surface.
 */
function ProcessCard({
  step,
  title,
  description,
  icon: Icon,
  className,
}: ProcessCardProps) {
  const label = typeof step === "number" ? String(step).padStart(2, "0") : step;

  return (
    <Card
      data-slot="process-card"
      variant="elevated"
      padding="lg"
      motionPreset
      interactive
      className={cn(
        "group flex h-full flex-col gap-4 overflow-hidden",
        "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:var(--gradient-primary-glow)] before:opacity-0",
        "before:transition-opacity before:duration-[var(--duration-normal)]",
        "hover:before:opacity-100",
        "hover:border-[var(--ds-primary-text)]/40 hover:shadow-[var(--ds-shadow-glow-md)]",
        className,
      )}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span
          className={cn(
            "font-mono text-sm font-medium tracking-[var(--tracking-caption)]",
            "text-[var(--ds-primary-text)]",
            "transition-transform duration-[var(--duration-normal)]",
            "group-hover:scale-110",
          )}
          aria-hidden="true"
        >
          {label}
        </span>
        {Icon ? (
          <span
            className={cn(
              "polish-icon-glow inline-flex size-10 items-center justify-center rounded-[var(--ds-radius-md)]",
              "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
              "text-[var(--ds-primary-text)]",
            )}
          >
            <Icon {...createIconProps({ size: "md", decorative: true })} />
          </span>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
          <span className="sr-only">Step {label}: </span>
          {title}
        </h3>
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      </div>
    </Card>
  );
}

export { ProcessCard };
