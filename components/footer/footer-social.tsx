import { createIconProps } from "@/lib/icons";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import type { FooterSocialLink } from "./types";

export type FooterSocialProps = {
  links: FooterSocialLink[];
  label: string;
  className?: string;
};

/**
 * Social media icon link row — labels and links from content.
 */
function FooterSocial({ links, className, label }: FooterSocialProps) {
  if (!links.length) return null;

  return (
    <nav
      data-slot="footer-social"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href + link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-[var(--ds-radius-sm)]",
              "border border-[var(--ds-border-subtle)] bg-[var(--ds-surface-elevated)]",
              "text-[var(--ds-foreground-subtle)] hover:border-[var(--ds-primary-text)]/40 hover:text-[var(--ds-primary-text)]",
              "hover:shadow-[var(--ds-shadow-glow-sm)]",
              uiTransition,
              uiFocusRing,
            )}
          >
            <Icon {...createIconProps({ size: "md", decorative: true })} />
          </a>
        );
      })}
    </nav>
  );
}

export { FooterSocial };
