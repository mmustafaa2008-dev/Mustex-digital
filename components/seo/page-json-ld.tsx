import { buildPageJsonLdGraph } from "@/lib/seo";
import type { SeoRouteKey } from "@/types/seo";

import { JsonLdScript } from "./json-ld-script";

export type PageJsonLdProps = {
  routeKey: SeoRouteKey;
  serviceSlug?: string;
};

/**
 * Emits the JSON-LD graph configured for a SEO route.
 */
function PageJsonLd({ routeKey, serviceSlug }: PageJsonLdProps) {
  const graph = buildPageJsonLdGraph(routeKey, { serviceSlug });
  if (!graph.length) return null;

  return <JsonLdScript id={`jsonld-${routeKey}`} data={graph} />;
}

export { PageJsonLd };
