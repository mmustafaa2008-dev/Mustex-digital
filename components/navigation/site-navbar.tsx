"use client";

import { memo, useMemo } from "react";

import { navigation } from "@/data/navigation";
import { toNavbarProps } from "@/lib/content";

import { Logo } from "./logo";
import { AnimatedNavbar } from "./navbar";

export type SiteNavbarProps = {
  className?: string;
  showSearch?: boolean;
  showThemeSwitch?: boolean;
};

/**
 * Mustex Digitals enterprise navbar — wired to `navigation.ts`.
 */
function SiteNavbarComponent({
  className,
  showSearch = false,
  showThemeSwitch = false,
}: SiteNavbarProps) {
  const navProps = useMemo(() => toNavbarProps(navigation), []);

  return (
    <AnimatedNavbar
      brand={<Logo href="/" showSlogan={false} />}
      items={navProps.items}
      cta={navProps.cta}
      labels={navProps.labels}
      showSearch={showSearch}
      showThemeSwitch={showThemeSwitch}
      className={className}
    />
  );
}

const SiteNavbar = memo(SiteNavbarComponent);

export { SiteNavbar };
