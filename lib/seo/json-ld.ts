import { faq as faqContent } from "@/data/faq";
import { seoPages, seoSite } from "@/data/seo";
import { getServiceBySlug } from "@/data/services";
import type { SeoPageConfig, SeoPath, SeoRouteKey } from "@/types/seo";

import { absoluteAssetUrl, absoluteUrl } from "./absolute-url";

export type JsonLd = Record<string, unknown>;

export function buildOrganizationJsonLd(): JsonLd {
  const org = seoSite.organization;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seoSite.url}/#organization`,
    name: org.name,
    legalName: org.legalName,
    url: org.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteAssetUrl(org.logoPath),
    },
    image: absoluteAssetUrl(org.logoPath),
    email: org.email,
    description: org.description,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: org.addressCountry,
        addressLocality: org.addressLocality,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: org.addressCountry,
      addressLocality: org.addressLocality,
    },
    sameAs: org.sameAs,
    areaServed: org.areaServed,
  };
}

export function buildLocalBusinessJsonLd(): JsonLd {
  const org = seoSite.organization;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seoSite.url}/#localbusiness`,
    name: org.name,
    url: org.url,
    image: absoluteAssetUrl(org.logoPath),
    email: org.email,
    description: org.description,
    priceRange: org.priceRange,
    address: {
      "@type": "PostalAddress",
      addressCountry: org.addressCountry,
      addressLocality: org.addressLocality,
    },
    areaServed: org.areaServed,
    sameAs: org.sameAs,
  };
}

export function buildProfessionalServiceJsonLd(): JsonLd {
  const org = seoSite.organization;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${seoSite.url}/#professionalservice`,
    name: org.name,
    url: org.url,
    image: absoluteAssetUrl(org.logoPath),
    email: org.email,
    description: org.description,
    priceRange: org.priceRange,
    address: {
      "@type": "PostalAddress",
      addressCountry: org.addressCountry,
      addressLocality: org.addressLocality,
    },
    areaServed: org.areaServed,
    serviceType: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "AI Automation",
      "UI/UX Design",
      "Cloud Solutions",
      "Digital Marketing",
    ],
    sameAs: org.sameAs,
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seoSite.url}/#website`,
    name: seoSite.name,
    url: seoSite.url,
    description: seoSite.description,
    inLanguage: seoSite.language,
    publisher: { "@id": `${seoSite.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${seoSite.url}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: SeoPath }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: SeoPath;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${seoSite.url}/#organization` },
    areaServed: seoSite.organization.areaServed,
    serviceType: input.name,
  };
}

export function buildContactPageJsonLd(path: SeoPath = "/contact"): JsonLd {
  const org = seoSite.organization;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${seoSite.name}`,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Organization",
      name: org.name,
      email: org.email,
      url: org.url,
    },
  };
}

export function buildPageJsonLdGraph(
  routeKey: SeoRouteKey,
  extras?: {
    serviceSlug?: string;
    breadcrumb?: SeoPageConfig["breadcrumb"];
  },
): JsonLd[] {
  const page = seoPages[routeKey];
  const types = new Set(page.jsonLd ?? []);

  if (extras?.serviceSlug) {
    types.add("service");
    types.add("breadcrumb");
    types.add("organization");
  }

  const graph: JsonLd[] = [];
  const breadcrumb =
    extras?.breadcrumb ??
    (extras?.serviceSlug
      ? [
          { name: "Home", path: "/" as const },
          { name: "Services", path: "/services" as const },
          {
            name:
              getServiceBySlug(extras.serviceSlug)?.title ?? "Service",
            path: `/services/${extras.serviceSlug}` as SeoPath,
          },
        ]
      : page.breadcrumb ?? []);

  for (const type of types) {
    switch (type) {
      case "organization":
        graph.push(buildOrganizationJsonLd());
        break;
      case "localBusiness":
        graph.push(buildLocalBusinessJsonLd());
        break;
      case "professionalService":
        graph.push(buildProfessionalServiceJsonLd());
        break;
      case "website":
        graph.push(buildWebSiteJsonLd());
        break;
      case "breadcrumb":
        graph.push(buildBreadcrumbJsonLd(breadcrumb));
        break;
      case "faq":
        graph.push(buildFaqPageJsonLd());
        break;
      case "service": {
        const slug = extras?.serviceSlug;
        const service = slug ? getServiceBySlug(slug) : undefined;
        graph.push(
          buildServiceJsonLd({
            name: service?.title ?? page.title,
            description: service?.description ?? page.description,
            path: (service?.href ?? page.path) as SeoPath,
          }),
        );
        break;
      }
      case "contact":
        graph.push(buildContactPageJsonLd(page.path));
        break;
      default:
        break;
    }
  }

  return graph;
}
