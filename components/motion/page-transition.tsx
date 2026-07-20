"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { routeTransition, routeTransitionReduced } from "@/lib/animations";

import { m } from "./m";

export type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Soft route enter animation for App Router `template.tsx`.
 * Duration ~350–450ms; respects reduced motion.
 */
function PageTransition({ children, className }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? routeTransitionReduced
    : routeTransition;

  return (
    <m.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </m.div>
  );
}

export { PageTransition };
