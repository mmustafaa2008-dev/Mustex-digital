"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TimelineItemProps = {
  title: string;
  description: string;
  meta?: string;
  index?: number | string;
  /** Hide the connecting line (e.g. last item) */
  isLast?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Vertical timeline step — compose in a list for process / history.
 */
function TimelineItem({
  title,
  description,
  meta,
  index,
  isLast = false,
  children,
  className,
}: TimelineItemProps) {
  const marker =
    typeof index === "number" ? String(index).padStart(2, "0") : index;

  return (
    <li
      data-slot="timeline-item"
      className={cn("relative flex gap-4 pb-10 last:pb-0", className)}
    >
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
            "border border-[var(--ds-border)] bg-[var(--ds-surface-elevated)]",
            "text-xs font-semibold text-[var(--ds-primary-text)]",
          )}
          aria-hidden={marker ? undefined : true}
        >
          {marker ?? (
            <span className="size-2.5 rounded-full bg-[var(--ds-primary)]" />
          )}
        </span>
        {!isLast ? (
          <span
            className="absolute top-10 bottom-0 w-px bg-[var(--ds-border-subtle)]"
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1.5">
        {meta ? (
          <p className="text-xs font-medium tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
            {meta}
          </p>
        ) : null}
        <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
          {title}
        </h3>
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
        {children}
      </div>
    </li>
  );
}

export type TimelineProps = {
  items: Array<Omit<TimelineItemProps, "isLast" | "index"> & { index?: number | string }>;
  className?: string;
  numbered?: boolean;
};

/**
 * Timeline list composer.
 */
function Timeline({ items, className, numbered = true }: TimelineProps) {
  return (
    <ol data-slot="timeline" className={cn("flex flex-col", className)}>
      {items.map((item, i) => (
        <TimelineItem
          key={`${item.title}-${i}`}
          {...item}
          index={numbered ? (item.index ?? i + 1) : item.index}
          isLast={i === items.length - 1}
        />
      ))}
    </ol>
  );
}

export { Timeline, TimelineItem };
