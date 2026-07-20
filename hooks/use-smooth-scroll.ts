"use client";

import { useCallback, useEffect } from "react";

import {
  enableSmoothAnchorScrolling,
  smoothScrollPresets,
  smoothScrollTo,
  type SmoothScrollOptions,
} from "@/lib/motion";

export type UseSmoothScrollOptions = {
  /** Auto-bind in-page hash anchors */
  enableAnchors?: boolean;
  offset?: number;
  behavior?: ScrollBehavior;
};

/**
 * Smooth scroll utility hook.
 * - `scrollTo` programmatically scrolls to a target
 * - optionally intercepts hash anchor clicks
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const {
    enableAnchors = false,
    offset = smoothScrollPresets.withHeader.offset,
    behavior = "smooth",
  } = options;

  useEffect(() => {
    if (!enableAnchors) {
      return;
    }

    return enableSmoothAnchorScrolling({ offset, behavior });
  }, [enableAnchors, offset, behavior]);

  const scrollTo = useCallback(
    (
      target: SmoothScrollOptions["target"],
      overrides?: Omit<SmoothScrollOptions, "target">,
    ) => {
      return smoothScrollTo({
        target,
        offset,
        behavior,
        ...overrides,
      });
    },
    [offset, behavior],
  );

  return { scrollTo };
}
