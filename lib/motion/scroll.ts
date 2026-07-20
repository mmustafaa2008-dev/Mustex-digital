export type SmoothScrollOptions = {
  /** CSS selector, element, or hash id (with or without #) */
  target: string | Element;
  /** Scroll offset from top of target (e.g. sticky header) */
  offset?: number;
  behavior?: ScrollBehavior;
  /** Focus the target after scrolling for a11y */
  focus?: boolean;
};

function resolveTarget(target: string | Element): Element | null {
  if (typeof target !== "string") {
    return target;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const selector = target.startsWith("#") ? target : `#${target}`;
  return (
    document.querySelector(selector) ??
    document.getElementById(target.replace(/^#/, ""))
  );
}

/**
 * Smoothly scroll the window to a target element or hash.
 * Framework-agnostic utility — no React required.
 */
export function smoothScrollTo(options: SmoothScrollOptions): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const {
    target,
    offset = 0,
    behavior = "smooth",
    focus = true,
  } = options;

  const element = resolveTarget(target);
  if (!element) {
    return false;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior });

  if (focus && element instanceof HTMLElement) {
    const previousTabIndex = element.getAttribute("tabindex");
    if (previousTabIndex === null) {
      element.setAttribute("tabindex", "-1");
    }

    element.focus({ preventScroll: true });

    if (previousTabIndex === null) {
      element.addEventListener(
        "blur",
        () => {
          element.removeAttribute("tabindex");
        },
        { once: true },
      );
    }
  }

  return true;
}

/**
 * Intercept in-page hash links and route them through smoothScrollTo.
 * Returns a cleanup function.
 */
export function enableSmoothAnchorScrolling(options?: {
  offset?: number;
  behavior?: ScrollBehavior;
}): () => void {
  if (typeof document === "undefined") {
    return () => undefined;
  }

  const handleClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest?.(
      'a[href^="#"]',
    ) as HTMLAnchorElement | null;

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const exists = document.querySelector(href);
    if (!exists) {
      return;
    }

    event.preventDefault();
    smoothScrollTo({
      target: href,
      offset: options?.offset ?? 0,
      behavior: options?.behavior ?? "smooth",
    });

    if (history.pushState) {
      history.pushState(null, "", href);
    }
  };

  document.addEventListener("click", handleClick);
  return () => document.removeEventListener("click", handleClick);
}

export const smoothScrollPresets = {
  default: { offset: 0, behavior: "smooth" as const },
  withHeader: { offset: 80, behavior: "smooth" as const },
  instant: { offset: 0, behavior: "auto" as const },
} as const;
