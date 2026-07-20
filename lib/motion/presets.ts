import type { MotionProps, Variants } from "framer-motion";

import { buttonHover, cardHover, hoverLift } from "./hover";
import { floatingEffect, floatingPresets } from "./floating";
import { staggerPresets } from "./stagger";
import {
  fade,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeUp,
  pageTransition,
  scale,
  sectionReveal,
  zoom,
} from "./variants";

type ViewportPreset = NonNullable<MotionProps["viewport"]>;

const defaultViewport: ViewportPreset = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -8% 0px",
};

function createInViewPreset(variants: Variants): MotionProps {
  return {
    initial: "hidden",
    whileInView: "visible",
    exit: "exit",
    variants,
    viewport: defaultViewport,
  };
}

/**
 * Ready-to-spread Framer Motion props.
 * Example: <motion.div {...motionPresets.fadeUp} />
 */
export const motionPresets = {
  fadeUp: createInViewPreset(fadeUp),
  fadeDown: createInViewPreset(fadeDown),
  fadeLeft: createInViewPreset(fadeLeft),
  fadeRight: createInViewPreset(fadeRight),
  fade: createInViewPreset(fade),
  zoom: createInViewPreset(zoom),
  scale: createInViewPreset(scale),

  sectionReveal: {
    ...createInViewPreset(sectionReveal),
    viewport: {
      once: true,
      amount: 0.2,
      margin: "0px 0px -10% 0px",
    },
  } satisfies MotionProps,

  pageTransition: {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants: pageTransition,
  } satisfies MotionProps,

  stagger: {
    container: {
      initial: "hidden",
      whileInView: "visible",
      exit: "exit",
      variants: staggerPresets.default.container,
      viewport: defaultViewport,
    } satisfies MotionProps,
    item: {
      variants: staggerPresets.default.item,
    } satisfies MotionProps,
  },

  hoverLift: {
    ...hoverLift,
  } satisfies MotionProps,

  buttonHover: {
    ...buttonHover,
  } satisfies MotionProps,

  cardHover: {
    ...cardHover,
  } satisfies MotionProps,

  floating: {
    ...floatingEffect,
  } satisfies MotionProps,

  floatingSubtle: {
    ...floatingPresets.subtle,
  } satisfies MotionProps,

  floatingStrong: {
    ...floatingPresets.strong,
  } satisfies MotionProps,
} as const;

export type MotionPresetName = keyof typeof motionPresets;
