import type { MotionValue } from "framer-motion";

export type ParallaxOptions = {
  /** Max translate in px (positive = moves opposite to scroll) */
  distance?: number;
  /** Scroll progress input range */
  inputRange?: [number, number];
  /** Output translate range — defaults to [-distance, distance] */
  outputRange?: [number, number];
};

export type ParallaxConfig = {
  inputRange: [number, number];
  outputRange: [number, number];
  distance: number;
};

/**
 * Build a parallax transform config for use with
 * `useScroll` + `useTransform(scrollYProgress, inputRange, outputRange)`.
 */
export function createParallaxConfig(
  options: ParallaxOptions = {},
): ParallaxConfig {
  const distance = options.distance ?? 80;
  const inputRange = options.inputRange ?? [0, 1];
  const outputRange = options.outputRange ?? [distance, -distance];

  return {
    distance,
    inputRange,
    outputRange,
  };
}

export const parallaxPresets = {
  subtle: createParallaxConfig({ distance: 40 }),
  default: createParallaxConfig({ distance: 80 }),
  strong: createParallaxConfig({ distance: 140 }),
  hero: createParallaxConfig({
    distance: 120,
    inputRange: [0, 1],
    outputRange: [0, -120],
  }),
} as const;

/**
 * Map a scroll progress MotionValue through a parallax config.
 * Pass the result of `useTransform` wiring from a hook.
 */
export type ParallaxTransformParams = {
  progress: MotionValue<number>;
  config?: ParallaxConfig;
};
