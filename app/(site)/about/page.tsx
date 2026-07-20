import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { AboutSection } from "@/components/sections";
import { company } from "@/data/company";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageJsonLd routeKey="about" />
      <MarketingPage
        title={company.about.title}
        description={company.about.headline}
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
      <AboutSection hideIntro />
    </>
  );
}
