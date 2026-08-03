/**
 * Mustex Digitals motion system — Framer Motion presets & utilities.
 * No UI components; compose these into future motion.* elements.
 */

export {
  motionDistance,
  motionDuration,
  motionEase,
  motionScale,
  motionSpring,
} from "./constants";
export type { MotionDuration, MotionEase } from "./constants";

export { transitionPresets } from "./transitions";
export type { TransitionPreset } from "./transitions";

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
} from "./variants";

export { createStaggerVariants, staggerPresets } from "./stagger";
export type { StaggerOptions } from "./stagger";

export { buttonHover, cardHover, hoverLift, hoverPresets } from "./hover";

export {
  createFloatingEffect,
  floatingEffect,
  floatingPresets,
} from "./floating";
export type { FloatingOptions } from "./floating";

export { motionPresets } from "./presets";
export type { MotionPresetName } from "./presets";

export {
  createParallaxConfig,
  getParallaxInputRange,
  getParallaxOutputRange,
  parallaxPresets,
} from "./parallax";
export type {
  ParallaxConfig,
  ParallaxOptions,
  ParallaxTransformParams,
} from "./parallax";

export {
  enableSmoothAnchorScrolling,
  smoothScrollPresets,
  smoothScrollTo,
} from "./scroll";
export type { SmoothScrollOptions } from "./scroll";

export { reducedMotionTransition, withReducedMotion } from "./reduced-motion";
