import type { Metadata } from "next";

import { seoPages, seoSite } from "@/data/seo";
import type { SeoPageConfig, SeoRouteKey } from "@/types/seo";

import { absoluteAssetUrl, absoluteUrl } from "./absolute-url";

export type CreatePageMetadataOptions = {
  /** Override path (rare) */
  path?: SeoPageConfig["path"];
  /** Merge extra keywords */
  keywords?: string[];
  /** Override description */
  description?: string;
  /** Override title */
  title?: string;
  /** OG/Twitter image overrides */
  images?: string[];
};

function uniqueKeywords(list: string[]): string[] {
  return [...new Set(list.map((item) => item.trim()).filter(Boolean))];
}

/**
 * Build Next.js Metadata from the centralized SEO page config.
 */
export function createPageMetadata(
  routeKey: SeoRouteKey,
  options: CreatePageMetadataOptions = {},
): Metadata {
  const page = seoPages[routeKey] as SeoPageConfig;
  const title = options.title ?? page.title;
  const description = options.description ?? page.description;
  const path = options.path ?? page.path;
  const canonical = absoluteUrl(path);
  const keywords = uniqueKeywords([
    ...(page.keywords ?? seoSite.defaultKeywords),
    ...(options.keywords ?? []),
  ]);
  const imagePath =
    options.images?.[0] ??
    page.openGraph?.images?.[0] ??
    seoSite.defaultOgImage;
  const imageSources =
    options.images ?? page.openGraph?.images ?? [imagePath];
  const ogImages = imageSources.map((src: string) => ({
    url: absoluteAssetUrl(src),
    width: 1200,
    height: 630,
    alt: title,
  }));

  const ogTitle = page.openGraph?.title ?? title;
  const ogDescription = page.openGraph?.description ?? description;
  const twitterTitle = page.twitter?.title ?? title;
  const twitterDescription = page.twitter?.description ?? description;
  const twitterImages = (
    page.twitter?.images ?? [imagePath]
  ).map((src: string) => absoluteAssetUrl(src));

  return {
    title: page.absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    applicationName: seoSite.applicationName,
    authors: seoSite.authors,
    creator: seoSite.creator,
    publisher: seoSite.publisher,
    category: page.category ?? seoSite.category,
    metadataBase: new URL(seoSite.url),
    alternates: {
      canonical,
    },
    robots: page.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: page.openGraph?.type ?? "website",
      locale: seoSite.locale,
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: seoSite.name,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImages,
      creator: page.twitter?.creator ?? seoSite.twitterHandle,
      site: seoSite.twitterHandle,
    },
  };
}

/**
 * Root layout metadata — defaults only; pages supply their own titles.
 */
export function createRootMetadata(): Metadata {
  const home = seoPages.home;
  const image = absoluteAssetUrl(seoSite.defaultOgImage);

  return {
    metadataBase: new URL(seoSite.url),
    title: {
      default: home.title,
      template: `%s | ${seoSite.name}`,
    },
    description: seoSite.description,
    applicationName: seoSite.applicationName,
    authors: seoSite.authors,
    creator: seoSite.creator,
    publisher: seoSite.publisher,
    category: seoSite.category,
    keywords: seoSite.defaultKeywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: seoSite.locale,
      url: seoSite.url,
      title: home.title,
      description: home.description,
      siteName: seoSite.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: seoSite.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [image],
      creator: seoSite.twitterHandle,
      site: seoSite.twitterHandle,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        {
          url: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: seoSite.shortName,
      statusBarStyle: "black-translucent",
    },
  };
}
