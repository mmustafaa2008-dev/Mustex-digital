import { company } from "@/data/company";
import { seoSite } from "@/data/seo";

/**
 * Site metadata — SEO URL/name from `data/seo`, contact from company content.
 */
export const siteConfig = {
  name: seoSite.name,
  description: seoSite.description,
  url: seoSite.url,
  tagline: seoSite.tagline,
  links: {
    email: company.contact.email,
    website: seoSite.url,
  },
} as const;
