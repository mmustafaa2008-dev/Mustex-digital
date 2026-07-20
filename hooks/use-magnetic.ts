"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useCallback, type MouseEvent, type RefObject } from "react";

export type UseMagneticResult = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
};

/**
 * Subtle magnetic pull toward the pointer — for premium CTAs.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.22,
): UseMagneticResult {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 22, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 260, damping: 22, mass: 0.35 });

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    },
    [prefersReducedMotion, rawX, rawY, ref, strength],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { x, y, onMouseMove, onMouseLeave };
}
