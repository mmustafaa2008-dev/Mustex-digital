import type { ReactNode } from "react";

import type {
  ContentCta,
  MegaMenuColumnContent,
  MegaMenuContent,
  NavDropdownContent,
  NavItemContent,
  NavLinkContent,
  NavigationLabels,
} from "@/types/content";
import { isMegaMenuContent, isNavDropdownContent } from "@/types/content";

export type NavLinkItem = NavLinkContent;
export type NavDropdownItem = NavDropdownContent;
export type MegaMenuColumn = MegaMenuColumnContent;
export type MegaMenuItem = MegaMenuContent;
export type NavItem = NavItemContent;
export type { NavigationLabels };

export const isDropdownItem = isNavDropdownContent;
export const isMegaMenuItem = isMegaMenuContent;

export type NavbarAppearance = "transparent" | "solid";

export type NavbarPropsBase = {
  brand?: ReactNode;
  items?: NavItem[];
  cta?: ContentCta;
  labels?: NavigationLabels;
  appearance?: NavbarAppearance;
  sticky?: boolean;
  /** Transparent → blur/solid on scroll */
  animated?: boolean;
  /** Hide navbar while scrolling down (enterprise default: off) */
  hideOnScroll?: boolean;
  showSearch?: boolean;
  showThemeSwitch?: boolean;
  className?: string;
};
