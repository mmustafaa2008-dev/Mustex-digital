import type { Variants } from "framer-motion";

import { motionDistance, motionDuration, motionScale } from "./constants";
import { transitionPresets } from "./transitions";

type Direction = "up" | "down" | "left" | "right";

const axisOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: motionDistance.md },
  down: { y: -motionDistance.md },
  left: { x: motionDistance.md },
  right: { x: -motionDistance.md },
};

function createFadeDirectional(
  direction: Direction,
  distance: number = motionDistance.md,
): Variants {
  const offset =
    direction === "up" || direction === "down"
      ? { y: direction === "up" ? distance : -distance }
      : { x: direction === "left" ? distance : -distance };

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: transitionPresets.entrance,
    },
    exit: {
      opacity: 0,
      ...axisOffset[direction],
      transition: transitionPresets.exit,
    },
  };
}

/** Fade + translate presets */
export const fadeUp = createFadeDirectional("up");
export const fadeDown = createFadeDirectional("down");
export const fadeLeft = createFadeDirectional("left");
export const fadeRight = createFadeDirectional("right");

export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionPresets.soft,
  },
  exit: {
    opacity: 0,
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Zoom: opacity + scale from smaller */
export const zoom = {
  hidden: {
    opacity: 0,
    scale: motionScale.zoomIn,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionPresets.emphasized,
  },
  exit: {
    opacity: 0,
    scale: motionScale.zoomIn,
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Scale: emphasis without heavy opacity loss */
export const scale = {
  hidden: {
    opacity: 0.0,
    scale: motionScale.press,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionPresets.springSoft,
  },
  exit: {
    opacity: 0,
    scale: motionScale.press,
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Section reveal — fade + subtle lift + light blur (once per section) */
export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: motionDistance.md,
    filter: "blur(4px)",
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      ...transitionPresets.section,
      duration: motionDuration.slow,
    },
  },
  exit: {
    opacity: 0,
    y: motionDistance.xs,
    filter: "blur(2px)",
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Soft blur fade — for headers / hero copy */
export const blurFade = {
  hidden: {
    opacity: 0,
    y: motionDistance.sm,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionPresets.entrance,
  },
  exit: {
    opacity: 0,
    filter: "blur(2px)",
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Page transition variants */
export const pageTransition = {
  initial: {
    opacity: 0,
    y: motionDistance.sm,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionPresets.page,
  },
  exit: {
    opacity: 0,
    y: -motionDistance.xs,
    transition: transitionPresets.exit,
  },
} satisfies Variants;

/** Factory for custom fade distance */
export function createFadeVariant(
  direction: Direction,
  distance: number = motionDistance.md,
): Variants {
  return createFadeDirectional(direction, distance);
}

export const directionalVariants = {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  fade,
  zoom,
  scale,
  sectionReveal,
  blurFade,
  pageTransition,
} as const;
