import type { Metadata } from "next";

import { brand } from "@/data/brand";
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
    width: seoSite.ogImageDimensions?.width ?? 1200,
    height: seoSite.ogImageDimensions?.height ?? 630,
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
  const ogWidth = seoSite.ogImageDimensions?.width ?? 1200;
  const ogHeight = seoSite.ogImageDimensions?.height ?? 630;
  const logo = brand.logoSrc;

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
          width: ogWidth,
          height: ogHeight,
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
      icon: [{ url: logo, type: "image/png" }],
      apple: [{ url: logo, type: "image/png" }],
      shortcut: [logo],
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      title: seoSite.shortName,
      statusBarStyle: "black-translucent",
    },
  };
}
