import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { TechnologyStackSection } from "@/components/sections";
import { technologies } from "@/data/technologies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("technology");

export default function TechnologyPage() {
  return (
    <>
      <PageJsonLd routeKey="technology" />
      <MarketingPage
        title={technologies.section.title}
        description={technologies.section.description}
        primaryCta={{ label: "Discuss Your Stack", href: "/contact" }}
      />
      <TechnologyStackSection hideIntro />
    </>
  );
}
