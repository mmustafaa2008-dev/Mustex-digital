"use client";

import { useEffect, useState } from "react";

export type UseNavbarStateOptions = {
  /** Pixels scrolled before navbar becomes "scrolled" */
  threshold?: number;
};

export type UseNavbarStateResult = {
  scrolled: boolean;
  scrollY: number;
  direction: "up" | "down" | "idle";
};

/**
 * Track scroll position for sticky / animated navbar behavior.
 * Only updates state when values actually change.
 */
export function useNavbarState(
  options: UseNavbarStateOptions = {},
): UseNavbarStateResult {
  const { threshold = 24 } = options;
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | "idle">("idle");

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const nextScrolled = y > threshold;

      setScrollY((prev) => (prev === y ? prev : y));
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      if (Math.abs(y - lastY) >= 4) {
        const nextDirection = y > lastY ? "down" : "up";
        setDirection((prev) =>
          prev === nextDirection ? prev : nextDirection,
        );
        lastY = y;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return { scrolled, scrollY, direction };
}
