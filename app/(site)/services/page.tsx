import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { ServicesSection } from "@/components/sections";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <PageJsonLd routeKey="services" />
      <MarketingPage
        title={services.section.title}
        description={services.section.description}
        primaryCta={services.cta.primary}
      />
      <ServicesSection hideIntro />
    </>
  );
}
