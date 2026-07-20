import type { Transition, Variants } from "framer-motion";

import { motionDuration } from "./constants";
import { fadeUp } from "./variants";

export type StaggerOptions = {
  /** Delay between children (seconds) */
  staggerChildren?: number;
  /** Initial delay before first child (seconds) */
  delayChildren?: number;
  /** Child variant set — defaults to fadeUp */
  childVariants?: Variants;
  /** Stagger direction */
  staggerDirection?: 1 | -1;
};

/**
 * Parent + child stagger variants.
 * Spread parent on container; children use `variants` with same names.
 */
export function createStaggerVariants(options: StaggerOptions = {}): {
  container: Variants;
  item: Variants;
} {
  const {
    staggerChildren = 0.08,
    delayChildren = 0.12,
    childVariants = fadeUp,
    staggerDirection = 1,
  } = options;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
        staggerDirection,
      } satisfies Transition,
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerChildren / 2,
        staggerDirection: -staggerDirection,
        when: "afterChildren",
      },
    },
  };

  return {
    container,
    item: childVariants,
  };
}

/** Ready-made stagger presets */
export const staggerPresets = {
  default: createStaggerVariants(),
  fast: createStaggerVariants({
    staggerChildren: 0.05,
    delayChildren: 0.06,
  }),
  slow: createStaggerVariants({
    staggerChildren: 0.12,
    delayChildren: 0.2,
  }),
  reverse: createStaggerVariants({
    staggerChildren: 0.08,
    delayChildren: 0.1,
    staggerDirection: -1,
  }),
  section: createStaggerVariants({
    staggerChildren: 0.1,
    delayChildren: motionDuration.fast,
  }),
} as const;
