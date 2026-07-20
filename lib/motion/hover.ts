import type { TargetAndTransition, Transition } from "framer-motion";

import { motionDistance, motionScale } from "./constants";
import { transitionPresets } from "./transitions";

type HoverPreset = {
  whileHover: TargetAndTransition;
  whileTap?: TargetAndTransition;
  transition?: Transition;
};

/** Lift on hover — cards, list rows, media */
export const hoverLift: HoverPreset = {
  whileHover: {
    y: -motionDistance.xs / 2,
    transition: transitionPresets.hover,
  },
  whileTap: {
    y: -1,
    transition: transitionPresets.hover,
  },
  transition: transitionPresets.hover,
};

/** Primary / secondary button press feel */
export const buttonHover: HoverPreset = {
  whileHover: {
    scale: motionScale.hover,
    transition: transitionPresets.springSnappy,
  },
  whileTap: {
    scale: motionScale.press,
    transition: transitionPresets.springSnappy,
  },
  transition: transitionPresets.springSnappy,
};

/** Card hover — subtle scale + lift + glow-friendly */
export const cardHover: HoverPreset = {
  whileHover: {
    y: -motionDistance.xs,
    scale: motionScale.card,
    transition: transitionPresets.springSoft,
  },
  whileTap: {
    scale: 1,
    y: 0,
    transition: transitionPresets.hover,
  },
  transition: transitionPresets.springSoft,
};

export const hoverPresets = {
  hoverLift,
  buttonHover,
  cardHover,
} as const;
