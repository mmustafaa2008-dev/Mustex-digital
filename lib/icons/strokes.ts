/**
 * Standardized Lucide stroke widths.
 * Thinner strokes at larger sizes keep optical weight even.
 */

import type { IconSize } from "./sizes";
import { resolveIconSize } from "./sizes";

export const iconStrokes = {
  thin: 1.25,
  regular: 1.5,
  medium: 1.75,
  bold: 2,
} as const;

export type IconStroke = keyof typeof iconStrokes;

/** Default stroke by size — larger icons use slightly thinner relative weight */
export const iconStrokeBySize: Record<IconSize, number> = {
  xs: iconStrokes.medium,
  sm: iconStrokes.regular,
  md: iconStrokes.regular,
  lg: iconStrokes.regular,
  xl: iconStrokes.thin,
  "2xl": iconStrokes.thin,
  inline: iconStrokes.regular,
  ui: iconStrokes.regular,
  feature: iconStrokes.regular,
  display: iconStrokes.thin,
};

export function resolveIconStroke(
  stroke?: IconStroke | number,
  size: IconSize | number = "md",
): number {
  if (typeof stroke === "number") {
    return stroke;
  }

  if (stroke) {
    return iconStrokes[stroke];
  }

  if (typeof size === "number") {
    if (size >= 28) return iconStrokes.thin;
    if (size <= 14) return iconStrokes.medium;
    return iconStrokes.regular;
  }

  return iconStrokeBySize[size] ?? iconStrokes.regular;
}

export function resolveIconPixelSize(size: IconSize | number = "md"): number {
  return resolveIconSize(size);
}
