import type { MetadataRoute } from "next";

import { seoSite } from "@/data/seo";

/**
 * robots.txt — allow public indexing; block private surfaces.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/", "/private", "/private/"],
      },
    ],
    sitemap: `${seoSite.url}/sitemap.xml`,
    host: seoSite.url,
  };
}
