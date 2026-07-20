/**
 * Container widths — fluid premium layout rails.
 */

export const containers = {
  xs: "20rem", // 320px
  sm: "24rem", // 384px
  md: "28rem", // 448px
  lg: "32rem", // 512px
  xl: "36rem", // 576px
  "2xl": "42rem", // 672px
  "3xl": "48rem", // 768px
  "4xl": "56rem", // 896px
  "5xl": "64rem", // 1024px
  "6xl": "72rem", // 1152px
  "7xl": "80rem", // 1280px — primary content max
  prose: "40rem", // 640px — long-form reading
  full: "100%",
} as const;

export type ContainerTokens = typeof containers;
