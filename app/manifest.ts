import type { MetadataRoute } from "next";

import { seoSite } from "@/data/seo";

/**
 * PWA web app manifest — Mustex Digital branding.
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
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
