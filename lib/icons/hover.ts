/**
 * Icon hover behavior — CSS + Framer Motion presets.
 */

import type { TargetAndTransition, Transition } from "framer-motion";

import { motionDuration, motionEase, motionScale } from "@/lib/motion";

import { iconColors } from "./colors";

export type IconHoverPreset = {
  /** CSS custom properties / class hooks for non-motion contexts */
  css: {
    color: string;
    transform: string;
    transition: string;
  };
  /** Spread onto motion wrappers around icons */
  motion: {
    whileHover: TargetAndTransition;
    whileTap?: TargetAndTransition;
    transition: Transition;
  };
};

const hoverTransition: Transition = {
  duration: motionDuration.fast,
  ease: motionEase.standard,
};

export const iconHoverPresets = {
  /** Color shift toward primary text — default interactive icons */
  tint: {
    css: {
      color: iconColors.primary,
      transform: "none",
      transition: `color ${motionDuration.fast}s cubic-bezier(${motionEase.standard.join(",")})`,
    },
    motion: {
      whileHover: { color: iconColors.primary },
      transition: hoverTransition,
    },
  },
  /** Subtle scale — toolbar / dense UI */
  scale: {
    css: {
      color: iconColors.current,
      transform: `scale(${motionScale.hover})`,
      transition: `transform ${motionDuration.fast}s cubic-bezier(${motionEase.standard.join(",")})`,
    },
    motion: {
      whileHover: { scale: motionScale.hover },
      whileTap: { scale: motionScale.press },
      transition: hoverTransition,
    },
  },
  /** Tint + scale — primary actions */
  emphasize: {
    css: {
      color: iconColors.primary,
      transform: `scale(${motionScale.hover})`,
      transition: [
        `color ${motionDuration.fast}s cubic-bezier(${motionEase.standard.join(",")})`,
        `transform ${motionDuration.fast}s cubic-bezier(${motionEase.standard.join(",")})`,
      ].join(", "),
    },
    motion: {
      whileHover: {
        color: iconColors.primary,
        scale: motionScale.hover,
      },
      whileTap: { scale: motionScale.press },
      transition: hoverTransition,
    },
  },
  /** No motion — static / decorative */
  none: {
    css: {
      color: iconColors.current,
      transform: "none",
      transition: "none",
    },
    motion: {
      whileHover: {},
      transition: { duration: 0 },
    },
  },
} as const satisfies Record<string, IconHoverPreset>;

export type IconHoverBehavior = keyof typeof iconHoverPresets;

/** Data-attribute contract for CSS-driven icon hover */
export const iconHoverDataAttr = "data-icon-hover" as const;
