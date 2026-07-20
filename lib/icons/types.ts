import type { LucideProps } from "lucide-react";

import type { IconA11yOptions } from "./accessibility";
import type { IconColor } from "./colors";
import type { IconHoverBehavior } from "./hover";
import type { IconSize } from "./sizes";
import type { IconState } from "./states";
import type { IconStroke } from "./strokes";

export type IconPropsInput = {
  size?: IconSize | number;
  stroke?: IconStroke | number;
  color?: IconColor | string;
  state?: IconState;
  hover?: IconHoverBehavior;
  className?: string;
  absoluteStrokeWidth?: boolean;
} & IconA11yOptions;

/** Normalized props ready to spread onto any Lucide icon */
export type ResolvedIconProps = Pick<
  LucideProps,
  | "size"
  | "strokeWidth"
  | "color"
  | "className"
  | "absoluteStrokeWidth"
  | "aria-hidden"
  | "aria-label"
  | "role"
  | "focusable"
> & {
  opacity?: number;
  title?: string;
  "data-icon-hover"?: IconHoverBehavior;
  "data-icon-state"?: IconState;
};
