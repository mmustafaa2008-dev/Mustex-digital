"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { smoothScrollTo } from "@/lib/motion";

import { parseNavHref } from "./nav-anchors";

const NAVBAR_OFFSET = 88;

/**
 * Resolve nav clicks: hash targets smooth-scroll on the homepage;
 * otherwise navigate via the App Router (future routes).
 */
export function useNavNavigate() {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (href: string, event?: { preventDefault: () => void }) => {
      const { pathname: targetPath, hash } = parseNavHref(href);

      if (!hash) {
        return false;
      }

      event?.preventDefault();

      if (pathname === targetPath) {
        const scrolled = smoothScrollTo({
          target: hash,
          offset: NAVBAR_OFFSET,
          behavior: "smooth",
        });

        if (scrolled && history.pushState) {
          history.pushState(null, "", `#${hash}`);
          window.dispatchEvent(new Event("hashchange"));
        }

        return true;
      }

      router.push(`${targetPath}#${hash}`);
      return true;
    },
    [pathname, router],
  );
}
