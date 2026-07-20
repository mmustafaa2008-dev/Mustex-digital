/**
 * Numeric motion constants for Framer Motion.
 * Derived from design-token durations / curves.
 */

import { motionCurves } from "@/lib/design-tokens";

/** Durations in seconds (Framer Motion unit) */
export const motionDuration = {
  instant: 0,
  fastest: 0.1,
  faster: 0.15,
  fast: 0.2,
  normal: 0.3,
  slow: 0.45,
  slower: 0.6,
  slowest: 0.8,
} as const;

export const motionEase = {
  standard: motionCurves.standard,
  emphasized: motionCurves.emphasized,
  entrance: motionCurves.entrance,
  exit: motionCurves.exit,
  soft: motionCurves.soft,
  spring: motionCurves.spring,
} as const;

export const motionDistance = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 40,
  xl: 64,
} as const;

export const motionScale = {
  zoomIn: 0.94,
  zoomOut: 1.06,
  hover: 1.02,
  press: 0.98,
  card: 1.015,
} as const;

export const motionSpring = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  soft: { type: "spring" as const, stiffness: 260, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 180, damping: 24 },
  float: { type: "spring" as const, stiffness: 120, damping: 18 },
};

export type MotionDuration = keyof typeof motionDuration;
export type MotionEase = keyof typeof motionEase;
