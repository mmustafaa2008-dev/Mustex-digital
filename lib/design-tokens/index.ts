/**
 * Mustex Digitals design tokens — single source of truth.
 * CSS mirrors live in styles/tokens.css for Tailwind / runtime styling.
 *
 * Naming conventions:
 * - Scales: none | xs | sm | md | lg | xl | 2xl | 3xl …
 * - Color roles: DEFAULT | foreground | text | soft | muted | …
 * - Elevation: 0–4 (canvas → modal)
 */

export { colors } from "./colors";
export type { ColorTokens } from "./colors";

export { typography, fontFamilies, fontWeights } from "./typography";
export type { TypographyTokens } from "./typography";

export { spacing, spacingUnit } from "./spacing";
export type { SpacingTokens } from "./spacing";

export { radius } from "./radius";
export type { RadiusTokens } from "./radius";

export { shadows } from "./shadows";
export type { ShadowTokens } from "./shadows";

export { elevation } from "./elevation";
export type { ElevationLevel, ElevationTokens } from "./elevation";

export { blur } from "./blur";
export type { BlurTokens } from "./blur";

export { containers } from "./containers";
export type { ContainerTokens } from "./containers";

export { breakpoints, breakpointQueries } from "./breakpoints";
export type { Breakpoint } from "./breakpoints";

export {
  durations,
  easings,
  motionCurves,
  transitions,
  reducedMotion,
} from "./motion";
export type { DurationTokens, EasingTokens } from "./motion";

export { gradients } from "./gradients";
export type { GradientTokens } from "./gradients";

export { glass } from "./glass";
export type { GlassTokens } from "./glass";

export { contrastPairs, a11yRules } from "./accessibility";
export type { ContrastPairs } from "./accessibility";

import { a11yRules, contrastPairs } from "./accessibility";
import { blur } from "./blur";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { containers } from "./containers";
import { elevation } from "./elevation";
import { glass } from "./glass";
import { gradients } from "./gradients";
import {
  durations,
  easings,
  motionCurves,
  reducedMotion,
  transitions,
} from "./motion";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing, spacingUnit } from "./spacing";
import { fontFamilies, fontWeights, typography } from "./typography";

export const designTokens = {
  colors,
  typography,
  fontFamilies,
  fontWeights,
  spacing,
  spacingUnit,
  radius,
  shadows,
  elevation,
  blur,
  containers,
  breakpoints,
  durations,
  easings,
  motionCurves,
  transitions,
  reducedMotion,
  gradients,
  glass,
  contrastPairs,
  a11yRules,
} as const;

export type DesignTokens = typeof designTokens;
