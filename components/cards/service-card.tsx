"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  ctaLabel?: string;
  tags?: string[];
  featured?: boolean;
  footer?: ReactNode;
  className?: string;
};

/**
 * Reusable service offering card.
 */
function ServiceCard({
  className,
  title,
  description,
  icon: Icon,
  href,
  ctaLabel,
  tags,
  featured = false,
  footer,
}: ServiceCardProps) {
  return (
    <GlassCard
      data-slot="service-card"
      interactive={Boolean(href)}
      motionPreset
      padding="lg"
      className={cn(
        "group flex h-full flex-col gap-4 overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:var(--gradient-primary-glow)] before:opacity-0",
        "before:transition-opacity before:duration-[var(--duration-normal)]",
        "hover:before:opacity-100",
        "hover:border-[var(--ds-primary-text)]/50 hover:shadow-[var(--ds-shadow-glow-md)]",
        featured &&
          "border-[var(--ds-primary-text)] shadow-[var(--ds-shadow-glow-sm)]",
        className,
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "polish-icon-glow inline-flex size-11 items-center justify-center rounded-[var(--ds-radius-md)]",
            "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
            "text-[var(--ds-primary-text)]",
          )}
        >
          <Icon {...createIconProps({ size: "feature", decorative: true })} />
        </span>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col gap-2">
        <h3 className="text-[length:var(--text-heading-sm)] leading-[var(--leading-heading)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
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

      {tags?.length ? (
        <ul className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className={cn(
                "rounded-[var(--ds-radius-xs)] bg-[var(--ds-muted)] px-2 py-0.5 text-xs text-[var(--ds-foreground-subtle)]",
                "transition-[color,background-color,transform] duration-[var(--duration-fast)]",
                "group-hover:bg-[var(--ds-primary-muted)] group-hover:text-[var(--ds-primary-text)]",
              )}
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {footer ??
        (href && ctaLabel ? (
          <span className="relative z-10 text-sm font-medium text-[var(--ds-primary-text)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5">
            {ctaLabel}
          </span>
        ) : null)}
    </GlassCard>
  );
}

export { ServiceCard };
