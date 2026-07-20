"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { transitionPresets } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type ActiveLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
  /** Match exact path only */
  exact?: boolean;
  indicator?: "underline" | "dot" | "background" | "none";
  className?: string;
  activeClassName?: string;
};

/**
 * Nav link with animated active underline — pathname-based App Router routing.
 */
function ActiveLink({
  href,
  children,
  exact = false,
  indicator = "underline",
  className,
  activeClassName,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  const isActive = exact
    ? pathname === href
    : pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-slot="active-link"
      data-active={isActive || undefined}
      className={cn(
        "group relative inline-flex items-center",
        "px-3 py-2 text-[0.8125rem] font-medium tracking-[-0.01em]",
        "text-[var(--ds-foreground-subtle)] hover:text-[var(--ds-foreground)]",
        uiTransition,
        uiFocusRing,
        "rounded-[var(--ds-radius-sm)]",
        isActive && "text-[var(--ds-primary-text)]",
        isActive && indicator === "background" && "bg-[var(--ds-muted)]",
        isActive && activeClassName,
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {indicator === "underline" ? (
        <motion.span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full",
            "bg-[var(--ds-primary)]",
            "shadow-[0_0_12px_rgb(37_99_235_/_0.65)]",
          )}
          initial={false}
          animate={
            isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          whileHover={
            reduceMotion || isActive
              ? undefined
              : { scaleX: 0.7, opacity: 0.65 }
          }
          transition={transitionPresets.soft}
          style={{ transformOrigin: "left center" }}
        />
      ) : null}

      {isActive && indicator === "dot" ? (
        <span
          className="ml-1.5 size-1.5 rounded-full bg-[var(--ds-primary)] shadow-[0_0_8px_rgb(37_99_235_/_0.7)]"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}

export { ActiveLink };
