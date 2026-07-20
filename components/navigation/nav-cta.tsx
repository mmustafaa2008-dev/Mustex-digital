"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { createIconProps } from "@/lib/icons";
import { transitionPresets } from "@/lib/motion";
import { uiFocusRing } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type NavCtaProps = {
  label: string;
  href: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-sm",
} as const;

/**
 * Primary navbar CTA — gradient, glow, magnetic hover, animated arrow.
 */
function NavCta({ label, href, className, size = "sm" }: NavCtaProps) {
  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.22);
    y.set(relY * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      className={cn("inline-flex shrink-0", className)}
    >
      <Link
        ref={ref}
        href={href}
        data-slot="nav-cta"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
          "rounded-full font-semibold tracking-[-0.01em] text-[var(--ds-primary-foreground)]",
          "bg-[image:var(--gradient-primary-solid)]",
          "shadow-[var(--ds-shadow-glow-md)]",
          "transition-[box-shadow,filter] duration-[var(--duration-normal)]",
          "hover:shadow-[var(--ds-shadow-glow-lg)] hover:brightness-110",
          "before:pointer-events-none before:absolute before:inset-0",
          "before:bg-[image:var(--gradient-primary-sheen)]",
          uiFocusRing,
          sizeClass[size],
        )}
      >
        <span className="relative z-10">{label}</span>
        <motion.span
          className="relative z-10 inline-flex"
          aria-hidden="true"
          transition={transitionPresets.hover}
          whileHover={reduceMotion ? undefined : { x: 3 }}
        >
          <ArrowRight
            {...createIconProps({ size: "sm", decorative: true })}
            className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
          />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export { NavCta };
