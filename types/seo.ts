import type { Metadata } from "next";

/** Route path without domain, e.g. `/about` or `/` */
export type SeoPath = `/${string}` | "/";

export type SeoOpenGraphConfig = {
  title?: string;
  description?: string;
  type?: "website" | "article" | "profile";
  images?: string[];
};

export type SeoTwitterConfig = {
  title?: string;
  description?: string;
  images?: string[];
  creator?: string;
};

export type SeoPageConfig = {
  /** Absolute document title (no template suffix) when set */
  title: string;
  /** Use absolute title — skip root template */
  absoluteTitle?: boolean;
  description: string;
  keywords?: string[];
  path: SeoPath;
  /** Override robots for this page */
  robots?: Metadata["robots"];
  category?: string;
  openGraph?: SeoOpenGraphConfig;
  twitter?: SeoTwitterConfig;
  /** Structured data types to emit on this page */
  jsonLd?: Array<
    | "organization"
    | "localBusiness"
    | "professionalService"
    | "website"
    | "breadcrumb"
    | "faq"
    | "service"
    | "contact"
  >;
  breadcrumb?: Array<{ name: string; path: SeoPath }>;
};

export type SeoOrganizationConfig = {
  name: string;
  legalName: string;
  url: string;
  logoPath: string;
  email: string;
  telephone?: string;
  description: string;
  foundingCountry: string;
  addressCountry: string;
  addressLocality?: string;
  sameAs: string[];
  priceRange?: string;
  areaServed?: string[];
};

export type SeoSiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  language: string;
  applicationName: string;
  themeColor: {
    light: string;
    dark: string;
  };
  defaultOgImage: string;
  ogImageDimensions?: { width: number; height: number };
  twitterHandle?: string;
  authors: Array<{ name: string; url?: string }>;
  creator: string;
  publisher: string;
  category: string;
  defaultKeywords: string[];
  organization: SeoOrganizationConfig;
};

export type SeoRouteKey =
  | "home"
  | "about"
  | "services"
  | "work"
  | "contact"
  | "startProject"
  | "industries"
  | "technology"
  | "process"
  | "faq"
  | "privacy"
  | "terms"
  | "webDevelopment"
  | "fullStack"
  | "mobile"
  | "aiAutomation"
  | "digitalMarketing"
  | "cloudSolutions"
  | "uiUxDesign"
  | "customSoftware";
