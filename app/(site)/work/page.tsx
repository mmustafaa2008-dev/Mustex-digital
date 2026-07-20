import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { FeaturedWorkSection } from "@/components/sections";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("work");

export default function WorkPage() {
  return (
    <>
      <PageJsonLd routeKey="work" />
      <MarketingPage
        title={projects.section.title}
        description={projects.section.description}
        primaryCta={{ label: "Start a Project", href: "/contact" }}
      />
      <FeaturedWorkSection hideIntro />
    </>
  );
}
