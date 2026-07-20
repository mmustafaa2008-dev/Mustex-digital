/**
 * Gradient library — decorative atmosphere; never sole text contrast.
 * Naming: camelCase intent (primarySheen, borderGlass, …)
 */

import { colors } from "./colors";

export const gradients = {
  primarySheen:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 55%)",
  primarySolid: `linear-gradient(180deg, #3B82F6 0%, ${colors.primary.DEFAULT} 100%)`,
  primaryGlow:
    "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.28) 0%, rgba(37, 99, 235, 0) 70%)",
  accentWash:
    "radial-gradient(ellipse at top, rgba(96, 165, 250, 0.18) 0%, rgba(5, 8, 22, 0) 60%)",
  surfaceFade:
    "linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(5, 8, 22, 0.88) 100%)",
  heroAtmosphere:
    "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37, 99, 235, 0.22) 0%, rgba(5, 8, 22, 0) 55%)",
  /** Decorative glass edge — pair with border.DEFAULT for interactive UI */
  borderGlass:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
  borderGlow:
    "linear-gradient(135deg, rgba(96, 165, 250, 0.65) 0%, rgba(255, 255, 255, 0.16) 45%, rgba(255, 255, 255, 0.06) 100%)",
  chartFill:
    "linear-gradient(180deg, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0) 100%)",
  fadeToBackground:
    "linear-gradient(180deg, rgba(5, 8, 22, 0) 0%, #050816 100%)",
  glassHighlight:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 40%)",
} as const;

export type GradientTokens = typeof gradients;
