"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useRef } from "react";

import { FeatureCard } from "@/components/cards/feature-card";
import { StatisticCard } from "@/components/cards/statistic-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { commitment } from "@/data/commitment";
import {
  parseStatValue,
  useAnimatedCounter,
} from "@/hooks/use-animated-counter";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { CommitmentContent, ContentStat } from "@/types/content";

export type CommitmentSectionProps = {
  content?: CommitmentContent;
  className?: string;
};

function MetricCard({
  stat,
  active,
  reducedMotion,
}: {
  stat: ContentStat;
  active: boolean;
  reducedMotion: boolean;
}) {
  const parsed = parseStatValue(stat.value);
  const animated = useAnimatedCounter(parsed.numeric, {
    active,
    reducedMotion,
  });

  const displayValue =
    parsed.numeric === null || animated === null
      ? undefined
      : `${parsed.prefix}${Math.round(animated)}${parsed.suffix}`;

  return (
    <StatisticCard
      label={stat.label}
      value={stat.value}
      displayValue={displayValue}
      description={stat.description}
    />
  );
}

/**
 * Our Commitment — premium metrics, quality cards, and trust indicators.
 * All copy from `commitment.ts`.
 */
function CommitmentSection({
  content = commitment,
  className,
}: CommitmentSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const headingId = "commitment-heading";
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.35 });

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
      data-slot="commitment-section"
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
        className="pointer-events-none absolute top-0 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-1/4 size-[28rem] rounded-full bg-[var(--ds-primary)]/8 blur-[110px]"
      />

      <Container width="wide" className="relative z-10">
        <motion.header
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:mb-16 md:gap-5"
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

        <motion.div
          ref={metricsRef}
          className="mb-14 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger.container}
          aria-label="Commitment metrics"
        >
          <Grid
            cols={{ base: 1, sm: 2, lg: 4 }}
            gap="lg"
            className="items-stretch"
          >
            {content.metrics.map((metric) => (
              <motion.div
                key={metric.id}
                variants={stagger.item}
                className="h-full"
              >
                <MetricCard
                  stat={metric}
                  active={metricsInView}
                  reducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger.container}
        >
          <Grid
            cols={{ base: 1, md: 2, lg: 3 }}
            gap="lg"
            className="items-stretch"
          >
            {content.qualities.map((quality) => (
              <motion.div
                key={quality.id}
                variants={stagger.item}
                className="h-full"
              >
                <FeatureCard
                  title={quality.title}
                  description={quality.description}
                  icon={quality.icon}
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        <motion.ul
          className="mt-12 grid grid-cols-2 gap-6 border-y border-[var(--ds-border-subtle)] py-8 md:mt-16 md:grid-cols-4 md:gap-8 md:py-10"
          aria-label="Trust indicators"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger.container}
        >
          {content.trustIndicators.map((item) => (
            <motion.li
              key={item.id}
              variants={stagger.item}
              className="flex flex-col gap-1 text-center md:gap-1.5"
            >
              <span className="text-lg font-semibold tracking-tight text-[var(--ds-foreground)] md:text-xl">
                {item.value}
              </span>
              <span className="text-[0.6875rem] leading-snug tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase md:text-xs">
                {item.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className={cn(
            "mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-[var(--ds-radius-xl)] border border-[var(--ds-border-subtle)]",
            "bg-[var(--glass-panel-bg)] px-6 py-10 text-center backdrop-blur-[var(--glass-panel-blur)]",
            "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
            "md:mt-16 md:px-12 md:py-12",
          )}
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

export { CommitmentSection };
