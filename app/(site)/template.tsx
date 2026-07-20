"use client";

import type { ReactNode } from "react";

import { PageTransition } from "@/components/motion/page-transition";

/**
 * Remounts on navigation so enter transitions run once per route.
 */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
