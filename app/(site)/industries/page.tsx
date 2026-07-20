import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { IndustriesSection } from "@/components/sections";
import { industries } from "@/data/industries";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("industries");

export default function IndustriesPage() {
  return (
    <>
      <PageJsonLd routeKey="industries" />
      <MarketingPage
        title={industries.section.title}
        description={industries.section.description}
        primaryCta={industries.cta.primary}
      />
      <IndustriesSection hideIntro />
    </>
  );
}
