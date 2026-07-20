"use client";

import {
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useRef, type RefObject } from "react";

import {
  createParallaxConfig,
  parallaxPresets,
  type ParallaxConfig,
  type ParallaxOptions,
} from "@/lib/motion";

export type UseParallaxOptions = ParallaxOptions & {
  /** Scroll tracking options forwarded to Framer `useScroll` */
  scroll?: UseScrollOptions;
  /** Use a named parallax preset */
  preset?: keyof typeof parallaxPresets;
};

export type UseParallaxResult = {
  ref: RefObject<HTMLElement | null>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  config: ParallaxConfig;
};

/**
 * Parallax utility hook — bind `ref` to a section and `y` to motion style.
 *
 * @example
 * const { ref, y } = useParallax({ preset: "subtle" });
 * <motion.section ref={ref} style={{ y }} />
 */
export function useParallax(
  options: UseParallaxOptions = {},
): UseParallaxResult {
  const ref = useRef<HTMLElement | null>(null);
  const { preset, scroll, ...parallaxOptions } = options;

  const config = preset
    ? parallaxPresets[preset]
    : createParallaxConfig(parallaxOptions);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    ...scroll,
  });

  const y = useTransform(
    scrollYProgress,
    config.inputRange,
    config.outputRange,
  );

  return {
    ref,
    y,
    scrollYProgress,
    config,
  };
}
