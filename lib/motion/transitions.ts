import type { Transition } from "framer-motion";

import { motionDuration, motionEase, motionSpring } from "./constants";

export const transitionPresets = {
  entrance: {
    duration: motionDuration.slow,
    ease: motionEase.entrance,
  } satisfies Transition,

  exit: {
    duration: motionDuration.fast,
    ease: motionEase.exit,
  } satisfies Transition,

  standard: {
    duration: motionDuration.normal,
    ease: motionEase.standard,
  } satisfies Transition,

  soft: {
    duration: motionDuration.normal,
    ease: motionEase.soft,
  } satisfies Transition,

  emphasized: {
    duration: motionDuration.slow,
    ease: motionEase.emphasized,
  } satisfies Transition,

  hover: {
    duration: motionDuration.fast,
    ease: motionEase.standard,
  } satisfies Transition,

  page: {
    duration: motionDuration.slower,
    ease: motionEase.entrance,
  } satisfies Transition,

  section: {
    duration: motionDuration.slow,
    ease: motionEase.entrance,
  } satisfies Transition,

  float: {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "mirror",
  } satisfies Transition,

  springSnappy: motionSpring.snappy,
  springSoft: motionSpring.soft,
  springGentle: motionSpring.gentle,
  springFloat: motionSpring.float,
} as const;

export type TransitionPreset = keyof typeof transitionPresets;
