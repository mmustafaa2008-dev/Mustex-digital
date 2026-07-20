import type { MetadataRoute } from "next";

import { seoSitemapEntries } from "@/data/seo";
import { getAllServiceSlugs } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Dynamic sitemap — marketing routes + every service page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const curated = new Set(seoSitemapEntries.map((entry) => entry.path));

  const entries: MetadataRoute.Sitemap = seoSitemapEntries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  for (const slug of getAllServiceSlugs()) {
    const path = `/services/${slug}` as const;
    if (curated.has(path)) continue;
    entries.push({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
