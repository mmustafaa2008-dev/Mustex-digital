"use client";

import { useMemo } from "react";

import { Container } from "@/components/layout/container";
import { footer } from "@/data/footer";
import { toSiteFooterProps } from "@/lib/content";
import { cn } from "@/lib/utils";

import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterContact } from "./footer-contact";
import { FooterLinkGroupNav } from "./footer-link-group";
import { FooterNewsletter } from "./footer-newsletter";
import { FooterSocial } from "./footer-social";
import type { SiteFooterProps } from "./types";

/**
 * Enterprise site footer — company, links, services, newsletter, social, legal.
 * All copy from `footer.ts`.
 */
function SiteFooter({
  content = footer,
  onNewsletterSubmit,
  className,
}: SiteFooterProps) {
  const view = useMemo(() => toSiteFooterProps(content), [content]);
  const brandHeadingId = "footer-brand-heading";

  const newsletter =
    view.newsletter !== false && view.newsletter
      ? {
          ...view.newsletter,
          onSubmit: onNewsletterSubmit ?? view.newsletter.onSubmit,
        }
      : null;

  return (
    <footer
      data-slot="site-footer"
      aria-labelledby={brandHeadingId}
      className={cn(
        "relative overflow-hidden border-t border-[var(--ds-border)]",
        "bg-[var(--ds-surface)] text-[var(--ds-foreground)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-[image:var(--gradient-border-glow)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[140px]"
      />

      <Container width="wide" className="relative z-10 py-14 md:py-20">
        {newsletter ? (
          <div className="mb-12 border-b border-[var(--ds-border-subtle)] pb-12 md:mb-16 md:pb-14">
            <FooterNewsletter {...newsletter} layout="banner" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <FooterBrand
              {...view.company}
              headingId={brandHeadingId}
            />
          </div>

          {view.services ? (
            <FooterLinkGroupNav
              {...view.services}
              className="sm:max-lg:col-span-1"
            />
          ) : null}

          {view.quickLinks ? <FooterLinkGroupNav {...view.quickLinks} /> : null}

          <div className="flex flex-col gap-8">
            {view.contact ? <FooterContact {...view.contact} /> : null}
            {view.socialLinks?.length && view.socialLabel ? (
              <FooterSocial
                links={view.socialLinks}
                label={view.socialLabel}
              />
            ) : null}
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <FooterBottom
            copyright={view.copyright}
            credit={view.credit}
            legalLinks={view.legalLinks}
          />
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
