"use client";

import { Avatar } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export type TestimonialCardProps = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  rating?: number;
  className?: string;
};

/**
 * Client testimonial / quote card.
 */
function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarSrc,
  rating,
  className,
}: TestimonialCardProps) {
  const meta = [role, company].filter(Boolean).join(" · ");

  return (
    <GlassCard
      data-slot="testimonial-card"
      padding="lg"
      motionPreset
      className={cn("flex h-full flex-col gap-6", className)}
    >
      {typeof rating === "number" ? (
        <div
          className="flex gap-1 text-[var(--ds-warning-text)]"
          aria-label={`Rated ${rating} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} aria-hidden="true">
              {index < rating ? "★" : "☆"}
            </span>
          ))}
        </div>
      ) : null}

      <blockquote className="flex-1 text-[length:var(--text-body-lg)] leading-[var(--leading-body)] text-[var(--ds-foreground-subtle)]">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>

      <footer className="flex items-center gap-3">
        <Avatar src={avatarSrc} alt={author} size="md" />
        <div className="min-w-0">
          <cite className="not-italic text-sm font-semibold text-[var(--ds-foreground)]">
            {author}
          </cite>
          {meta ? (
            <p className="truncate text-xs text-[var(--ds-foreground-muted)]">
              {meta}
            </p>
          ) : null}
        </div>
      </footer>
    </GlassCard>
  );
}

export { TestimonialCard };
