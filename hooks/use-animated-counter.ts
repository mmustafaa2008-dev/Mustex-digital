"use client";

import { useEffect, useState } from "react";

export type ParsedStatValue = {
  /** Numeric target when the value can animate */
  numeric: number | null;
  prefix: string;
  suffix: string;
  raw: string;
};

/**
 * Parse display strings like `100%`, `15+`, or non-numeric labels.
 */
export function parseStatValue(value: string): ParsedStatValue {
  const match = value.trim().match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { numeric: null, prefix: "", suffix: "", raw: value };
  }

  const [, prefix, numberPart, suffix] = match;
  const numeric = Number(numberPart);

  if (Number.isNaN(numeric)) {
    return { numeric: null, prefix: "", suffix: "", raw: value };
  }

  return {
    numeric,
    prefix,
    suffix,
    raw: value,
  };
}

export type UseAnimatedCounterOptions = {
  /** When true, run the animation */
  active: boolean;
  /** Animation duration in ms */
  duration?: number;
  /** Skip animation (e.g. reduced motion) */
  reducedMotion?: boolean;
};

/**
 * Animate a numeric value from 0 → target when `active` becomes true.
 */
export function useAnimatedCounter(
  target: number | null,
  options: UseAnimatedCounterOptions,
): number | null {
  const { active, duration = 1400, reducedMotion = false } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null) {
      setValue(0);
      return;
    }

    if (!active) {
      setValue(0);
      return;
    }

    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Smooth ease-out quint — premium counter feel
      const eased = 1 - (1 - progress) ** 5;
      setValue(target * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, reducedMotion, target]);

  if (target === null) return null;
  return value;
}
