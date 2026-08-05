"use client";

import { cn } from "@/lib/utils";

export type ProjectPreviewPlaceholderProps = {
  title: string;
  category?: string;
  className?: string;
};

/**
 * Branded fallback preview when live OG / screenshot is unavailable.
 */
function ProjectPreviewPlaceholder({
  title,
  category,
  className,
}: ProjectPreviewPlaceholderProps) {
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden",
        "bg-[image:var(--gradient-hero-atmosphere)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(96 165 250 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(96 165 250 / 0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary)]/20 blur-[60px]" />

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={cn(
            "inline-flex size-16 items-center justify-center rounded-[var(--ds-radius-lg)]",
            "border border-white/12 bg-[var(--glass-panel-bg-strong)]",
            "text-xl font-bold tracking-[0.12em] text-[var(--ds-primary-text)]",
            "shadow-[var(--ds-shadow-glow-sm)] backdrop-blur-[var(--glass-panel-blur)]",
          )}
        >
          {initials}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-[0.08em] text-[var(--ds-foreground)] uppercase">
            {title}
          </span>
          {category ? (
            <span className="text-[0.6875rem] tracking-[0.14em] text-[var(--ds-foreground-muted)] uppercase">
              {category}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export { ProjectPreviewPlaceholder };
