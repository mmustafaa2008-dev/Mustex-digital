"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { ProcessCard } from "@/components/cards/process-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { process } from "@/data/process";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  transitionPresets,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProcessContent } from "@/types/content";

export type DevelopmentProcessSectionProps = {
  content?: ProcessContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Development Process — timeline of ProcessCards with animated connectors.
 * Data from `process.ts`.
 */
function DevelopmentProcessSection({
  content = process,
  hideIntro = false,
  className,
}: DevelopmentProcessSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "development-process-heading";
  const steps = content.steps;

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.1,
      delayChildren: 0.12,
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
      data-slot="development-process-section"
      className={cn(
        "relative overflow-hidden bg-[var(--ds-background)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-border-glow)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 size-[32rem] rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />

      <Container width="wide" className="relative z-10">
        {!hideIntro && (
          <motion.header
            className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:mb-16 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger.container}
          >
            <motion.div variants={stagger.item}>
              <SectionHeading id={headingId} size="xl" align="center">
                {content.section.title}
              </SectionHeading>
            </motion.div>
            <motion.div variants={stagger.item}>
              <SectionDescription size="lg" align="center">
                {content.section.description}
              </SectionDescription>
            </motion.div>
          </motion.header>
        )}

        {/* Desktop / tablet horizontal timeline */}
        <div className="relative hidden md:block">
          <motion.div
            aria-hidden="true"
            className="absolute top-10 right-0 left-0 h-0.5 origin-left bg-[var(--ds-border-subtle)]"
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={transitionPresets.emphasized}
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-10 right-0 left-0 h-0.5 origin-left bg-[image:var(--gradient-border-glow)]"
            initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...transitionPresets.emphasized, delay: 0.08 }}
          />

          <motion.ol
            className="relative z-10 grid grid-cols-2 gap-6 lg:grid-cols-4 xl:grid-cols-7"
            aria-labelledby={hideIntro ? undefined : headingId}
            aria-label={hideIntro ? content.section.title : undefined}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger.container}
          >
            {steps.map((step) => (
              <motion.li
                key={step.id}
                variants={stagger.item}
                className="flex flex-col items-center gap-4"
              >
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full",
                    "border border-[var(--ds-border)] bg-[var(--ds-surface-elevated)]",
                    "text-xs font-semibold text-[var(--ds-primary-text)]",
                    "shadow-[var(--ds-shadow-glow-sm)]",
                  )}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { scale: 0.7, opacity: 0 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1, opacity: 1 }
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={transitionPresets.springSnappy}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.12, borderColor: "var(--ds-primary-text)" }
                  }
                >
                  {String(step.step).padStart(2, "0")}
                </motion.span>
                <ProcessCard
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  className="w-full"
                />
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Mobile vertical timeline */}
        <motion.ol
          className="relative flex flex-col gap-0 md:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger.container}
          aria-labelledby={hideIntro ? undefined : headingId}
          aria-label={hideIntro ? content.section.title : undefined}
        >
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-[var(--ds-border-subtle)]"
            initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionPresets.emphasized}
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-[image:var(--gradient-border-glow)]"
            initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transitionPresets.emphasized, delay: 0.08 }}
          />

          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              variants={stagger.item}
              className={cn(
                "relative flex gap-4 pb-8",
                index === steps.length - 1 && "pb-0",
              )}
            >
              <motion.span
                aria-hidden="true"
                className={cn(
                  "relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full",
                  "border border-[var(--ds-border)] bg-[var(--ds-surface-elevated)]",
                  "text-xs font-semibold text-[var(--ds-primary-text)]",
                  "shadow-[var(--ds-shadow-glow-sm)]",
                )}
                initial={
                  prefersReducedMotion ? false : { scale: 0.7, opacity: 0 }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1, opacity: 1 }
                }
                viewport={{ once: true, amount: 0.5 }}
                transition={transitionPresets.springSnappy}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.1, borderColor: "var(--ds-primary-text)" }
                }
              >
                {String(step.step).padStart(2, "0")}
              </motion.span>
              <div className="min-w-0 flex-1">
                <ProcessCard
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-5 border-t border-[var(--ds-border-subtle)] pt-12 text-center md:mt-16 md:pt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger.container}
        >
          <motion.div variants={stagger.item} className="flex flex-col gap-3">
            <SectionHeading as="h3" size="md" align="center">
              {content.cta.title}
            </SectionHeading>
            <SectionDescription size="md" align="center">
              {content.cta.description}
            </SectionDescription>
          </motion.div>
          <motion.div variants={stagger.item}>
            <LinkButton
              href={content.cta.primary.href}
              size="lg"
              variant="default"
              className="shadow-[var(--ds-shadow-glow-sm)]"
              rightIcon={
                <ArrowRight
                  {...createIconProps({ size: "sm", decorative: true })}
                />
              }
            >
              {content.cta.primary.label}
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export { DevelopmentProcessSection };
