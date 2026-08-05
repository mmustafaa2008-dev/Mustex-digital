import { cn } from "@/lib/utils";

import { getIconA11yProps } from "./accessibility";
import { resolveIconColor } from "./colors";
import { iconHoverDataAttr, type IconHoverBehavior } from "./hover";
import { resolveIconSize } from "./sizes";
import { resolveIconStateStyle, type IconState } from "./states";
import { resolveIconStroke } from "./strokes";
import type { IconPropsInput, ResolvedIconProps } from "./types";

export type CreateIconPropsOptions = IconPropsInput;

/**
 * Compose standardized Lucide props from the icon system.
 *
 * @example
 * import { ArrowRight } from "lucide-react";
 * import { createIconProps } from "@/lib/icons";
 *
 * <ArrowRight {...createIconProps({ size: "md", state: "default", decorative: true })} />
 * <ArrowRight {...createIconProps({ size: "lg", label: "Continue", hover: "emphasize" })} />
 */
export function createIconProps(
  options: CreateIconPropsOptions = {},
): ResolvedIconProps {
  const {
    size = "md",
    stroke,
    color,
    state = "default",
    hover = "none",
    className,
    absoluteStrokeWidth = false,
    decorative,
    label,
    description,
  } = options;

  const stateStyle = resolveIconStateStyle(state as IconState);
  const resolvedSize = resolveIconSize(size);
  const resolvedStroke = stroke
    ? resolveIconStroke(stroke, size)
    : state !== "default"
      ? stateStyle.strokeWidth
      : resolveIconStroke(undefined, size);

  const resolvedColor = color
    ? resolveIconColor(color)
    : state !== "default"
      ? stateStyle.color
      : resolveIconColor("current");

  const a11y = getIconA11yProps({ decorative, label, description });

  return {
    size: resolvedSize,
    strokeWidth: resolvedStroke,
    color: resolvedColor,
    opacity: stateStyle.opacity,
    absoluteStrokeWidth,
    className: cn("mustex-icon shrink-0", className),
    [iconHoverDataAttr]: hover as IconHoverBehavior,
    "data-icon-state": state,
    ...a11y,
  };
}
