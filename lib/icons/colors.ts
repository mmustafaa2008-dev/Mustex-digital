/**
 * Semantic icon colors — AA-safe roles from the design token palette.
 * Prefer `current` so icons inherit surrounding text color.
 */

import { colors } from "@/lib/design-tokens";

export const iconColors = {
  /** Inherit from parent text (preferred default) */
  current: "currentColor",
  default: colors.foreground.DEFAULT,
  subtle: colors.foreground.subtle,
  muted: colors.foreground.muted,
  primary: colors.primary.text,
  secondary: colors.secondary.text,
  accent: colors.accent.text,
  success: colors.success.text,
  warning: colors.warning.text,
  error: colors.error.text,
  /** Icons sitting on solid primary fills */
  onPrimary: colors.primary.foreground,
  inverse: colors.foreground.inverse,
} as const;

export type IconColor = keyof typeof iconColors;

export function resolveIconColor(color: IconColor | string = "current"): string {
  if (color in iconColors) {
    return iconColors[color as IconColor];
  }

  return color;
}
