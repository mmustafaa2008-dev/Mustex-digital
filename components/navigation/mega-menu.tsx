"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { createIconProps } from "@/lib/icons";
import { cardHover } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { ActiveLink } from "./active-link";
import type { MegaMenuItem, NavLinkItem } from "./types";

export type MegaMenuProps = {
  item: MegaMenuItem;
  className?: string;
};

function MegaMenuCard({
  link,
  reduceMotion,
}: {
  link: NavLinkItem;
  reduceMotion: boolean;
}) {
  const Icon = link.icon;
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <motion.li {...(reduceMotion ? {} : cardHover)} className="list-none">
      <NavigationMenu.Link
        href={link.href}
        render={<Link href={link.href} />}
        className={cn(
          "group flex h-full flex-col gap-3 rounded-[var(--ds-radius-lg)] p-4",
          "border border-[var(--ds-border-subtle)]",
          "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
          "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
          "hover:border-[var(--ds-primary-text)]/35",
          "hover:shadow-[var(--ds-shadow-glow-sm)]",
          "hover:bg-[color-mix(in_srgb,var(--ds-surface-elevated)_88%,var(--ds-primary)_12%)]",
          isActive &&
            "border-[var(--ds-primary-text)]/40 shadow-[var(--ds-shadow-glow-sm)]",
          uiTransition,
          uiFocusRing,
        )}
      >
        {Icon ? (
          <span
            className={cn(
              "polish-icon-glow inline-flex size-10 items-center justify-center rounded-[var(--ds-radius-md)]",
              "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
              "text-[var(--ds-primary-text)]",
            )}
          >
            <Icon {...createIconProps({ size: "md", decorative: true })} />
          </span>
        ) : null}
        <span className="flex min-w-0 flex-col gap-1">
          <span className="text-sm font-semibold tracking-[-0.015em] text-[var(--ds-foreground)]">
            {link.label}
          </span>
          {link.description ? (
            <span className="text-xs leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
              {link.description}
            </span>
          ) : null}
        </span>
      </NavigationMenu.Link>
    </motion.li>
  );
}

/**
 * Desktop mega menu — Services link routes via Next.js; chevron opens the panel.
 */
function MegaMenu({ item, className }: MegaMenuProps) {
  const reduceMotion = usePrefersReducedMotion();
  const href = item.href ?? "/services";
  const links = item.columns.flatMap((column) => column.items);

  return (
    <NavigationMenu.Item data-slot="mega-menu" className={className}>
      <div className="flex items-center">
        <ActiveLink href={href}>{item.label}</ActiveLink>
        <NavigationMenu.Trigger
          aria-label={`${item.label} menu`}
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-[var(--ds-radius-sm)]",
            "text-[var(--ds-foreground-subtle)] hover:text-[var(--ds-foreground)]",
            "data-[popup-open]:text-[var(--ds-foreground)]",
            uiTransition,
            uiFocusRing,
          )}
        >
          <NavigationMenu.Icon>
            <ChevronDown
              {...createIconProps({ size: "xs", decorative: true })}
              className="opacity-70 transition-transform duration-[var(--duration-fast)] data-[popup-open]:rotate-180"
            />
          </NavigationMenu.Icon>
        </NavigationMenu.Trigger>
      </div>

      <NavigationMenu.Content
        className={cn(
          "h-[var(--navigation-menu-content-height)] w-[var(--navigation-menu-content-width)]",
          "transition-[height,width,opacity,transform,filter] duration-[var(--duration-normal)] ease-[var(--ease-entrance)]",
          "data-[ending-style]:translate-y-2 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:blur-[2px]",
          "data-[starting-style]:translate-y-2 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0 data-[starting-style]:blur-[2px]",
        )}
      >
        <div
          className={cn(
            "min-w-[min(52rem,calc(100vw-2rem))] p-5",
            "rounded-[var(--ds-radius-xl)] border border-[var(--ds-border)]",
            "bg-[var(--glass-panel-bg-strong)] shadow-[var(--ds-shadow-lg),var(--ds-shadow-glow-sm)]",
            "backdrop-blur-[var(--glass-panel-blur)]",
            "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
          )}
        >
          <ul
            className={cn(
              "grid gap-3",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {links.map((link) => (
              <MegaMenuCard
                key={link.href + link.label}
                link={link}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
          <div className="mt-4 border-t border-[var(--ds-border-subtle)] pt-4">
            <Link
              href={href}
              className={cn(
                "text-sm font-medium text-[var(--ds-primary-text)] polish-link",
                uiFocusRing,
                "rounded-[var(--ds-radius-xs)]",
              )}
            >
              View all {item.label}
            </Link>
          </div>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

export { MegaMenu };
