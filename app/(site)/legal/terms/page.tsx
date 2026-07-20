import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("terms");

export default function TermsPage() {
  return (
    <>
      <PageJsonLd routeKey="terms" />
      <MarketingPage
        title="Terms of Service"
        description="The terms that govern use of the Mustex Digital website and engagement for professional services."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      >
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          <p>
            By using this website you agree to use content for informational
            purposes and to engage Mustex Digital under a separate statement of
            work for delivery engagements.
          </p>
          <p>
            Project scope, timelines, and commercial terms are defined in written
            agreements between Mustex Digital and the client.
          </p>
        </div>
      </MarketingPage>
    </>
  );
}
