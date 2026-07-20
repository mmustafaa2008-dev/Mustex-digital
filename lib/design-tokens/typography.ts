/**
 * Typography tokens — Geist-first, 4px-aligned modular scale.
 *
 * Roles: display → heading → body → caption
 * Line-height roles: display 1.1 | heading 1.25 | body 1.6 | caption 1.4
 */

export const fontFamilies = {
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, monospace",
  heading: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

export const typography = {
  display: {
    "2xl": {
      fontFamily: fontFamilies.heading,
      fontSize: "4.5rem", // 72px
      fontWeight: fontWeights.extrabold,
      lineHeight: "1.1",
      letterSpacing: "-0.04em",
    },
    xl: {
      fontFamily: fontFamilies.heading,
      fontSize: "3.75rem", // 60px
      fontWeight: fontWeights.extrabold,
      lineHeight: "1.1",
      letterSpacing: "-0.03em",
    },
    lg: {
      fontFamily: fontFamilies.heading,
      fontSize: "3rem", // 48px
      fontWeight: fontWeights.bold,
      lineHeight: "1.1",
      letterSpacing: "-0.02em",
    },
    md: {
      fontFamily: fontFamilies.heading,
      fontSize: "2.5rem", // 40px
      fontWeight: fontWeights.bold,
      lineHeight: "1.15",
      letterSpacing: "-0.02em",
    },
  },
  heading: {
    xl: {
      fontFamily: fontFamilies.heading,
      fontSize: "2rem", // 32px
      fontWeight: fontWeights.semibold,
      lineHeight: "1.25",
      letterSpacing: "-0.02em",
    },
    lg: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.75rem", // 28px — 4px grid
      fontWeight: fontWeights.semibold,
      lineHeight: "1.25",
      letterSpacing: "-0.015em",
    },
    md: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.5rem", // 24px
      fontWeight: fontWeights.semibold,
      lineHeight: "1.3",
      letterSpacing: "-0.01em",
    },
    sm: {
      fontFamily: fontFamilies.heading,
      fontSize: "1.25rem", // 20px
      fontWeight: fontWeights.semibold,
      lineHeight: "1.35",
      letterSpacing: "-0.01em",
    },
  },
  body: {
    lg: {
      fontFamily: fontFamilies.sans,
      fontSize: "1.125rem", // 18px — large text threshold
      fontWeight: fontWeights.regular,
      lineHeight: "1.6",
      letterSpacing: "0",
    },
    md: {
      fontFamily: fontFamilies.sans,
      fontSize: "1rem", // 16px
      fontWeight: fontWeights.regular,
      lineHeight: "1.6",
      letterSpacing: "0",
    },
    sm: {
      fontFamily: fontFamilies.sans,
      fontSize: "0.875rem", // 14px
      fontWeight: fontWeights.regular,
      lineHeight: "1.6",
      letterSpacing: "0",
    },
  },
  caption: {
    md: {
      fontFamily: fontFamilies.sans,
      fontSize: "0.875rem", // 14px
      fontWeight: fontWeights.medium,
      lineHeight: "1.4",
      letterSpacing: "0.04em",
      textTransform: "uppercase" as const,
    },
    sm: {
      fontFamily: fontFamilies.sans,
      fontSize: "0.75rem", // 12px
      fontWeight: fontWeights.medium,
      lineHeight: "1.4",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
    mono: {
      fontFamily: fontFamilies.mono,
      fontSize: "0.75rem", // 12px — aligned to caption.sm
      fontWeight: fontWeights.regular,
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
} as const;

export type TypographyTokens = typeof typography;
