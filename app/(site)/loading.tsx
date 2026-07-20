import { BrandLockup } from "@/components/brand";
import { Skeleton } from "@/components/ui/skeleton";
import { brand } from "@/data/brand";

/**
 * Route-level loading UI — brand + lightweight skeletons (no Framer Motion).
 */
export default function Loading() {
  return (
    <div
      data-slot="loading-screen"
      className="relative flex min-h-[70svh] flex-col items-center justify-center gap-10 bg-[var(--ds-background)] px-4 py-24"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${brand.name}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)] opacity-80"
      />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <BrandLockup size="lg" showSlogan priority />
        <span className="sr-only">{`Loading ${brand.name}`}</span>
        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <Skeleton className="h-1.5 w-40 rounded-full" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
    </div>
  );
}
