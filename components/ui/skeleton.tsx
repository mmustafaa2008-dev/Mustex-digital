import { cn } from "@/lib/utils";

export type SkeletonProps = {
  className?: string;
};

/**
 * Lightweight shimmer skeleton — no Framer Motion (keeps loading UI cheap).
 */
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-[var(--ds-radius-md)]",
        "bg-[var(--ds-surface-elevated)]",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent",
        className,
      )}
    />
  );
}

function SectionSkeleton({ className }: SkeletonProps) {
  return (
    <div
      data-slot="section-skeleton"
      className={cn(
        "mx-auto w-full max-w-[var(--ds-container-7xl)] px-4 py-16 md:px-8 md:py-24",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="mb-4 h-4 w-28" />
      <Skeleton className="mb-3 h-10 w-2/3 max-w-xl" />
      <Skeleton className="mb-10 h-5 w-full max-w-2xl" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full max-lg:hidden" />
      </div>
    </div>
  );
}

export { SectionSkeleton, Skeleton };
