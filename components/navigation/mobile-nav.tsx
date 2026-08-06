"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { BrandLockup } from "@/components/brand";
import { IconButton } from "@/components/ui/icon-button";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { createIconProps } from "@/lib/icons";
import {
  createStaggerVariants,
  fade,
  fadeUp,
  transitionPresets,
  withReducedMotion,
} from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import { NavCta } from "./nav-cta";
import {
  isDropdownItem,
  isMegaMenuItem,
  type NavItem,
  type NavLinkItem,
} from "./types";

export type MobileNavProps = {
  items: NavItem[];
  cta?: { label: string; href: string };
  openMenuLabel: string;
  closeMenuLabel: string;
  closeMenuOverlayLabel: string;
  ariaLabel: string;
  className?: string;
};

const slidePanelVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionPresets.entrance,
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: transitionPresets.exit,
  },
} as const;

const fadePanelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionPresets.soft },
  exit: { opacity: 0, transition: transitionPresets.exit },
} as const;

function flattenMegaLinks(
  item: Extract<NavItem, { columns: unknown }>,
): NavLinkItem[] {
  return item.columns.flatMap((column) => column.items);
}

/**
 * Mobile slide-in navigation with nested services, focus trap, and scroll lock.
 */
function MobileNav({
  items,
  cta,
  openMenuLabel,
  closeMenuLabel,
  closeMenuOverlayLabel,
  ariaLabel,
  className,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // The overlay/panel are portaled to `document.body` so their `fixed`
  // positioning is always relative to the real viewport — never trapped by
  // an ancestor's `backdrop-filter`/`transform` (e.g. the navbar's blur),
  // which would otherwise create a new containing block and collapse the
  // panel down to that ancestor's box.
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const panelRef = useFocusTrap<HTMLElement>({ active: open });

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setExpanded(null);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    // window.innerWidth can briefly report a stale/transitional value on
    // real mobile browsers (URL bar collapsing, viewport settling right
    // after a tap), which would otherwise produce a huge bogus "scrollbar"
    // width here. A real scrollbar is never wider than ~40px, so clamp to
    // a sane range to avoid ever corrupting body's layout.
    const rawScrollbar =
      window.innerWidth - document.documentElement.clientWidth;
    const scrollbar = Math.min(Math.max(rawScrollbar, 0), 40);

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const overlayVariants = reduceMotion ? fadePanelVariants : fade;
  const panelVariants = reduceMotion ? fadePanelVariants : slidePanelVariants;
  const listStagger = withReducedMotion(
    createStaggerVariants({
      staggerChildren: 0.04,
      delayChildren: 0.08,
      childVariants: fadeUp,
    }).container,
    reduceMotion,
  );

  return (
    <div data-slot="mobile-nav" className={cn("lg:hidden", className)}>
      <IconButton
        label={open ? closeMenuLabel : openMenuLabel}
        variant="ghost"
        size="md"
        icon={
          open ? (
            <X {...createIconProps({ size: "md", decorative: true })} />
          ) : (
            <Menu {...createIconProps({ size: "md", decorative: true })} />
          )
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      />

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.button
                    type="button"
                    aria-label={closeMenuOverlayLabel}
                    className="fixed inset-0 z-40 bg-[var(--glass-overlay-bg)] backdrop-blur-[var(--glass-overlay-blur)]"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={overlayVariants}
                    transition={transitionPresets.soft}
                    onClick={close}
                  />

                  <motion.nav
                    ref={panelRef}
                    id={panelId}
                    tabIndex={-1}
                    aria-label={ariaLabel}
                    aria-modal="true"
                    role="dialog"
                    className={cn(
                      "fixed inset-y-0 right-0 z-50 flex w-[min(22rem,100%)] flex-col",
                      "border-l border-[var(--ds-border-subtle)]",
                      "bg-[var(--glass-nav-bg)] backdrop-blur-[var(--glass-nav-blur)]",
                      "[-webkit-backdrop-filter:blur(var(--glass-nav-blur))]",
                      "px-4 py-5 shadow-[var(--ds-shadow-xl)] outline-none",
                    )}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={panelVariants}
                    transition={transitionPresets.entrance}
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <BrandLockup
                        href="/"
                        size="sm"
                        showSlogan={false}
                        className="min-w-0"
                        onClick={close}
                      />
                      <IconButton
                        label={closeMenuLabel}
                        variant="ghost"
                        size="sm"
                        icon={
                          <X
                            {...createIconProps({
                              size: "sm",
                              decorative: true,
                            })}
                          />
                        }
                        onClick={close}
                      />
                    </div>

                    <motion.ul
                      className="flex flex-1 flex-col gap-1 overflow-y-auto"
                      variants={listStagger}
                      initial="hidden"
                      animate="visible"
                    >
                      {items.map((item) => {
                        if (isDropdownItem(item) || isMegaMenuItem(item)) {
                          const key = item.label;
                          const isOpen = expanded === key;
                          const links = isMegaMenuItem(item)
                            ? flattenMegaLinks(item)
                            : item.items;
                          const panelKey = `${panelId}-${key}`;
                          const overviewHref = isMegaMenuItem(item)
                            ? item.href
                            : undefined;

                          return (
                            <motion.li key={key} variants={fadeUp}>
                              <button
                                type="button"
                                className={cn(
                                  "flex w-full items-center justify-between rounded-[var(--ds-radius-md)] px-3 py-3",
                                  "text-left text-sm font-medium tracking-[-0.01em] text-[var(--ds-foreground)]",
                                  "hover:bg-[var(--ds-muted)]",
                                  uiTransition,
                                  uiFocusRing,
                                )}
                                aria-expanded={isOpen}
                                aria-controls={panelKey}
                                onClick={() =>
                                  setExpanded((current) =>
                                    current === key ? null : key,
                                  )
                                }
                              >
                                {item.label}
                                <ChevronDown
                                  {...createIconProps({
                                    size: "sm",
                                    decorative: true,
                                  })}
                                  className={cn(
                                    "transition-transform duration-[var(--duration-fast)]",
                                    isOpen && "rotate-180",
                                  )}
                                />
                              </button>
                              <AnimatePresence initial={false}>
                                {isOpen ? (
                                  <motion.ul
                                    id={panelKey}
                                    className="mt-1 mb-2 ml-3 flex flex-col gap-1 overflow-hidden border-l border-[var(--ds-border-subtle)] pl-3"
                                    initial={
                                      reduceMotion
                                        ? { opacity: 0 }
                                        : { height: 0, opacity: 0 }
                                    }
                                    animate={
                                      reduceMotion
                                        ? { opacity: 1 }
                                        : { height: "auto", opacity: 1 }
                                    }
                                    exit={
                                      reduceMotion
                                        ? { opacity: 0 }
                                        : { height: 0, opacity: 0 }
                                    }
                                    transition={transitionPresets.soft}
                                  >
                                    {overviewHref ? (
                                      <li>
                                        <Link
                                          href={overviewHref}
                                          className={cn(
                                            "block rounded-[var(--ds-radius-sm)] px-3 py-2.5 text-sm font-medium",
                                            "text-[var(--ds-primary-text)] hover:bg-[var(--ds-muted)]",
                                            uiFocusRing,
                                          )}
                                          onClick={close}
                                        >
                                          All {item.label}
                                        </Link>
                                      </li>
                                    ) : null}
                                    {links.map((link) => {
                                      const Icon = link.icon;
                                      return (
                                        <li key={link.href + link.label}>
                                          <Link
                                            href={link.href}
                                            className={cn(
                                              "flex items-start gap-3 rounded-[var(--ds-radius-sm)] px-3 py-2.5",
                                              "text-sm text-[var(--ds-foreground-subtle)]",
                                              "hover:bg-[var(--ds-muted)] hover:text-[var(--ds-foreground)]",
                                              uiFocusRing,
                                            )}
                                            onClick={close}
                                          >
                                            {Icon ? (
                                              <span className="mt-0.5 text-[var(--ds-primary-text)]">
                                                <Icon
                                                  {...createIconProps({
                                                    size: "sm",
                                                    decorative: true,
                                                  })}
                                                />
                                              </span>
                                            ) : null}
                                            <span className="flex min-w-0 flex-col gap-0.5">
                                              <span className="font-medium tracking-[-0.01em]">
                                                {link.label}
                                              </span>
                                              {link.description ? (
                                                <span className="text-xs text-[var(--ds-foreground-muted)]">
                                                  {link.description}
                                                </span>
                                              ) : null}
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </motion.ul>
                                ) : null}
                              </AnimatePresence>
                            </motion.li>
                          );
                        }

                        return (
                          <motion.li key={item.href} variants={fadeUp}>
                            <Link
                              href={item.href}
                              className={cn(
                                "block rounded-[var(--ds-radius-md)] px-3 py-3 text-sm font-medium tracking-[-0.01em]",
                                "text-[var(--ds-foreground)] hover:bg-[var(--ds-muted)]",
                                uiFocusRing,
                              )}
                              onClick={close}
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </motion.ul>

                    {cta ? (
                      <div className="mt-4 border-t border-[var(--ds-border-subtle)] pt-4">
                        <NavCta
                          label={cta.label}
                          href={cta.href}
                          size="md"
                          className="w-full"
                        />
                      </div>
                    ) : null}
                  </motion.nav>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

export { MobileNav };
