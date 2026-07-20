"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createStaggerVariants,
  fadeDown,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

import { ActiveLink } from "./active-link";
import { MegaMenu } from "./mega-menu";
import { NavDropdown } from "./nav-dropdown";
import {
  isDropdownItem,
  isMegaMenuItem,
  type NavItem,
} from "./types";

export type DesktopNavProps = {
  items: NavItem[];
  ariaLabel: string;
  className?: string;
};

/**
 * Desktop navigation list — links, dropdowns, mega menus.
 */
function DesktopNav({ items, ariaLabel, className }: DesktopNavProps) {
  const reduceMotion = usePrefersReducedMotion();
  const hasMega = items.some(isMegaMenuItem);

  const stagger = withReducedMotion(
    createStaggerVariants({
      staggerChildren: 0.04,
      delayChildren: 0.12,
      childVariants: fadeDown,
    }).container,
    reduceMotion,
  );

  if (hasMega) {
    return (
      <NavigationMenu.Root
        data-slot="desktop-nav"
        aria-label={ariaLabel}
        className={cn("relative hidden items-center lg:flex", className)}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <NavigationMenu.List className="flex items-center gap-0.5">
            {items.map((item) => {
              if (isMegaMenuItem(item)) {
                return (
                  <motion.div key={item.label} variants={fadeDown}>
                    <MegaMenu item={item} />
                  </motion.div>
                );
              }

              if (isDropdownItem(item)) {
                return (
                  <motion.div key={item.label} variants={fadeDown}>
                    <NavigationMenu.Item>
                      <NavDropdown item={item} />
                    </NavigationMenu.Item>
                  </motion.div>
                );
              }

              return (
                <motion.div key={item.href} variants={fadeDown}>
                  <NavigationMenu.Item>
                    <ActiveLink href={item.href} exact={item.href === "/"}>
                      {item.label}
                    </ActiveLink>
                  </NavigationMenu.Item>
                </motion.div>
              );
            })}
          </NavigationMenu.List>
        </motion.div>

        <NavigationMenu.Portal>
          <NavigationMenu.Positioner
            sideOffset={10}
            collisionPadding={16}
            className="z-50 h-[var(--navigation-menu-positioner-height)] w-[var(--navigation-menu-positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom,transform] duration-[var(--duration-normal)] data-[instant]:transition-none"
          >
            <NavigationMenu.Popup
              className={cn(
                "h-full w-full origin-[var(--transform-origin)] rounded-[var(--ds-radius-xl)]",
                "border border-[var(--ds-border-subtle)]",
                "bg-[var(--glass-nav-bg)] backdrop-blur-[var(--glass-nav-blur)]",
                "[-webkit-backdrop-filter:blur(var(--glass-nav-blur))]",
                "shadow-[0_24px_80px_rgb(0_0_0_/_0.45),var(--ds-shadow-glow-sm)]",
                "outline-none",
                "transition-[opacity,transform,width,height] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
                "data-[ending-style]:translate-y-1 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
                "data-[starting-style]:translate-y-1 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
              )}
            >
              <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>
    );
  }

  return (
    <nav
      data-slot="desktop-nav"
      aria-label={ariaLabel}
      className={cn("hidden items-center gap-0.5 lg:flex", className)}
    >
      {items.map((item) => {
        if (isDropdownItem(item)) {
          return <NavDropdown key={item.label} item={item} />;
        }

        if (isMegaMenuItem(item)) {
          return <MegaMenu key={item.label} item={item} />;
        }

        return (
          <ActiveLink
            key={item.href}
            href={item.href}
            exact={item.href === "/"}
          >
            {item.label}
          </ActiveLink>
        );
      })}
    </nav>
  );
}

export { DesktopNav };
