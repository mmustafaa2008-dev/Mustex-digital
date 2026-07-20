import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageJsonLd routeKey="privacy" />
      <MarketingPage
        title="Privacy Policy"
        description="How Mustex Digital collects, uses, and protects information when you engage with our website and services."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      >
        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          <p>
            We use contact details you share with us solely to respond to project
            inquiries and deliver contracted services. We do not sell personal
            data.
          </p>
          <p>
            For privacy questions, email us through the contact page and we will
            respond promptly.
          </p>
        </div>
      </MarketingPage>
    </>
  );
}
