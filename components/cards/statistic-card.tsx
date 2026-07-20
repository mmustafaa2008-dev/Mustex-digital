"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatisticCardProps = {
  value: string;
  /** Override displayed value (e.g. animated counter) while `value` remains the source of truth for a11y */
  displayValue?: string;
  label: string;
  description?: string;
  trend?: {
    value: string;
    direction?: "up" | "down" | "neutral";
  };
  className?: string;
};

/**
 * Premium metric / KPI statistic card.
 */
function StatisticCard({
  value,
  displayValue,
  label,
  description,
  trend,
  className,
}: StatisticCardProps) {
  const shown = displayValue ?? value;
  const trendColor =
    trend?.direction === "up"
      ? "text-[var(--ds-success-text)]"
      : trend?.direction === "down"
        ? "text-[var(--ds-error-text)]"
        : "text-[var(--ds-foreground-muted)]";

  return (
    <Card
      data-slot="statistic-card"
      variant="elevated"
      padding="lg"
      motionPreset
      className={cn(
        "group relative flex h-full flex-col gap-2 overflow-hidden",
        "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-[image:var(--gradient-primary-glow)] before:opacity-0",
        "before:transition-opacity before:duration-[var(--duration-normal)]",
        "hover:before:opacity-100",
        "hover:border-[var(--ds-primary-text)]/35 hover:shadow-[var(--ds-shadow-glow-sm)]",
        className,
      )}
      aria-label={`${label}: ${value}`}
    >
      <p className="relative z-10 text-xs font-medium tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
        {label}
      </p>
      <p
        className="relative z-10 text-[length:var(--text-display-md)] font-bold tracking-[var(--tracking-display)] text-[var(--ds-foreground)] tabular-nums"
        aria-hidden={displayValue !== undefined ? true : undefined}
      >
        {shown}
      </p>
      {displayValue !== undefined ? (
        <span className="sr-only">
          {label}: {value}
        </span>
      ) : null}
      {trend ? (
        <p className={cn("relative z-10 text-sm font-medium", trendColor)}>
          <span className="sr-only">
            Trend {trend.direction ?? "neutral"}:{" "}
          </span>
          {trend.value}
        </p>
      ) : null}
      {description ? (
        <p className="relative z-10 text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      ) : null}
    </Card>
  );
}

export { StatisticCard };
