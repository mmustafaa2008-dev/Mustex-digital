"use client";

import { ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { buttonVariants } from "@/components/ui/button";
import { createIconProps } from "@/lib/icons";
import { motionScale, transitionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProjectLink } from "@/types/content";

import { ProjectPreviewMedia } from "./project-preview-media";

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
  status?: "live" | "coming-soon" | "in-development" | "available-on-request";
  links?: ProjectLink[];
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

const statusLabels: Record<
  NonNullable<ProjectCardProps["status"]>,
  string
> = {
  live: "Live",
  "coming-soon": "Coming Soon",
  "in-development": "Currently Working",
  "available-on-request": "Available Upon Request",
};

function ProjectActionLink({ link }: { link: ProjectLink }) {
  const className = cn(
    buttonVariants({ variant: link.disabled ? "outline" : "outline", size: "sm" }),
    "relative z-10 w-full justify-center sm:w-auto",
    link.disabled && "pointer-events-none opacity-60",
  );

  if (link.disabled) {
    return (
      <span aria-disabled="true" className={className}>
        {link.label}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {link.label}
      {link.external ? (
        <ExternalLink
          {...createIconProps({ size: "xs", decorative: true })}
          className="opacity-70"
        />
      ) : null}
    </a>
  );
}

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
  status,
  links,
  className,
}: ProjectCardProps) {
  const actionLinks = links?.length
    ? links
    : href && ctaLabel
      ? [{ label: ctaLabel, href, external: href.startsWith("http") }]
      : undefined;

  return (
    <div
      className="h-full [perspective:1400px]"
      data-slot="project-card-perspective"
    >
      <Card
        data-slot="project-card"
        variant="elevated"
        padding="none"
        interactive
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
        <div className="relative">
          <ProjectPreviewMedia
            title={title}
            category={category}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
          />

          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
            {category ? (
              <Pill size="sm" variant="secondary">
                {category}
              </Pill>
            ) : null}
            {status ? (
              <Pill size="sm" variant="outline">
                {statusLabels[status]}
              </Pill>
            ) : null}
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[length:var(--text-heading-sm)] font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)]">
              {title}
            </h3>
            <p className="line-clamp-3 text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
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

          <div className="mt-auto flex flex-col gap-3 pt-1">
            {meta ? (
              <p className="text-xs tracking-[var(--tracking-caption)] text-[var(--ds-foreground-muted)] uppercase">
                {meta}
              </p>
            ) : null}

            {actionLinks?.length ? (
              <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {actionLinks.map((link) => (
                  <ProjectActionLink key={link.label} link={link} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
}

export { ProjectCard };
