import type { SeoPageConfig, SeoRouteKey, SeoSiteConfig } from "@/types/seo";

/**
 * Central SEO source of truth — metadata, org schema, keywords.
 * Do not duplicate page titles/descriptions elsewhere.
 */
export const seoSite: SeoSiteConfig = {
  name: "Mustex Digitals",
  shortName: "Mustex",
  tagline: "We build brands. We grow businesses.",
  description:
    "Mustex Digitals builds scalable software, modern websites, mobile apps, and AI automation for ambitious businesses worldwide.",
  url: "https://mustexdigitals.com",
  locale: "en_US",
  language: "en",
  applicationName: "Mustex Digitals",
  themeColor: {
    light: "#ffffff",
    dark: "#0a0a0a",
  },
  defaultOgImage: "/logo.png",
  ogImageDimensions: { width: 512, height: 512 },
  twitterHandle: "@mustexdigital",
  authors: [{ name: "Mustex Digitals", url: "https://mustexdigitals.com" }],
  creator: "Mustex Digitals",
  publisher: "Mustex Digitals",
  category: "Software Development",
  defaultKeywords: [
    "Software Development",
    "AI Automation",
    "Full Stack Development",
    "Web Development",
    "Mobile App Development",
    "UI UX",
    "Cloud Solutions",
    "Digital Transformation",
    "ERP",
    "CRM",
    "Pakistan",
    "Global Software Company",
    "Mustex Digitals",
    "Custom Software",
    "Next.js Development",
  ],
  organization: {
    name: "Mustex Digitals",
    legalName: "Mustex Digitals",
    url: "https://mustexdigitals.com",
    logoPath: "/logo.png",
    email: "mustexdigitals@gmail.com",
    description:
      "Premium software development and AI automation company building scalable digital products for global businesses.",
    foundingCountry: "PK",
    addressCountry: "PK",
    addressLocality: "Pakistan",
    sameAs: [
      "https://www.linkedin.com/company/mustexdigital",
      "https://github.com/mustexdigital",
      "https://www.facebook.com/profile.php?id=61592759062818",
      "https://www.instagram.com/mustexdigitals/?hl=en",
      "https://x.com/mustexdigital",
    ],
    priceRange: "$$",
    areaServed: ["Pakistan", "Worldwide"],
  },
};

const sharedKeywords = seoSite.defaultKeywords;

/**
 * Per-route SEO definitions — single source for titles, descriptions, paths.
 */
