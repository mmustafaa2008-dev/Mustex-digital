"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type PricingCardProps = {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  href?: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
};

/**
 * Pricing tier card with feature list and CTA.
 */
function PricingCard({
  name,
  description,
  price,
  period,
  features,
  ctaLabel,
  onCtaClick,
  href,
  highlighted = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <GradientCard
      data-slot="pricing-card"
      accent={highlighted ? "border" : "atmosphere"}
      padding="lg"
      motionPreset
      className={cn(
        "flex h-full flex-col gap-6",
        highlighted && "shadow-[var(--ds-shadow-glow-md)]",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[length:var(--text-heading-sm)] font-semibold text-[var(--ds-foreground)]">
            {name}
          </h3>
          {badge ? (
            <Pill size="sm" variant="default">
              {badge}
            </Pill>
          ) : null}
        </div>
        {description ? (
          <p className="text-sm text-[var(--ds-foreground-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-[length:var(--text-display-md)] font-bold tracking-[var(--tracking-display)] text-[var(--ds-foreground)]">
          {price}
        </span>
        {period ? (
          <span className="text-sm text-[var(--ds-foreground-muted)]">
            {period}
          </span>
        ) : null}
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-[var(--ds-foreground-subtle)]"
          >
            <Check
              {...createIconProps({
                size: "sm",
                color: "primary",
                decorative: true,
              })}
              className="mt-0.5 shrink-0 text-[var(--ds-success-text)]"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {href ? (
        <LinkButton
          href={href}
          variant={highlighted ? "default" : "outline"}
          className="w-full"
        >
          {ctaLabel}
        </LinkButton>
      ) : (
        <Button
          variant={highlighted ? "default" : "outline"}
          className="w-full"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      )}
    </GradientCard>
  );
}

export { PricingCard };
