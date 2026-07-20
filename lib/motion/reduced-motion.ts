import type { Variants } from "framer-motion";

import { motionDuration } from "./constants";
import { transitionPresets } from "./transitions";

/**
 * Strip transform-heavy motion for users who prefer reduced motion.
 * Keeps opacity fades at near-instant duration.
 */
export function withReducedMotion(
  variants: Variants,
  prefersReducedMotion: boolean | null,
): Variants {
  if (!prefersReducedMotion) {
    return variants;
  }

  const next: Variants = {};

  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === "function") {
      next[key] = value;
      continue;
    }

    next[key] = {
      opacity: "opacity" in value ? value.opacity : 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: motionDuration.fastest,
        ease: transitionPresets.soft.ease,
      },
    };
  }

  return next;
}

/** Instant transition for reduced-motion contexts */
export const reducedMotionTransition = {
  duration: motionDuration.instant,
} as const;
