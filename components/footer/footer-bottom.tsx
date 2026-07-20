import Link from "next/link";

import { Divider } from "@/components/ui/divider";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import type { FooterLink } from "./types";

export type FooterBottomProps = {
  copyright: string;
  credit?: string;
  legalLinks?: FooterLink[];
  className?: string;
};

/**
 * Copyright bar + legal links — all strings from content.
 */
function FooterBottom({
  copyright,
  credit,
  legalLinks = [],
  className,
}: FooterBottomProps) {
  return (
    <div data-slot="footer-bottom" className={cn("flex flex-col gap-6", className)}>
      <Divider tone="subtle" />
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-[var(--ds-foreground-muted)]">{copyright}</p>

        {legalLinks.length ? (
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xs text-[var(--ds-foreground-muted)] polish-link hover:text-[var(--ds-primary-text)]",
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
        ) : null}

        {credit ? (
          <p className="text-xs text-[var(--ds-foreground-muted)] md:text-right">
            {credit}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export { FooterBottom };
