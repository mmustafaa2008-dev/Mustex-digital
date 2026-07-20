"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";
import { startProjectContent } from "@/data/start-project";
import { fadeUp, pageTransition, withReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type SuccessScreenProps = {
  className?: string;
};

function SuccessScreen({ className }: SuccessScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const content = startProjectContent.success;
  const [thanks, followUp] = content.description.split("\n\n");

  return (
    <motion.div
      className={cn(
        "mx-auto flex max-w-xl flex-col items-center gap-8 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
      initial="initial"
      animate="animate"
      variants={withReducedMotion(pageTransition, prefersReducedMotion)}
    >
      <motion.div
        className={cn(
          "flex size-16 items-center justify-center rounded-full",
          "border border-[var(--ds-primary)] bg-[var(--ds-primary)]/15",
          "text-[var(--ds-primary-text)] shadow-[var(--ds-shadow-glow-sm)]",
        )}
        variants={withReducedMotion(fadeUp, prefersReducedMotion)}
        initial="hidden"
        animate="visible"
      >
        <Check className="size-8" aria-hidden="true" strokeWidth={2.5} />
        <span className="sr-only">Success</span>
      </motion.div>

      <div className="flex flex-col gap-3">
        <SectionHeading as="h1" size="xl" align="center">
          {content.title}
        </SectionHeading>
        <SectionDescription size="lg" align="center">
          {thanks}
        </SectionDescription>
        {followUp ? (
          <SectionDescription size="md" align="center">
            {followUp}
          </SectionDescription>
        ) : null}
      </div>

      <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
        <LinkButton href={content.homeHref} size="lg" variant="default">
          {content.homeLabel}
        </LinkButton>
        <LinkButton href={content.contactHref} size="lg" variant="outline">
          {content.contactLabel}
        </LinkButton>
      </div>
    </motion.div>
  );
}

export { SuccessScreen };
