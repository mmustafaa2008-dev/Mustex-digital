"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProjects, projects } from "@/data/projects";
import { toProjectCardProps } from "@/lib/content";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fadeUp,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProjectsContent } from "@/types/content";

export type FeaturedWorkSectionProps = {
  content?: ProjectsContent;
  /** Hide the section title/description when the page already provides that intro. */
  hideIntro?: boolean;
  className?: string;
};

/**
 * Featured Work — ProjectCards from `projects.ts` (featured items).
 */
function FeaturedWorkSection({
  content = projects,
  hideIntro = false,
  className,
}: FeaturedWorkSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "featured-work-heading";
  const featuredItems =
    content === projects
      ? getFeaturedProjects()
      : content.items.filter((item) => item.featured);

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.1,
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
      aria-label={hideIntro ? content.featuredSection.title : undefined}
      data-slot="featured-work-section"
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
        className="pointer-events-none absolute top-1/4 left-0 size-[32rem] rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[24rem] rounded-full bg-[var(--ds-primary)]/8 blur-[110px]"
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
                {content.featuredSection.title}
              </SectionHeading>
            </motion.div>
            <motion.div variants={stagger.item}>
              <SectionDescription size="lg">
                {content.featuredSection.description}
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
            cols={{ base: 1, md: 2, lg: 3 }}
            gap="lg"
            className="items-stretch"
          >
            {featuredItems.map((project) => (
              <motion.div
                key={project.id}
                variants={stagger.item}
                className="h-full"
              >
                <ProjectCard {...toProjectCardProps(project)} />
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
          <motion.div
            variants={stagger.item}
            className="flex flex-col gap-3 sm:flex-row"
          >
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
            {content.cta.secondary ? (
              <LinkButton
                href={content.cta.secondary.href}
                size="lg"
                variant="outline"
              >
                {content.cta.secondary.label}
              </LinkButton>
            ) : null}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export { FeaturedWorkSection };
