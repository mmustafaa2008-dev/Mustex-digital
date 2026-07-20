/**
 * Icon accessibility helpers — decorative vs meaningful.
 */

export type IconA11yOptions = {
  /**
   * When true, icon is purely decorative.
   * Sets aria-hidden and omits accessible name.
   */
  decorative?: boolean;
  /** Required when decorative is false */
  label?: string;
  /** Optional longer description */
  description?: string;
};

export type IconA11yAttributes = {
  "aria-hidden"?: boolean | "true" | "false";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  role?: "img";
  focusable?: "false" | boolean;
  title?: string;
};

/**
 * Build ARIA attributes for a Lucide icon.
 * Meaningful icons must receive a non-empty `label`.
 */
export function getIconA11yProps(
  options: IconA11yOptions = { decorative: true },
): IconA11yAttributes {
  const { decorative = !options.label, label, description } = options;

  if (decorative) {
    return {
      "aria-hidden": true,
      focusable: false,
    };
  }

  if (!label?.trim()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[icons] Meaningful icons require a non-empty `label` for accessibility.",
      );
    }

    return {
      "aria-hidden": true,
      focusable: false,
    };
  }

  return {
    role: "img",
    "aria-label": label.trim(),
    focusable: false,
    ...(description ? { title: description } : {}),
  };
}

/**
 * Whether an icon should announce to assistive tech.
 */
export function isMeaningfulIcon(options: IconA11yOptions): boolean {
  return Boolean(options.label?.trim()) && options.decorative !== true;
}
