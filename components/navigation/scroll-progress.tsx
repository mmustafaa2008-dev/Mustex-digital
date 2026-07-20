"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

export type ScrollProgressProps = {
  className?: string;
  /** Position relative to viewport */
  position?: "top" | "bottom";
};

/**
 * Thin scroll progress indicator for the document.
 */
function ScrollProgress({
  className,
  position = "top",
}: ScrollProgressProps) {
  const progress = useScrollProgress();

  return (
    <div
      data-slot="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[60] h-0.5 bg-transparent",
        position === "top" ? "top-0" : "bottom-0",
        className,
      )}
    >
      <div
        className="h-full origin-left bg-[var(--ds-primary)] shadow-[var(--ds-shadow-glow-sm)] transition-transform duration-[var(--duration-fastest)] ease-linear"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export { ScrollProgress };
