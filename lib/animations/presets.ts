import type { Transition, Variants } from "framer-motion";

import { motionDistance, motionDuration } from "@/lib/motion/constants";
import { transitionPresets } from "@/lib/motion/transitions";

/** Shared viewport config — animate once, lazy. */
export type ViewportOnceOptions = {
  once: true;
  amount: number;
  margin?: string;
};

export const viewportOnce: ViewportOnceOptions = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
};

export const viewportOnceLoose: ViewportOnceOptions = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -5% 0px",
};

/** App Router page enter/exit (~350–450ms). */
export const routeTransition: Variants = {
  initial: {
    opacity: 0,
    y: motionDistance.sm,
    scale: 0.992,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionDuration.slow,
      ease: transitionPresets.page.ease,
    } satisfies Transition,
  },
  exit: {
    opacity: 0,
    y: -motionDistance.xs,
    scale: 0.995,
    transition: {
      duration: motionDuration.fast,
      ease: transitionPresets.exit.ease,
    } satisfies Transition,
  },
};

export const routeTransitionReduced: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motionDuration.fastest },
  },
  exit: {
    opacity: 0,
    transition: { duration: motionDuration.fastest },
  },
};
