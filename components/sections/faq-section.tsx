"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { FaqList } from "@/components/cards/faq-item";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/data/faq";
import { toFaqItemProps } from "@/lib/content";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { FaqContent } from "@/types/content";

export type FaqSectionProps = {
  content?: FaqContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * FAQ section — animated accordion from `faq.ts`.
 */
function FaqSection({
  content = faq,
  hideIntro = false,
  className,
}: FaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "faq-heading";

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.08,
      delayChildren: 0.1,
      childVariants: fadeUp,
    });

    return {
      container: withReducedMotion(base.container, prefersReducedMotion),
      item: withReducedMotion(base.item, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  const items = useMemo(
    () => content.items.map((item) => toFaqItemProps(item)),
    [content.items],
  );

  return (
    <Section
      as="section"
      spacing="xl"
      aria-labelledby={hideIntro ? undefined : headingId}
      aria-label={hideIntro ? content.section.title : undefined}
      data-slot="faq-section"
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
        className="pointer-events-none absolute top-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />

      <Container width="lg" className="relative z-10">
        {!hideIntro && (
          <motion.header
            className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-16 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger.container}
          >
            {content.section.eyebrow ? (
              <motion.p
                variants={stagger.item}
                className="text-xs font-semibold tracking-[var(--tracking-caption)] text-[var(--ds-primary-text)] uppercase md:text-sm"
              >
                {content.section.eyebrow}
              </motion.p>
            ) : null}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger.container}
        >
          <motion.div variants={stagger.item}>
            <FaqList items={items} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-5 border-t border-[var(--ds-border-subtle)] pt-12 text-center md:mt-16 md:pt-14"
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

export { FaqSection };
