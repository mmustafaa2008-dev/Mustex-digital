/**
 * Official Mustex Digitals brand lockup copy.
 * Visual mark lives at `/public/logo.png` (uploaded asset — do not redesign).
 */
export const brand = {
  /** Accessible / legal name */
  name: "Mustex Digitals",
  /** Stacked wordmark lines */
  wordmark: {
    primary: "MUSTEX",
    secondary: "DIGITALS",
    /** Accent letter index in primary (0-based) — final “X” */
    primaryAccentIndex: 5,
  },
  slogan: "We build brands. We grow businesses.",
  /** Accent word in slogan (case-sensitive match) */
  sloganAccent: "Scales",
  logoSrc: "/logo.png",
  logoAlt: "Mustex Digitals",
  /** Navbar mark — 52–56px desktop, scales down on mobile */
  logoDisplaySize: 54,
  logoDisplaySizeMobile: 48,
} as const;

export type BrandContent = typeof brand;
