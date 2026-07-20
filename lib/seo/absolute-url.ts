import { seoSite } from "@/data/seo";
import type { SeoPath } from "@/types/seo";

/** Build an absolute URL from a site path. */
export function absoluteUrl(path: SeoPath | string = "/"): string {
  const base = seoSite.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for a public asset path. */
export function absoluteAssetUrl(assetPath: string): string {
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return absoluteUrl(normalized as SeoPath);
}
