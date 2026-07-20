"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  useCallback,
  useMemo,
  type MouseEvent,
  type RefObject,
} from "react";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/data/company";
import { useParallax } from "@/hooks/use-parallax";
import { createIconProps } from "@/lib/icons";
import {
  blurFade,
  createStaggerVariants,
  fadeUp,
  transitionPresets,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/types/content";

import { HeroVisual } from "./hero-visual";

export type HeroSectionProps = {
  content?: HeroContent;
  className?: string;
};

/**
 * Homepage hero — enterprise SaaS agency composition.
 * Copy from `company.hero`; visual is decorative abstract technology.
 */
function HeroSection({
  content = company.hero,
  className,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref: parallaxRef, y: parallaxY } = useParallax({ preset: "subtle" });

  const stagger = useMemo(() => {
    const base = createStaggerVariants({
      staggerChildren: 0.1,
      delayChildren: 0.08,
      childVariants: blurFade,
    });

    return {
      container: withReducedMotion(base.container, prefersReducedMotion),
      item: withReducedMotion(base.item, prefersReducedMotion),
    };
  }, [prefersReducedMotion]);

  const onPointerMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
      event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
    },
    [prefersReducedMotion],
  );

  const headingId = "hero-heading";

  return (
    <Section
      as="section"
      spacing="none"
      aria-labelledby={headingId}
      data-slot="hero-section"
      onMouseMove={prefersReducedMotion ? undefined : onPointerMove}
      className={cn(
        "group/hero relative isolate min-h-[100svh] overflow-hidden",
        "bg-[var(--ds-background)] text-[var(--ds-foreground)]",
        className,
      )}
    >
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 polish-mesh opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 polish-aurora opacity-65"
      />
      {!prefersReducedMotion ? (
        <div aria-hidden="true" className="polish-pointer-glow" />
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.4]",
          !prefersReducedMotion && "polish-grid-move",
        )}
        style={{
          ...(prefersReducedMotion
            ? {
                backgroundImage:
                  "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }
            : undefined),
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 polish-noise opacity-[0.04] mix-blend-overlay"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 size-[28rem] rounded-full bg-[var(--ds-primary)]/20 blur-[120px] max-md:opacity-70"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.25, 0.45, 0.25], x: [0, 24, 0] }
        }
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-[22rem] rounded-full bg-[var(--ds-primary)]/12 blur-[100px] max-md:hidden"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.2, 0.4, 0.2], y: [0, -20, 0] }
        }
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <Container
        width="wide"
        className="relative z-10 flex min-h-[100svh] flex-col justify-center py-24 md:py-28 lg:py-32"
      >
        <Grid
          cols={{ base: 1, lg: 2 }}
          gap="xl"
          className="items-center"
        >
          <motion.div
            className="flex max-w-xl flex-col gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={stagger.container}
          >
            <motion.div variants={stagger.item}>
              <SectionHeading
                id={headingId}
                as="h1"
                size="display"
                className="max-w-[14ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.04em]"
              >
                {content.headline}
              </SectionHeading>
            </motion.div>

            <motion.div variants={stagger.item}>
              <SectionDescription size="lg" className="max-w-md">
                {content.description}
              </SectionDescription>
            </motion.div>

            <motion.div
              variants={stagger.item}
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center"
            >
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={transitionPresets.hover}
                className="polish-cta-glow w-full sm:w-auto"
              >
                <LinkButton
                  href={content.primaryCta.href}
                  size="lg"
                  variant="default"
                  className={cn(
                    "group relative w-full overflow-hidden sm:w-auto",
                    "polish-btn-shine",
                    "bg-[image:var(--gradient-primary-solid)]",
                    "shadow-[var(--ds-shadow-glow-md)]",
                    "transition-[box-shadow,filter] duration-[var(--duration-normal)]",
                    "hover:shadow-[var(--ds-shadow-glow-lg)] hover:brightness-110",
                  )}
                  rightIcon={
                    <ArrowRight
                      {...createIconProps({ size: "sm", decorative: true })}
                      className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
                    />
                  }
                >
                  {content.primaryCta.label}
                </LinkButton>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={transitionPresets.hover}
                className="polish-cta-glow w-full sm:w-auto"
              >
                <LinkButton
                  href={content.secondaryCta.href}
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full sm:w-auto polish-btn-shine",
                    "transition-[border-color,box-shadow,background-color] duration-[var(--duration-normal)]",
                    "hover:border-[var(--ds-primary-text)]/45 hover:bg-[var(--ds-primary-muted)]",
                    "hover:shadow-[var(--ds-shadow-glow-sm)]",
                  )}
                >
                  {content.secondaryCta.label}
                </LinkButton>
              </motion.div>
            </motion.div>

            <motion.ul
              variants={stagger.item}
              className="mt-2 grid grid-cols-3 gap-4 border-t border-[var(--ds-border-subtle)] pt-6"
              aria-label="Trust indicators"
            >
              {content.trustIndicators.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="flex flex-col gap-1"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 10 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    ...transitionPresets.entrance,
                    delay: 0.15 + index * 0.08,
                  }}
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
          </motion.div>

          <div
            ref={parallaxRef as RefObject<HTMLDivElement>}
            className="relative hidden md:block"
          >
            <motion.div
              style={prefersReducedMotion ? undefined : { y: parallaxY }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={withReducedMotion(fadeUp, prefersReducedMotion)}
            >
              <HeroVisual ariaLabel={content.visualAriaLabel} />
            </motion.div>
          </div>
        </Grid>

        {/* Mobile visual — no parallax, lighter presence */}
        <motion.div
          className="relative mt-12 md:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={withReducedMotion(fadeUp, prefersReducedMotion)}
        >
          <HeroVisual ariaLabel={content.visualAriaLabel} />
        </motion.div>
      </Container>
    </Section>
  );
}

export { HeroSection };
