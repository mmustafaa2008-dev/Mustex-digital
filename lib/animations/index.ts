/**
 * Centralized animation system for Mustex Digitals.
 * Prefer importing from `@/lib/animations` for variants, transitions, and LazyMotion `m`.
 */

export {
  motionDistance,
  motionDuration,
  motionEase,
  motionScale,
  motionSpring,
} from "@/lib/motion/constants";
export type { MotionDuration, MotionEase } from "@/lib/motion/constants";

export { transitionPresets } from "@/lib/motion/transitions";
export type { TransitionPreset } from "@/lib/motion/transitions";

export {
  blurFade,
  createFadeVariant,
  directionalVariants,
  fade,
  fadeDown,
  fadeLeft,
  fadeRight,
  fadeUp,
  pageTransition,
  scale,
  sectionReveal,
  zoom,
} from "@/lib/motion/variants";

export { createStaggerVariants, staggerPresets } from "@/lib/motion/stagger";
export type { StaggerOptions } from "@/lib/motion/stagger";

export { buttonHover, cardHover, hoverLift, hoverPresets } from "@/lib/motion/hover";

export {
  createFloatingEffect,
  floatingEffect,
  floatingPresets,
} from "@/lib/motion/floating";
export type { FloatingOptions } from "@/lib/motion/floating";

export { motionPresets } from "@/lib/motion/presets";
export type { MotionPresetName } from "@/lib/motion/presets";

export {
  createParallaxConfig,
  getParallaxInputRange,
  getParallaxOutputRange,
  parallaxPresets,
} from "@/lib/motion/parallax";
export type {
  ParallaxConfig,
  ParallaxOptions,
  ParallaxTransformParams,
} from "@/lib/motion/parallax";

export {
  enableSmoothAnchorScrolling,
  smoothScrollPresets,
  smoothScrollTo,
} from "@/lib/motion/scroll";
export type { SmoothScrollOptions } from "@/lib/motion/scroll";

export { reducedMotionTransition, withReducedMotion } from "@/lib/motion/reduced-motion";

export {
  routeTransition,
  routeTransitionReduced,
  viewportOnce,
  viewportOnceLoose,
} from "./presets";
export type { ViewportOnceOptions } from "./presets";
