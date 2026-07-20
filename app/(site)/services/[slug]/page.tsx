import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { serviceSlugSeoKey } from "@/data/seo";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/data/services";
import { createIconProps } from "@/lib/icons";
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

  const Icon = service.icon;
  const routeKey = (serviceSlugSeoKey[slug] ?? "services") as SeoRouteKey;

  return (
    <>
      <PageJsonLd routeKey={routeKey} serviceSlug={slug} />
      <MarketingPage
        title={service.title}
        description={service.description}
        primaryCta={{ label: service.ctaLabel, href: "/contact" }}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {Icon ? (
            <span className="inline-flex size-14 items-center justify-center rounded-[var(--ds-radius-lg)] border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]">
              <Icon
                {...createIconProps({ size: "feature", decorative: true })}
              />
            </span>
          ) : null}
          {service.tags?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--ds-border-subtle)] bg-[var(--ds-surface)] px-3 py-1 text-xs text-[var(--ds-foreground-muted)]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-base leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
            {service.shortDescription}
          </p>
        </div>
      </MarketingPage>
    </>
  );
}
