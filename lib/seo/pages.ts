import { serviceSlugSeoKey, seoPages } from "@/data/seo";
import { getServiceBySlug } from "@/data/services";
import type { SeoPageConfig, SeoRouteKey } from "@/types/seo";

import { createPageMetadata } from "./create-metadata";

/**
 * Metadata for a service detail page — uses curated SEO when available.
 */
export function createServiceMetadata(slug: string) {
  const curatedKey = serviceSlugSeoKey[slug];
  if (curatedKey) {
    return createPageMetadata(curatedKey);
  }

  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title} | Mustex Digital`;
  const baseDescription = service.shortDescription.trim();
  const description =
    baseDescription.length >= 140 && baseDescription.length <= 160
      ? baseDescription
      : baseDescription.length > 160
        ? `${baseDescription.slice(0, 157).trimEnd()}…`
        : `${baseDescription} Expert delivery by Mustex Digital.`;

  return createPageMetadata("services", {
    title,
    description,
    path: `/services/${slug}` as SeoPageConfig["path"],
    keywords: [service.title, ...(service.tags ?? [])],
  });
}

export function getSeoPage(routeKey: SeoRouteKey): SeoPageConfig {
  return seoPages[routeKey];
}
