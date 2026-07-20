/**
 * Icon interaction / semantic states.
 */

import { iconColors, type IconColor } from "./colors";
import { iconStrokes, type IconStroke } from "./strokes";

export const iconStates = [
  "default",
  "hover",
  "active",
  "focus",
  "disabled",
  "muted",
  "success",
  "warning",
  "error",
] as const;

export type IconState = (typeof iconStates)[number];

export type IconStateStyle = {
  color: IconColor;
  stroke: IconStroke;
  opacity: number;
};

export const iconStateStyles: Record<IconState, IconStateStyle> = {
  default: {
    color: "current",
    stroke: "regular",
    opacity: 1,
  },
  hover: {
    color: "primary",
    stroke: "regular",
    opacity: 1,
  },
  active: {
    color: "primary",
    stroke: "medium",
    opacity: 1,
  },
  focus: {
    color: "primary",
    stroke: "regular",
    opacity: 1,
  },
  disabled: {
    color: "muted",
    stroke: "regular",
    opacity: 0.4,
  },
  muted: {
    color: "muted",
    stroke: "regular",
    opacity: 0.85,
  },
  success: {
    color: "success",
    stroke: "regular",
    opacity: 1,
  },
  warning: {
    color: "warning",
    stroke: "regular",
    opacity: 1,
  },
  error: {
    color: "error",
    stroke: "regular",
    opacity: 1,
  },
};

export function resolveIconStateStyle(state: IconState = "default"): {
  color: string;
  strokeWidth: number;
  opacity: number;
} {
  const style = iconStateStyles[state];

  return {
    color: iconColors[style.color],
    strokeWidth: iconStrokes[style.stroke],
    opacity: style.opacity,
  };
}
