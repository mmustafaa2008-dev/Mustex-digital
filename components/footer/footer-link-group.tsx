import Link from "next/link";

import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import type { FooterLinkGroup } from "./types";

export type FooterLinkGroupProps = FooterLinkGroup & {
  className?: string;
};

/**
 * Titled link column (Company, Services, etc.).
 */
function FooterLinkGroupNav({
  title,
  links,
  className,
}: FooterLinkGroupProps) {
  return (
    <nav
      data-slot="footer-link-group"
      aria-label={title}
      className={cn("flex flex-col gap-4", className)}
    >
      <p className="text-xs font-semibold tracking-[var(--tracking-caption)] text-[var(--ds-foreground)] uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-block text-sm text-[var(--ds-foreground-subtle)] polish-link",
                "hover:translate-x-0.5 hover:text-[var(--ds-primary-text)]",
                uiTransition,
                uiFocusRing,
                "rounded-[var(--ds-radius-xs)]",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { FooterLinkGroupNav };
