"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { ServiceCard } from "@/components/cards/service-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";
import { toServiceCardProps } from "@/lib/content";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ServicesContent } from "@/types/content";

export type ServicesSectionProps = {
  content?: ServicesContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Services catalog section — heading, staggered ServiceCard grid, section CTA.
 * All copy from `services.ts`.
 */
function ServicesSection({
  content = services,
  hideIntro = false,
  className,
}: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "services-heading";

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

  return (
    <Section
      as="section"
      spacing="xl"
      aria-labelledby={hideIntro ? undefined : headingId}
      aria-label={hideIntro ? content.section.title : undefined}
      data-slot="services-section"
      className={cn("relative overflow-hidden bg-[var(--ds-background)]", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-border-glow)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[120px]"
      />

      <Container width="wide" className="relative z-10">
        {!hideIntro && (
          <motion.div
            className="mx-auto mb-12 flex max-w-3xl flex-col gap-4 md:mb-16 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger.container}
          >
            <motion.div variants={stagger.item}>
              <SectionHeading id={headingId} size="xl">
                {content.section.title}
              </SectionHeading>
            </motion.div>
            <motion.div variants={stagger.item}>
              <SectionDescription size="lg">
                {content.section.description}
              </SectionDescription>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger.container}
        >
          <Grid
            cols={{ base: 1, md: 2, lg: 3 }}
            gap="lg"
            className="items-stretch"
          >
            {content.items.map((service) => (
              <motion.div key={service.id} variants={stagger.item} className="h-full">
                <ServiceCard {...toServiceCardProps(service)} />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--ds-border-subtle)] pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger.container}
        >
          <motion.div variants={stagger.item} className="flex max-w-xl flex-col gap-2">
            <SectionHeading as="h3" size="md">
              {content.cta.title}
            </SectionHeading>
            <SectionDescription size="md">
              {content.cta.description}
            </SectionDescription>
          </motion.div>
          <motion.div variants={stagger.item}>
            <LinkButton
              href={content.cta.primary.href}
              size="lg"
              variant="default"
              className="shadow-[var(--ds-shadow-glow-sm)]"
            >
              {content.cta.primary.label}
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export { ServicesSection };