export const seoPages = {
  home: {
    title:
      "Mustex Digitals | Premium Software Development & AI Automation Company",
    absoluteTitle: true,
    description:
      "Mustex Digitals engineers scalable software, websites, mobile apps, and AI automation that help startups and enterprises grow with confidence.",
    keywords: sharedKeywords,
    path: "/",
    category: "Software Development",
    jsonLd: ["organization", "localBusiness", "professionalService", "website"],
    breadcrumb: [{ name: "Home", path: "/" }],
  },
  about: {
    title: "About Mustex Digitals",
    absoluteTitle: true,
    description:
      "Learn how Mustex Digitals partners with ambitious teams to design, build, and scale resilient software products powered by modern engineering and AI.",
    keywords: [
      ...sharedKeywords,
      "About Mustex Digitals",
      "Software Company Pakistan",
    ],
    path: "/about",
    category: "Company",
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  },
  services: {
    title: "Software Development Services | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Explore Mustex Digitals software services — web, full stack, mobile, AI automation, UI/UX, cloud, and custom platforms engineered for growth.",
    keywords: [
      ...sharedKeywords,
      "Software Development Services",
      "Custom Software Services",
    ],
    path: "/services",
    category: "Services",
    jsonLd: ["organization", "breadcrumb", "professionalService"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  },
  work: {
    title: "Portfolio | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Browse featured Mustex Digitals projects spanning modern websites, product platforms, mobile experiences, and AI-powered business systems.",
    keywords: [
      ...sharedKeywords,
      "Software Portfolio",
      "Case Studies",
      "Featured Work",
    ],
    path: "/work",
    category: "Portfolio",
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/work" },
    ],
  },
  contact: {
    title: "Contact Mustex Digitals",
    absoluteTitle: true,
    description:
      "Contact Mustex Digitals to discuss software development, AI automation, timelines, and partnerships. We respond quickly during business hours.",
    keywords: [
      ...sharedKeywords,
      "Contact Mustex Digitals",
      "Hire Software Developers",
    ],
    path: "/contact",
    category: "Contact",
    jsonLd: ["organization", "contact", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  },
  startProject: {
    title: "Start Your Project | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Start your Mustex Digitals project in minutes — share your service needs, budget, timeline, and goals for a tailored software proposal.",
    keywords: [
      ...sharedKeywords,
      "Start a Software Project",
      "Get a Quote",
      "Project Inquiry",
    ],
    path: "/start-project",
    category: "Conversion",
    jsonLd: ["organization", "contact", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Start Project", path: "/start-project" },
    ],
  },
  industries: {
    title: "Industries We Serve | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Mustex Digitals delivers software for startups, enterprises, ecommerce, healthcare-ready workflows, and digital-first organizations worldwide.",
    keywords: [
      ...sharedKeywords,
      "Industry Software Solutions",
      "Enterprise Digital Transformation",
    ],
    path: "/industries",
    category: "Industries",
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/industries" },
    ],
  },
  technology: {
    title: "Technology Stack | Mustex Digitals",
    absoluteTitle: true,
    description:
      "See the modern technology stack Mustex Digitals uses — React, Next.js, Node.js, Flutter, cloud platforms, and AI tooling for resilient products.",
    keywords: [
      ...sharedKeywords,
      "Technology Stack",
      "React Next.js",
      "Node.js",
    ],
    path: "/technology",
    category: "Technology",
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Technology", path: "/technology" },
    ],
  },
  process: {
    title: "Development Process | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Discover Mustex Digitals’s structured development process — discovery, design, engineering, launch, and long-term product support.",
    keywords: [
      ...sharedKeywords,
      "Software Development Process",
      "Agile Delivery",
    ],
    path: "/process",
    category: "Process",
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Process", path: "/process" },
    ],
  },
  faq: {
    title: "FAQ | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Answers to common questions about Mustex Digitals services, technologies, timelines, support, and how we build custom software.",
    keywords: [...sharedKeywords, "Software Development FAQ", "Mustex FAQ"],
    path: "/faq",
    category: "Support",
    jsonLd: ["organization", "faq", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ],
  },
  privacy: {
    title: "Privacy Policy | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Read the Mustex Digitals privacy policy to understand how we collect, use, and protect personal information across our website and services.",
    keywords: ["Privacy Policy", "Mustex Digitals", "Data Protection"],
    path: "/legal/privacy",
    category: "Legal",
    robots: { index: true, follow: true },
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/legal/privacy" },
    ],
  },
  terms: {
    title: "Terms of Service | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Review Mustex Digitals terms of service covering website use, engagements, intellectual property, and client responsibilities.",
    keywords: ["Terms of Service", "Mustex Digitals", "Legal"],
    path: "/legal/terms",
    category: "Legal",
    robots: { index: true, follow: true },
    jsonLd: ["organization", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Terms of Service", path: "/legal/terms" },
    ],
  },
  webDevelopment: {
    title: "Professional Web Development Services | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Professional web development from Mustex Digitals — fast, accessible, conversion-focused business websites engineered with modern frameworks.",
    keywords: [
      ...sharedKeywords,
      "Web Development Services",
      "Business Website Development",
    ],
    path: "/services/web-development",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Web Development", path: "/services/web-development" },
    ],
  },
  fullStack: {
    title: "Full Stack Development Company | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Partner with Mustex Digitals for full stack development — scalable APIs, modern frontends, and reliable cloud-ready application architecture.",
    keywords: [
      ...sharedKeywords,
      "Full Stack Development Company",
      "Custom Web Applications",
    ],
    path: "/services/full-stack-development",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      {
        name: "Full Stack Development",
        path: "/services/full-stack-development",
      },
    ],
  },
  mobile: {
    title: "Mobile App Development Company | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Mustex Digitals builds high-quality mobile apps with Flutter and modern tooling — polished UX, performance, and long-term maintainability.",
    keywords: [
      ...sharedKeywords,
      "Mobile App Development Company",
      "Flutter App Development",
    ],
    path: "/services/mobile-app-development",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      {
        name: "Mobile App Development",
        path: "/services/mobile-app-development",
      },
    ],
  },
  aiAutomation: {
    title: "AI Automation Solutions | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Deploy AI automation solutions with Mustex Digitals — intelligent workflows, agents, and integrations that reduce manual work and scale operations.",
    keywords: [
      ...sharedKeywords,
      "AI Automation Solutions",
      "AI Agents",
      "Business Automation",
    ],
    path: "/services/ai-automation",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "AI Automation", path: "/services/ai-automation" },
    ],
  },
  digitalMarketing: {
    title: "Digital Marketing Services | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Grow with Mustex Digitals digital marketing services — strategy, campaigns, and conversion-focused experiences aligned to your product goals.",
    keywords: [
      ...sharedKeywords,
      "Digital Marketing Services",
      "Growth Marketing",
    ],
    path: "/services/digital-marketing",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Digital Marketing", path: "/services/digital-marketing" },
    ],
  },
  cloudSolutions: {
    title: "Cloud Solutions | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Modern cloud solutions from Mustex Digitals — secure infrastructure, scalable deployments, and reliable platforms for growing digital products.",
    keywords: [...sharedKeywords, "Cloud Solutions", "Cloud Engineering"],
    path: "/services/cloud-solutions",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Cloud Solutions", path: "/services/cloud-solutions" },
    ],
  },
  uiUxDesign: {
    title: "UI/UX Design Services | Mustex Digitals",
    absoluteTitle: true,
    description:
      "UI/UX design services from Mustex Digitals — clear product interfaces, design systems, and user journeys that convert without clutter.",
    keywords: [...sharedKeywords, "UI UX Design Services", "Product Design"],
    path: "/services/ui-ux-design",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "UI/UX Design", path: "/services/ui-ux-design" },
    ],
  },
  customSoftware: {
    title: "Custom Software Development | Mustex Digitals",
    absoluteTitle: true,
    description:
      "Custom software development by Mustex Digitals — tailored platforms, ERP/CRM workflows, and digital systems built around your business.",
    keywords: [
      ...sharedKeywords,
      "Custom Software Development",
      "ERP",
      "CRM",
    ],
    path: "/services/custom-software",
    category: "Services",
    jsonLd: ["organization", "service", "breadcrumb"],
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Custom Software", path: "/services/custom-software" },
    ],
  },
} as const satisfies Record<SeoRouteKey, SeoPageConfig>;

/** Map service slug → SEO page key for known services */
export const serviceSlugSeoKey: Record<string, SeoRouteKey> = {
  "web-development": "webDevelopment",
  "full-stack-development": "fullStack",
  "mobile-app-development": "mobile",
  "ai-automation": "aiAutomation",
  "digital-marketing": "digitalMarketing",
  "cloud-solutions": "cloudSolutions",
  "ui-ux-design": "uiUxDesign",
  "custom-software": "customSoftware",
};

/** Sitemap entries with change frequency and priority */
export const seoSitemapEntries: Array<{
  path: SeoPageConfig["path"];
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/web-development", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/services/full-stack-development",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/mobile-app-development",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/services/ai-automation", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/services/digital-marketing",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  { path: "/services/cloud-solutions", changeFrequency: "monthly", priority: 0.75 },
  { path: "/services/ui-ux-design", changeFrequency: "monthly", priority: 0.75 },
  {
    path: "/services/custom-software",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/work", changeFrequency: "weekly", priority: 0.85 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.7 },
  { path: "/technology", changeFrequency: "monthly", priority: 0.7 },
  { path: "/process", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.65 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/start-project", changeFrequency: "weekly", priority: 0.95 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
];
