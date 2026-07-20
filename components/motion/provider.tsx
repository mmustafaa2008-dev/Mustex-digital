"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide Framer Motion provider — LazyMotion + reduced-motion defaults.
 * `strict` is false so existing `motion.*` usage keeps working while new
 * code can adopt `m` from `@/components/motion/m` for smaller trees.
 */
function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export { MotionProvider };
