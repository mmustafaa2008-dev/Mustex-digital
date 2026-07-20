"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { FeatureCard } from "@/components/cards/feature-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/data/company";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CompanyContent } from "@/types/content";

export type WhyChooseSectionProps = {
  content?: CompanyContent;
  className?: string;
};

/**
 * Why Choose Mustex — advantage FeatureCards from `company.advantages`.
 */
function WhyChooseSection({
  content = company,
  className,
}: WhyChooseSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "why-choose-heading";
  const { whyChoose, advantages } = content;

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
      aria-labelledby={headingId}
      data-slot="why-choose-section"
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
        className="pointer-events-none absolute top-0 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[24rem] rounded-full bg-[var(--ds-primary)]/8 blur-[100px]"
      />

      <Container width="wide" className="relative z-10">
        <motion.header
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:mb-16 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger.container}
        >
          <motion.p
            variants={stagger.item}
            className="text-xs font-semibold tracking-[var(--tracking-caption)] text-[var(--ds-primary-text)] uppercase md:text-sm"
          >
            {whyChoose.eyebrow}
          </motion.p>
          <motion.div variants={stagger.item}>
            <SectionHeading id={headingId} size="xl" align="center">
              {whyChoose.title}
            </SectionHeading>
          </motion.div>
          <motion.div variants={stagger.item}>
            <SectionDescription size="lg" align="center">
              {whyChoose.description}
            </SectionDescription>
          </motion.div>
        </motion.header>

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
            {advantages.map((advantage) => (
              <motion.div
                key={advantage.id}
                variants={stagger.item}
                className="h-full"
              >
                <FeatureCard
                  title={advantage.title}
                  description={advantage.description}
                  icon={advantage.icon}
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-5 border-t border-[var(--ds-border-subtle)] pt-12 text-center md:mt-16 md:pt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger.container}
        >
          <motion.div variants={stagger.item} className="flex flex-col gap-3">
            <SectionHeading as="h3" size="md" align="center">
              {whyChoose.cta.title}
            </SectionHeading>
            <SectionDescription size="md" align="center">
              {whyChoose.cta.description}
            </SectionDescription>
          </motion.div>
          <motion.div variants={stagger.item}>
            <LinkButton
              href={whyChoose.cta.primary.href}
              size="lg"
              variant="outline"
              rightIcon={
                <ArrowRight
                  {...createIconProps({ size: "sm", decorative: true })}
                />
              }
            >
              {whyChoose.cta.primary.label}
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export { WhyChooseSection };
