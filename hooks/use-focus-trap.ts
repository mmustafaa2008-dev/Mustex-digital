"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.tabIndex !== -1,
  );
}

export type UseFocusTrapOptions = {
  /** When true, trap focus inside the container */
  active: boolean;
  /** Restore focus to the previously focused element on deactivate */
  restoreFocus?: boolean;
};

/**
 * Trap keyboard focus within a container while `active`.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: UseFocusTrapOptions,
) {
  const { active, restoreFocus = true } = options;
  const containerRef = useRef<T | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusables = getFocusableElements(container);
    const initial = focusables[0] ?? container;
    initial.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const elements = getFocusableElements(container);
      if (!elements.length) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (current === first || !container.contains(current)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      if (restoreFocus) {
        previousFocusRef.current?.focus?.();
      }
    };
  }, [active, restoreFocus]);

  return containerRef;
}
