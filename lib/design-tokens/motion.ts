/**
 * Motion tokens — intentional presence, reduced-motion aware.
 * Naming: durations.{speed} | easings.{intent} | transitions.{property}
 */

export const durations = {
  instant: "0ms",
  fastest: "100ms",
  faster: "150ms",
  fast: "200ms",
  normal: "300ms",
  slow: "450ms",
  slower: "600ms",
  slowest: "800ms",
} as const;

export const easings = {
  linear: "linear",
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  emphasized: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
  soft: "cubic-bezier(0.22, 1, 0.36, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

/** Framer Motion-friendly curve arrays (mirrors easings) */
export const motionCurves = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.05, 0.7, 0.1, 1] as const,
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const transitions = {
  color: `color ${durations.fast} ${easings.standard}`,
  opacity: `opacity ${durations.normal} ${easings.soft}`,
  transform: `transform ${durations.normal} ${easings.entrance}`,
  shadow: `box-shadow ${durations.normal} ${easings.soft}`,
  border: `border-color ${durations.fast} ${easings.standard}`,
  glow: `box-shadow ${durations.slow} ${easings.soft}, background-color ${durations.fast} ${easings.standard}`,
  interactive: [
    `color ${durations.fast} ${easings.standard}`,
    `background-color ${durations.fast} ${easings.standard}`,
    `border-color ${durations.fast} ${easings.standard}`,
    `box-shadow ${durations.normal} ${easings.soft}`,
    `transform ${durations.fast} ${easings.entrance}`,
  ].join(", "),
} as const;

/** Reduced-motion fallbacks — durations collapse; transforms disable */
export const reducedMotion = {
  duration: durations.instant,
  transition: "none",
  transform: "none",
} as const;

export type DurationTokens = typeof durations;
export type EasingTokens = typeof easings;
