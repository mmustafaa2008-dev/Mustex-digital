"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Boolean preference for reduced motion.
 * Returns `true` when the user requests reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  return Boolean(useReducedMotion());
}
