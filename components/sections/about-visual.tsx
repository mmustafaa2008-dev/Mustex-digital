"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { createFloatingEffect, transitionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type AboutVisualProps = {
  alt: string;
  src?: string;
  className?: string;
};

/**
 * About media panel — optional image, otherwise premium abstract glass composition.
 */
function AboutVisual({ alt, src, className }: AboutVisualProps) {
  const prefersReducedMotion = useReducedMotion();
  const float = prefersReducedMotion
    ? undefined
    : createFloatingEffect({ distance: 8, duration: 6 });

  if (src) {
    return (
      <figure
        data-slot="about-visual"
        className={cn(
          "relative h-full min-h-[20rem] overflow-hidden rounded-[var(--ds-radius-xl)]",
          "border border-[var(--ds-border)] bg-[var(--glass-panel-bg)]",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover opacity-90 mix-blend-luminosity"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)] opacity-50"
        />
      </figure>
    );
  }

  return (
    <figure
      data-slot="about-visual"
      aria-label={alt}
      className={cn(
        "relative flex h-full min-h-[20rem] items-center justify-center overflow-hidden rounded-[var(--ds-radius-xl)] p-8",
        "border border-[var(--ds-border)] bg-[var(--glass-panel-bg)]",
        "shadow-[var(--ds-shadow-glow-sm)] backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)] opacity-70"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary)]/20 blur-[80px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.05, 0.95] }
        }
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <motion.div
        aria-hidden="true"
        className={cn(
          "relative z-10 grid w-full max-w-sm grid-cols-2 gap-3",
        )}
        animate={float?.animate}
        transition={float?.transition}
      >
        <div className="col-span-2 h-28 rounded-[var(--ds-radius-md)] border border-white/10 bg-white/5">
          <div
            className="h-full w-full opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(rgb(255 255 255 / 0.2) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />
        </div>
        <div className="h-24 rounded-[var(--ds-radius-md)] border border-white/10 bg-white/5" />
        <div className="h-24 rounded-[var(--ds-radius-md)] border border-[var(--ds-primary)]/25 bg-[var(--ds-primary)]/10 shadow-[inset_0_0_24px_var(--ds-primary-glow)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-[var(--ds-radius-lg)] border border-[var(--ds-primary)]/15"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={transitionPresets.entrance}
      />
    </figure>
  );
}

export { AboutVisual };
