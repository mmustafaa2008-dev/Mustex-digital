"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { IndustryCard } from "@/components/cards/industry-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/data/industries";
import { toIndustryCardProps } from "@/lib/content";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { IndustriesContent } from "@/types/content";

export type IndustriesSectionProps = {
  content?: IndustriesContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Industries We Serve — IndustryCards from `industries.ts`.
 */
function IndustriesSection({
  content = industries,
  hideIntro = false,
  className,
}: IndustriesSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "industries-heading";

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.07,
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
      data-slot="industries-section"
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
        className="pointer-events-none absolute top-1/4 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />

      <Container width="wide" className="relative z-10">
        {!hideIntro && (
          <motion.header
            className="mb-12 flex max-w-3xl flex-col gap-4 md:mb-16 md:gap-5"
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
          </motion.header>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger.container}
        >
          <Grid
            cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            gap="lg"
            className="items-stretch"
          >
            {content.items.map((industry) => (
              <motion.div
                key={industry.id}
                variants={stagger.item}
                className="h-full"
              >
                <IndustryCard {...toIndustryCardProps(industry)} />
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

export { IndustriesSection };
