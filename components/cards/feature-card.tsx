"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FeatureCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
  /** Enable interactive hover lift + glow */
  interactive?: boolean;
};

/**
 * Premium feature / benefit card with interactive hover.
 */
function FeatureCard({
  title,
  description,
  icon: Icon,
  eyebrow,
  children,
  className,
  interactive = true,
}: FeatureCardProps) {
  return (
    <Card
      data-slot="feature-card"
      variant="elevated"
      padding="lg"
      motionPreset
      interactive={interactive}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden",
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
      {Icon ? (
        <span
          className={cn(
            "polish-icon-glow relative z-10 inline-flex size-12 items-center justify-center rounded-[var(--ds-radius-md)]",
            "border border-[var(--ds-border-subtle)] bg-[var(--ds-surface)]",
            "text-[var(--ds-primary-text)]",
          )}
        >
          <Icon {...createIconProps({ size: "feature", decorative: true })} />
        </span>
      ) : null}

      {eyebrow ? (
        <p className="relative z-10 text-xs font-medium tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
          {eyebrow}
        </p>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col gap-2">
        <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
          {title}
        </h3>
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      </div>

      {children ? <div className="relative z-10">{children}</div> : null}
    </Card>
  );
}

export { FeatureCard };
