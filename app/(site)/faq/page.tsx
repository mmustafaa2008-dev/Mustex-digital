import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { FaqSection } from "@/components/sections";
import { faq } from "@/data/faq";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("faq");

export default function FaqPage() {
  return (
    <>
      <PageJsonLd routeKey="faq" />
      <MarketingPage
        title={faq.section.title}
        description={faq.section.description}
        primaryCta={faq.cta.primary}
      />
      <FaqSection hideIntro />
    </>
  );
}
