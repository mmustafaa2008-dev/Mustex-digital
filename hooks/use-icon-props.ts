"use client";

import { useMemo } from "react";

import {
  createIconProps,
  type CreateIconPropsOptions,
  type ResolvedIconProps,
} from "@/lib/icons";

/**
 * Memoized Lucide props from the icon system.
 */
export function useIconProps(
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

  return useMemo(
    () =>
      createIconProps({
        size,
        stroke,
        color,
        state,
        hover,
        className,
        absoluteStrokeWidth,
        decorative,
        label,
        description,
      }),
    [
      size,
      stroke,
      color,
      state,
      hover,
      className,
      absoluteStrokeWidth,
      decorative,
      label,
      description,
    ],
  );
}
