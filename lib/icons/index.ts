/**
 * Mustex Digitals icon system — Lucide utilities only.
 *
 * @example
 * import { ArrowRight } from "lucide-react";
 * import { createIconProps, iconSizes } from "@/lib/icons";
 *
 * <ArrowRight {...createIconProps({ size: "ui", decorative: true })} />
 */

export { iconSizes, resolveIconSize } from "./sizes";
export type { IconSize } from "./sizes";

export {
  iconStrokeBySize,
  iconStrokes,
  resolveIconPixelSize,
  resolveIconStroke,
} from "./strokes";
export type { IconStroke } from "./strokes";

export { iconColors, resolveIconColor } from "./colors";
export type { IconColor } from "./colors";

export {
  iconStates,
  iconStateStyles,
  resolveIconStateStyle,
} from "./states";
export type { IconState, IconStateStyle } from "./states";

export {
  iconHoverDataAttr,
  iconHoverPresets,
} from "./hover";
export type { IconHoverBehavior, IconHoverPreset } from "./hover";

export { getIconA11yProps } from "./accessibility";
export type { IconA11yAttributes, IconA11yOptions } from "./accessibility";

export { createIconProps } from "./create-icon-props";
export type { CreateIconPropsOptions } from "./create-icon-props";

export type { IconPropsInput, ResolvedIconProps } from "./types";
