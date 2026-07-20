import type { TargetAndTransition, Transition } from "framer-motion";

import { motionDistance } from "./constants";
import { transitionPresets } from "./transitions";

export type FloatingOptions = {
  distance?: number;
  duration?: number;
};

/**
 * Continuous floating loop — decorative presence only.
 * Disable when prefers-reduced-motion is set.
 */
export function createFloatingEffect(
  options: FloatingOptions = {},
): {
  animate: TargetAndTransition;
  transition: Transition;
} {
  const distance = options.distance ?? motionDistance.xs;
  const duration = options.duration ?? 4;

  return {
    animate: {
      y: [0, -distance, 0],
    },
    transition: {
      ...transitionPresets.float,
      duration,
    },
  };
}

export const floatingEffect = createFloatingEffect();

export const floatingPresets = {
  subtle: createFloatingEffect({ distance: 6, duration: 5 }),
  default: floatingEffect,
  strong: createFloatingEffect({ distance: 14, duration: 3.5 }),
} as const;
