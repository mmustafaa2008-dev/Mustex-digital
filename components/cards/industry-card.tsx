"use client";

import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type IndustryCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  className?: string;
};

/**
 * Industry vertical card — premium hover with icon emphasis.
 */
function IndustryCard({
  title,
  description,
  icon: Icon,
  href,
  className,
}: IndustryCardProps) {
  return (
    <Card
      data-slot="industry-card"
      variant="elevated"
      padding="lg"
      interactive={Boolean(href)}
      motionPreset
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
      {Icon ? (
        <span
          className={cn(
            "relative z-10 inline-flex size-12 items-center justify-center rounded-[var(--ds-radius-md)]",
            "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
            "text-[var(--ds-primary-text)]",
            "transition-[border-color,box-shadow,transform] duration-[var(--duration-normal)]",
            "group-hover:border-[var(--ds-primary-text)]/40 group-hover:shadow-[var(--ds-shadow-glow-sm)]",
            "group-hover:scale-105",
          )}
        >
          <Icon {...createIconProps({ size: "feature", decorative: true })} />
        </span>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col gap-2">
        <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
          {href ? (
            <a
              href={href}
              className="outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-focus-ring-offset)]"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      </div>
    </Card>
  );
}

export { IndustryCard };
