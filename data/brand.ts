/**
 * Official Mustex Digital brand lockup copy.
 * Visual mark lives at `/public/logo.png` (uploaded asset — do not redesign).
 */
export const brand = {
  /** Accessible / legal name */
  name: "Mustex Digital",
  /** Stacked wordmark lines */
  wordmark: {
    primary: "MUSTEX",
    secondary: "DIGITAL",
    /** Accent letter index in primary (0-based) — final “X” */
    primaryAccentIndex: 5,
  },
  slogan: "Building Software That Scales",
  /** Accent word in slogan (case-sensitive match) */
  sloganAccent: "Scales",
  logoSrc: "/logo.png",
  logoAlt: "Mustex Digital",
} as const;

export type BrandContent = typeof brand;
