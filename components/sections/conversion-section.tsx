"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { conversion } from "@/data/conversion";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  transitionPresets,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ConversionContent } from "@/types/content";

export type ConversionSectionProps = {
  content?: ConversionContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Final conversion CTA — gradient atmosphere, dual CTAs, trust indicators.
 * All copy from `conversion.ts`.
 */
function ConversionSection({
  content = conversion,
  hideIntro = false,
  className,
}: ConversionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "conversion-heading";

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.1,
      delayChildren: 0.08,
      childVariants: fadeUp,
    });

    return {
      container: withReducedMotion(base.container, prefersReducedMotion),
      item: withReducedMotion(base.item, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  return (
    <Section
      as="section"
      spacing="xl"
      aria-labelledby={hideIntro ? undefined : headingId}
      aria-label={hideIntro ? content.section.title : undefined}
      data-slot="conversion-section"
      className={cn(
        "relative isolate overflow-hidden",
        "bg-[var(--ds-background)] text-[var(--ds-foreground)]",
        className,
      )}
    >
      {/* Gradient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-surface-fade)] opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 15%, transparent 75%)",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary)]/25 blur-[130px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.2, 0.4, 0.2], scale: [1, 1.06, 1] }
        }
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 size-[22rem] rounded-full bg-[var(--ds-primary-soft)]/15 blur-[100px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.12, 0.28, 0.12], x: [0, 20, 0] }
        }
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-20 size-[26rem] rounded-full bg-[var(--ds-primary)]/18 blur-[110px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.15, 0.32, 0.15], y: [0, -16, 0] }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[image:var(--gradient-fade-to-background)]"
      />

      <Container width="narrow" className="relative z-10">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={stagger.container}
        >
          {!hideIntro && (
            <div className="flex flex-col items-center gap-4 md:gap-5">
              <motion.div variants={stagger.item}>
                <SectionHeading
                  id={headingId}
                  size="display"
                  align="center"
                  className="drop-shadow-[0_0_40px_rgb(37_99_235_/_0.2)]"
                >
                  {content.section.title}{" "}
                  <span
                    className={cn(
                      "bg-gradient-to-r from-[var(--ds-primary-text)] via-[var(--ds-primary-soft)] to-[var(--ds-primary)]",
                      "bg-clip-text text-transparent",
                    )}
                  >
                    {content.titleAccent}
                  </span>
                </SectionHeading>
              </motion.div>
              <motion.div variants={stagger.item}>
                <SectionDescription size="lg" align="center">
                  {content.section.description}
                </SectionDescription>
              </motion.div>
            </div>
          )}

          <motion.div
            variants={stagger.item}
            className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={transitionPresets.hover}
              className="w-full sm:w-auto"
            >
              <LinkButton
                href={content.primaryCta.href}
                size="lg"
                variant="default"
                className="w-full shadow-[var(--ds-shadow-glow-md)] hover:shadow-[var(--ds-shadow-glow-lg)] sm:w-auto"
                rightIcon={
                  <ArrowRight
                    {...createIconProps({ size: "sm", decorative: true })}
                  />
                }
              >
                {content.primaryCta.label}
              </LinkButton>
            </motion.div>
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={transitionPresets.hover}
              className="w-full sm:w-auto"
            >
              <LinkButton
                href={content.secondaryCta.href}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                {content.secondaryCta.label}
              </LinkButton>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={stagger.item}
            className="mt-2 grid w-full grid-cols-2 gap-6 border-t border-[var(--ds-border-subtle)] pt-8 sm:grid-cols-4 sm:gap-8"
            aria-label="Trust indicators"
          >
            {content.trustIndicators.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-lg font-semibold tracking-tight text-[var(--ds-foreground)] md:text-xl">
                  {item.value}
                </span>
                <span className="text-[0.6875rem] leading-snug tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase md:text-xs">
                  {item.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  );
}

export { ConversionSection };
