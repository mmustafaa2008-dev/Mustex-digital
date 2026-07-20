import { BrandLockup } from "@/components/brand";
import { Skeleton } from "@/components/ui/skeleton";
import { brand } from "@/data/brand";

/**
 * Root fallback loading — avoids Framer Motion on the critical path.
 */
export default function Loading() {
  return (
    <div
      data-slot="loading-screen"
      className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center bg-[var(--ds-background)]"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${brand.name}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)]"
      />
      <div className="relative z-10 flex flex-col items-center gap-8">
        <BrandLockup size="lg" showSlogan priority />
        <span className="sr-only">{`Loading ${brand.name}`}</span>
        <Skeleton className="h-1.5 w-24 rounded-full" />
      </div>
    </div>
  );
}
