"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Enables smooth in-page hash scrolling with sticky-header offset.
 * Respects prefers-reduced-motion via instant behavior.
 */
function SmoothScrollAnchors() {
  const reduceMotion = usePrefersReducedMotion();

  useSmoothScroll({
    enableAnchors: true,
    offset: 80,
    behavior: reduceMotion ? "auto" : "smooth",
  });

  return null;
}

export { SmoothScrollAnchors };
