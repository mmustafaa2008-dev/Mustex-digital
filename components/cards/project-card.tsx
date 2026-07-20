"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { createIconProps } from "@/lib/icons";
import { motionScale, transitionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  technologies?: string[];
  href?: string;
  ctaLabel?: string;
  meta?: string;
  className?: string;
};

const projectCardHover = {
  whileHover: {
    y: -8,
    scale: motionScale.card,
    transition: transitionPresets.springSoft,
  },
  whileTap: {
    y: -2,
    scale: 1,
    transition: transitionPresets.hover,
  },
  transition: transitionPresets.springSoft,
} as const;

/**
 * Portfolio / case-study project card — premium 3D hover + gradient media.
 */
function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt = "",
  category,
  technologies,
  href,
  ctaLabel,
  meta,
  className,
}: ProjectCardProps) {
  return (
    <div
      className="h-full [perspective:1400px]"
      data-slot="project-card-perspective"
    >
      <Card
        data-slot="project-card"
        variant="elevated"
        padding="none"
        interactive={Boolean(href)}
        motionPreset
        style={{ transformStyle: "preserve-3d" }}
        {...projectCardHover}
        className={cn(
          "group flex h-full flex-col overflow-hidden",
          "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
          "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
          "hover:border-[var(--ds-primary-text)]/40 hover:shadow-[var(--ds-shadow-glow-md)]",
          "motion-reduce:transform-none",
          className,
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--ds-surface-sunken)]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div
              className="absolute inset-0 bg-[image:var(--gradient-hero-atmosphere)]"
              aria-hidden="true"
            />
          )}

          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-gradient-to-t from-[var(--ds-background)] via-[var(--ds-background)]/35 to-transparent",
              "opacity-70 transition-opacity duration-[var(--duration-normal)]",
              "group-hover:opacity-95",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-[image:var(--gradient-primary-glow)] opacity-0",
              "transition-opacity duration-[var(--duration-normal)]",
              "group-hover:opacity-60",
            )}
          />

          {category ? (
            <div className="absolute top-3 left-3 z-10">
              <Pill size="sm" variant="secondary">
                {category}
              </Pill>
            </div>
          ) : null}
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
              {href ? (
                <a
                  href={href}
                  className="outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-focus-ring-offset)]"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
            <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
              {description}
            </p>
          </div>

          {technologies?.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {technologies.map((tech, index) => (
                <li
                  key={tech}
                  className={cn(
                    "rounded-[var(--ds-radius-xs)] border border-[var(--ds-border-subtle)] bg-[var(--ds-muted)]/50 px-2 py-0.5 text-xs text-[var(--ds-foreground-subtle)]",
                    "transition-[border-color,color,background-color,transform,opacity] duration-[var(--duration-normal)]",
                    "opacity-90 group-hover:opacity-100",
                    "group-hover:border-[var(--ds-primary-text)]/30 group-hover:bg-[var(--ds-primary-muted)]/60",
                    "group-hover:text-[var(--ds-primary-text)] group-hover:-translate-y-0.5",
                  )}
                  style={{
                    transitionDelay: `${Math.min(index, 5) * 40}ms`,
                  }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            {meta ? (
              <p className="relative z-10 text-xs tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
                {meta}
              </p>
            ) : (
              <span />
            )}
            {href && ctaLabel ? (
              <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ds-primary-text)] transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1">
                {ctaLabel}
                <ArrowRight
                  {...createIconProps({ size: "sm", decorative: true })}
                  className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5"
                />
              </span>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}

export { ProjectCard };
