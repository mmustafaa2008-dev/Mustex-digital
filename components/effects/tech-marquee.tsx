"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { TechnologyBadge } from "@/components/cards/technology-badge";
import { technologies } from "@/data/technologies";
import { toTechnologyBadgeProps } from "@/lib/content";
import { cn } from "@/lib/utils";

export type TechMarqueeProps = {
  className?: string;
};

/**
 * Infinite technology marquee — pauses off-screen and on reduced motion.
 */
function TechMarquee({ className }: TechMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);
  const items = technologies.items;
  const loop = [...items, ...items];

  useEffect(() => {
    const node = rootRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { rootMargin: "80px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const animate = !prefersReducedMotion && inView;

  return (
    <div
      ref={rootRef}
      data-slot="tech-marquee"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border-y border-[var(--ds-border-subtle)]",
        "bg-[var(--ds-surface)]/40 py-4",
        "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16",
        "before:bg-gradient-to-r before:from-[var(--ds-background)] before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16",
        "after:bg-gradient-to-l after:from-[var(--ds-background)] after:to-transparent",
        className,
      )}
    >
      <div
        className={cn("flex w-max gap-3 px-4", animate && "polish-marquee")}
        style={animate ? undefined : { transform: "translate3d(0,0,0)" }}
      >
        {loop.map((item, index) => (
          <TechnologyBadge
            key={`${item.id}-${index}`}
            {...toTechnologyBadgeProps(item)}
            tone="default"
            size="md"
            interactive={false}
            className="shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export { TechMarquee };
