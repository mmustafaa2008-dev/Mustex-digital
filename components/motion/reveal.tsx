"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import {
  createStaggerVariants,
  fadeUp,
  sectionReveal,
  viewportOnce,
  viewportOnceLoose,
  withReducedMotion,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Viewport amount before reveal triggers */
  amount?: number;
  delay?: number;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "whileInView" | "variants"
>;

/**
 * One-shot scroll reveal — fade + slide + blur. Lazy via whileInView.
 */
function Reveal({
  children,
  className,
  amount = viewportOnce.amount,
  delay = 0,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = withReducedMotion(sectionReveal, prefersReducedMotion);

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: viewportOnce.margin }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  staggerChildren?: number;
  delayChildren?: number;
};

/**
 * Staggered children reveal — parent + item variants for lists/grids.
 */
function StaggerReveal({
  children,
  className,
  amount = viewportOnceLoose.amount,
  staggerChildren = 0.08,
  delayChildren = 0.06,
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const stagger = createStaggerVariants({
    staggerChildren,
    delayChildren,
    childVariants: fadeUp,
  });

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: viewportOnceLoose.margin }}
      variants={withReducedMotion(stagger.container, prefersReducedMotion)}
    >
      {children}
    </motion.div>
  );
}

/** Child item for StaggerReveal */
function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={withReducedMotion(fadeUp, prefersReducedMotion)}
    >
      {children}
    </motion.div>
  );
}

export { Reveal, StaggerItem, StaggerReveal };
