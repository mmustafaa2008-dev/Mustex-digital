"use client";

import type { MotionProps, Variants } from "framer-motion";
import { useMemo } from "react";

import {
  motionPresets,
  withReducedMotion,
  type MotionPresetName,
} from "@/lib/motion";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type VariantPresetName = Exclude<
  MotionPresetName,
  | "stagger"
  | "floating"
  | "floatingSubtle"
  | "floatingStrong"
  | "hoverLift"
  | "buttonHover"
  | "cardHover"
>;

/**
 * Resolve a named motion preset and adapt it for reduced motion.
 * Returns props ready to spread onto `motion.*` elements.
 */
export function useMotionPreset(name: VariantPresetName): MotionProps {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    const preset = motionPresets[name] as MotionProps;
    const variants = preset.variants;

    if (!variants) {
      return prefersReducedMotion
        ? { ...preset, whileHover: undefined, whileTap: undefined }
        : preset;
    }

    return {
      ...preset,
      variants: withReducedMotion(variants, prefersReducedMotion),
    };
  }, [name, prefersReducedMotion]);
}

/**
 * Adapt arbitrary variants for the user's motion preference.
 */
export function useAccessibleVariants(variants: Variants): Variants {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(
    () => withReducedMotion(variants, prefersReducedMotion),
    [variants, prefersReducedMotion],
  );
}
