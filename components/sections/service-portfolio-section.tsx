"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { toProjectCardProps } from "@/lib/content";
import { createStaggerVariants, fadeUp, withReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProjectContent } from "@/types/content";

export type ServicePortfolioSectionProps = {
  items: ProjectContent[];
  /** Eyebrow label above the project grid */
  label?: string;
  className?: string;
};

/**
 * Service page portfolio grid — projects only, no extra copy blocks.
 */
function ServicePortfolioSection({
  items,
  label = "Projects",
  className,
}: ServicePortfolioSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.1,
      delayChildren: 0.05,
      childVariants: fadeUp,
    });

    return {
      container: withReducedMotion(base.container, prefersReducedMotion),
      item: withReducedMotion(base.item, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  if (!items.length) return null;

  return (
    <Section
      as="section"
      spacing="xl"
      aria-label={`${label} portfolio`}
      data-slot="service-portfolio-section"
      className={cn(
        "relative overflow-hidden bg-[var(--ds-background)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-0 size-[32rem] rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[24rem] rounded-full bg-[var(--ds-primary)]/8 blur-[110px]"
      />

      <Container width="wide" className="relative z-10">
        <motion.p
          className="mb-8 text-xs font-semibold tracking-[var(--tracking-caption)] text-[var(--ds-primary-text)] uppercase md:mb-10 md:text-sm"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
        >
          {label}
        </motion.p>

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
            {items.map((project) => (
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
      </Container>
    </Section>
  );
}

export { ServicePortfolioSection };
