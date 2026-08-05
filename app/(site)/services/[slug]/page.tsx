import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPage } from "@/components/layout/marketing-page";
import { ServicePortfolioSection } from "@/components/sections";
import { PageJsonLd } from "@/components/seo";
import { getServicePortfolio } from "@/data/service-projects";
import { serviceSlugSeoKey } from "@/data/seo";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { createServiceMetadata } from "@/lib/seo";
import type { SeoRouteKey } from "@/types/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  return createServiceMetadata(slug);
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const routeKey = (serviceSlugSeoKey[slug] ?? "services") as SeoRouteKey;
  const portfolio = getServicePortfolio(slug);
  const subtitle = portfolio?.subtitle ?? service.shortDescription;

  return (
    <>
      <PageJsonLd routeKey={routeKey} serviceSlug={slug} />
      <MarketingPage title={service.title} description={subtitle} />
      {portfolio ? (
        <ServicePortfolioSection
          items={portfolio.items}
          label={portfolio.sectionLabel}
        />
      ) : null}
    </>
  );
}
