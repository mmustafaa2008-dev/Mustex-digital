"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { TechnologyBadge } from "@/components/cards/technology-badge";
import { TechMarquee } from "@/components/effects/tech-marquee";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getTechnologyCategoriesWithItems,
  technologies,
} from "@/data/technologies";
import { toTechnologyBadgeProps } from "@/lib/content";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TechnologiesContent } from "@/types/content";

export type TechnologyStackSectionProps = {
  content?: TechnologiesContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Technology Stack — category glass panels with interactive badges.
 * Data from `technologies.ts`.
 */
function TechnologyStackSection({
  content = technologies,
  hideIntro = false,
  className,
}: TechnologyStackSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "technology-stack-heading";

  const categoriesWithItems = useMemo(() => {
    if (content === technologies) {
      return getTechnologyCategoriesWithItems();
    }

    return content.categories.map((category) => ({
      ...category,
      items: content.items.filter((item) => item.categoryId === category.id),
    }));
  }, [content]);

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

  const badgeStagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.04,
      delayChildren: 0.06,
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
      data-slot="technology-stack-section"
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
        className="pointer-events-none absolute top-1/3 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />

      <Container width="wide" className="relative z-10">
        {!hideIntro && (
          <motion.header
            className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-12 md:gap-5"
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

        <div className="mb-10 md:mb-14">
          <TechMarquee />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={stagger.container}
        >
          <Grid
            cols={{ base: 1, md: 2, lg: 2, xl: 4 }}
            gap="lg"
            className="items-stretch"
          >
            {categoriesWithItems.map((category) => {
              const CategoryIcon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  variants={stagger.item}
                  className="h-full"
                >
                  <GlassCard
                    motionPreset
                    padding="lg"
                    className={cn(
                      "flex h-full flex-col gap-5",
                      "hover:border-[var(--ds-primary-text)]/35 hover:shadow-[var(--ds-shadow-glow-sm)]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {CategoryIcon ? (
                        <span
                          className={cn(
                            "inline-flex size-10 items-center justify-center rounded-[var(--ds-radius-md)]",
                            "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
                            "text-[var(--ds-primary-text)]",
                          )}
                        >
                          <CategoryIcon
                            {...createIconProps({
                              size: "md",
                              decorative: true,
                            })}
                          />
                        </span>
                      ) : null}
                      <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
                        {category.title}
                      </h3>
                    </div>

                    <motion.ul
                      className="flex flex-wrap gap-2"
                      aria-label={category.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={badgeStagger.container}
                    >
                      {category.items.map((item) => (
                        <motion.li
                          key={item.id}
                          variants={badgeStagger.item}
                          className="list-none"
                        >
                          <TechnologyBadge
                            {...toTechnologyBadgeProps(item)}
                            tone="default"
                            size="md"
                            interactive
                            float
                          />
                        </motion.li>
                      ))}
                    </motion.ul>
                  </GlassCard>
                </motion.div>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  );
}

export { TechnologyStackSection };
