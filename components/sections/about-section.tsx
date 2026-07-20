"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/data/company";
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
import type { CompanyContent, ContentStat } from "@/types/content";

import { AboutVisual } from "./about-visual";

export type AboutSectionProps = {
  content?: CompanyContent;
  /** Hide the section title/headline when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

function AboutStat({
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

  const display =
    parsed.numeric === null || animated === null
      ? stat.value
      : `${parsed.prefix}${Math.round(animated)}${parsed.suffix}`;

  return (
    <GlassCard
      motionPreset
      padding="lg"
      className="flex h-full flex-col gap-2"
      aria-label={`${stat.label}: ${stat.value}`}
    >
      <p className="text-xs font-medium tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
        {stat.label}
      </p>
      <p
        className="text-[length:var(--text-display-md)] font-bold tracking-[var(--tracking-display)] text-[var(--ds-foreground)] tabular-nums"
        aria-hidden={parsed.numeric !== null ? true : undefined}
      >
        {display}
      </p>
      {parsed.numeric !== null ? (
        <span className="sr-only">
          {stat.label}: {stat.value}
        </span>
      ) : null}
      {stat.description ? (
        <p className="text-sm text-[var(--ds-foreground-muted)]">
          {stat.description}
        </p>
      ) : null}
    </GlassCard>
  );
}

/**
 * About section — mission, vision, stats, values timeline, and visual.
 * All copy from `company.ts`.
 */
function AboutSection({
  content = company,
  hideIntro = false,
  className,
}: AboutSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const headingId = "about-heading";
  const valuesHeadingId = "about-values-heading";
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.09,
      delayChildren: 0.08,
      childVariants: fadeUp,
    });

    return {
      container: withReducedMotion(base.container, prefersReducedMotion),
      item: withReducedMotion(base.item, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  const MissionIcon = content.mission.icon;
  const VisionIcon = content.vision.icon;

  return (
    <Section
      as="section"
      spacing="xl"
      aria-labelledby={hideIntro ? undefined : headingId}
      aria-label={hideIntro ? content.about.title : undefined}
      data-slot="about-section"
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
        className="pointer-events-none absolute top-1/3 right-0 size-[28rem] rounded-full bg-[var(--ds-primary)]/10 blur-[120px]"
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
                {content.about.title}
              </SectionHeading>
            </motion.div>
            <motion.div variants={stagger.item}>
              <SectionDescription
                size="lg"
                className="text-[length:var(--text-heading-sm)] md:text-[length:var(--text-heading-md)]"
              >
                {content.about.headline}
              </SectionDescription>
            </motion.div>
          </motion.header>
        )}

        <Grid
          cols={{ base: 1, lg: 2 }}
          gap="xl"
          className="mb-16 items-stretch md:mb-20"
        >
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger.container}
          >
            <motion.div variants={stagger.item}>
              <SectionDescription size="lg" className="max-w-xl">
                {content.about.body}
              </SectionDescription>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div variants={stagger.item} className="h-full">
                <GlassCard
                  motionPreset
                  padding="lg"
                  className="flex h-full flex-col gap-4"
                >
                  {MissionIcon ? (
                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full",
                        "bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]",
                      )}
                    >
                      <MissionIcon
                        {...createIconProps({
                          size: "feature",
                          decorative: true,
                        })}
                      />
                    </span>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
                      {content.mission.title}
                    </h3>
                    <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
                      {content.mission.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={stagger.item} className="h-full">
                <GlassCard
                  motionPreset
                  padding="lg"
                  className="flex h-full flex-col gap-4"
                >
                  {VisionIcon ? (
                    <span
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-full",
                        "bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]",
                      )}
                    >
                      <VisionIcon
                        {...createIconProps({
                          size: "feature",
                          decorative: true,
                        })}
                      />
                    </span>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
                      {content.vision.title}
                    </h3>
                    <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
                      {content.vision.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="h-full min-h-[22rem]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={withReducedMotion(fadeUp, prefersReducedMotion)}
          >
            <AboutVisual
              alt={content.about.image.alt}
              src={content.about.image.src}
              className="h-full"
            />
          </motion.div>
        </Grid>

        <div
          ref={statsRef}
          className="mb-16 md:mb-20"
          aria-label="Company statistics"
        >
          <Grid cols={{ base: 2, md: 4 }} gap="md">
            {content.stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={withReducedMotion(fadeUp, prefersReducedMotion)}
                transition={{ delay: index * 0.06 }}
              >
                <AboutStat
                  stat={stat}
                  active={statsInView}
                  reducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
          </Grid>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger.container}
        >
          <motion.div
            variants={stagger.item}
            className="mb-8 border-b border-[var(--ds-border-subtle)] pb-4 md:mb-10"
          >
            <SectionHeading id={valuesHeadingId} size="lg">
              {content.about.valuesTitle}
            </SectionHeading>
          </motion.div>

          <ol
            aria-labelledby={valuesHeadingId}
            className="relative flex flex-col gap-4"
          >
            {content.values.map((value, index) => {
              const Icon = value.icon;
              const step = String(index + 1).padStart(2, "0");
              const isLast = index === content.values.length - 1;

              return (
                <motion.li
                  key={value.id}
                  variants={stagger.item}
                  className="relative flex gap-4 md:gap-6"
                >
                  <div className="relative flex flex-col items-center">
                    <span
                      className={cn(
                        "z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
                        "border border-[var(--ds-border)] bg-[var(--ds-surface-elevated)]",
                        "text-xs font-semibold text-[var(--ds-primary-text)]",
                      )}
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                    {!isLast ? (
                      <span
                        className="absolute top-10 bottom-[-1rem] w-px bg-[var(--ds-border-subtle)]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  <GlassCard
                    motionPreset
                    padding="lg"
                    className={cn(
                      "min-w-0 flex-1",
                      "hover:border-[var(--ds-primary-text)]/40 hover:shadow-[var(--ds-shadow-glow-sm)]",
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                      {Icon ? (
                        <span className="shrink-0 text-[var(--ds-primary-text)]">
                          <Icon
                            {...createIconProps({
                              size: "lg",
                              decorative: true,
                            })}
                          />
                        </span>
                      ) : null}
                      <div className="flex min-w-0 flex-col gap-2">
                        <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
                          <span className="sr-only">Step {index + 1}: </span>
                          {value.title}
                        </h3>
                        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>
      </Container>
    </Section>
  );
}

export { AboutSection };
