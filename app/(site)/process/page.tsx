import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { DevelopmentProcessSection } from "@/components/sections";
import { process } from "@/data/process";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("process");

export default function ProcessPage() {
  return (
    <>
      <PageJsonLd routeKey="process" />
      <MarketingPage
        title={process.section.title}
        description={process.section.description}
        primaryCta={process.cta.primary}
      />
      <DevelopmentProcessSection hideIntro />
    </>
  );
}
