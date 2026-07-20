import type { ReactNode } from "react";

import { SiteAtmosphere } from "@/components/effects/site-atmosphere";
import { SmoothScrollAnchors } from "@/components/effects/smooth-scroll-anchors";
import { SiteFooter } from "@/components/footer";
import { MotionProvider } from "@/components/motion/provider";
import { SiteNavbar } from "@/components/navigation";

/**
 * Shared chrome for all marketing routes — sticky navbar + footer.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SiteAtmosphere />
      <SmoothScrollAnchors />
      <div className="relative z-10">
        <SiteNavbar />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </div>
    </MotionProvider>
  );
}
