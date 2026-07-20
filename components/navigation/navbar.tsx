"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { useNavbarState } from "@/hooks/use-navbar-state";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createStaggerVariants,
  fadeDown,
  transitionPresets,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavCta } from "./nav-cta";
import { NavSearch } from "./nav-search";
import { ThemeSwitch } from "./theme-switch";
import type { NavbarAppearance, NavbarPropsBase, NavItem } from "./types";

export type NavbarProps = NavbarPropsBase & {
  children?: ReactNode;
  /** Extra actions slot (right side, before mobile toggle) */
  actions?: ReactNode;
};

function resolveAppearance(
  appearance: NavbarAppearance,
  animated: boolean,
  scrolled: boolean,
): NavbarAppearance {
  if (!animated) return appearance;
  return scrolled ? "solid" : "transparent";
}

/**
 * Sticky glassmorphism site navbar shell.
 */
function Navbar({
  brand,
  items = [],
  cta,
  labels,
  appearance = "solid",
  sticky = true,
  animated = false,
  hideOnScroll = false,
  showSearch = false,
  showThemeSwitch = false,
  actions,
  className,
  children,
}: NavbarProps) {
  const { scrolled, direction } = useNavbarState({ threshold: 12 });
  const reduceMotion = usePrefersReducedMotion();
  const resolved = resolveAppearance(appearance, animated, scrolled);
  const hideOnScrollDown =
    hideOnScroll && animated && scrolled && direction === "down";

  const entrance = withReducedMotion(
    createStaggerVariants({
      staggerChildren: 0.05,
      delayChildren: 0.05,
      childVariants: fadeDown,
    }).container,
    reduceMotion,
  );

  return (
    <motion.header
      data-slot="navbar"
      data-appearance={resolved}
      data-scrolled={scrolled || undefined}
      style={{ ["--navbar-height" as string]: "4.75rem" }}
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: hideOnScrollDown ? "-100%" : 0, opacity: 1 }}
      transition={transitionPresets.entrance}
      className={cn(
        "inset-x-0 top-0 z-50 w-full",
        sticky && "sticky",
        "border-b",
        "bg-[var(--glass-nav-bg)]",
        "[-webkit-backdrop-filter:blur(var(--glass-nav-blur))]",
        "supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--glass-nav-bg)_88%,transparent)]",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
        resolved === "transparent" && !scrolled
          ? "border-transparent shadow-none backdrop-blur-[calc(var(--glass-nav-blur)*0.65)]"
          : cn(
              "border-[var(--ds-border-subtle)]",
              "backdrop-blur-[calc(var(--glass-nav-blur)*1.35)]",
              "shadow-[0_10px_40px_rgb(0_0_0_/_0.32),0_0_40px_rgb(37_99_235_/_0.08)]",
              "supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--glass-nav-bg)_94%,transparent)]",
            ),
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-border-glow)]",
          "transition-opacity duration-[var(--duration-normal)]",
          scrolled ? "opacity-100" : "opacity-50",
        )}
      />

      <Container
        width="wide"
        gutter="default"
        className="relative flex h-[var(--navbar-height)] items-center justify-between gap-4"
      >
        <motion.div
          className="flex min-w-0 items-center gap-8"
          variants={entrance}
          initial="hidden"
          animate="visible"
        >
          {brand ? (
            <motion.div
              variants={fadeDown}
              data-slot="navbar-brand"
              className="shrink-0"
            >
              {brand}
            </motion.div>
          ) : null}
          {items.length && labels ? (
            <DesktopNav items={items} ariaLabel={labels.primaryNavLabel} />
          ) : null}
          {children}
        </motion.div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {showSearch && labels ? (
            <NavSearch
              placeholder={labels.searchPlaceholder}
              searchAriaLabel={labels.searchAriaLabel}
              openSearchLabel={labels.openSearchLabel}
            />
          ) : null}
          {showThemeSwitch && labels ? (
            <ThemeSwitch
              lightLabel={labels.themeSwitchToLightLabel}
              darkLabel={labels.themeSwitchToDarkLabel}
            />
          ) : null}
          {actions}
          {cta ? (
            <NavCta
              label={cta.label}
              href={cta.href}
              className="hidden sm:inline-flex"
            />
          ) : null}
          {(items.length || cta) && labels ? (
            <MobileNav
              items={items as NavItem[]}
              cta={cta}
              openMenuLabel={labels.openMenuLabel}
              closeMenuLabel={labels.closeMenuLabel}
              closeMenuOverlayLabel={labels.closeMenuOverlayLabel}
              ariaLabel={labels.mobileNavLabel}
            />
          ) : null}
        </div>
      </Container>
    </motion.header>
  );
}

/** Transparent over-hero navbar */
function TransparentNavbar(props: Omit<NavbarProps, "appearance">) {
  return <Navbar {...props} appearance="transparent" />;
}

/** Solid / glass navbar */
function SolidNavbar(props: Omit<NavbarProps, "appearance">) {
  return <Navbar {...props} appearance="solid" />;
}

/** Sticky solid navbar */
function StickyNavbar(props: Omit<NavbarProps, "sticky">) {
  return <Navbar {...props} sticky />;
}

/**
 * Animated glass navbar — softens further after scroll.
 */
function AnimatedNavbar(props: Omit<NavbarProps, "animated" | "sticky">) {
  return (
    <Navbar
      {...props}
      appearance={props.appearance ?? "transparent"}
      sticky
      animated
      hideOnScroll
    />
  );
}

export {
  AnimatedNavbar,
  Navbar,
  SolidNavbar,
  StickyNavbar,
  TransparentNavbar,
};
