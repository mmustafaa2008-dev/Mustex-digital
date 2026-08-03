import type { MetadataRoute } from "next";

import { brand } from "@/data/brand";
import { seoSite } from "@/data/seo";

/**
 * PWA web app manifest — Mustex Digitals branding.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoSite.name,
    short_name: seoSite.shortName,
    description: seoSite.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: seoSite.themeColor.dark,
    theme_color: seoSite.themeColor.dark,
    orientation: "portrait-primary",
    lang: seoSite.language,
    categories: ["business", "productivity"],
    icons: [
      {
        src: brand.logoSrc,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brand.logoSrc,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: brand.logoSrc,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
