import type { LucideIcon } from "lucide-react";

/** Shared content primitives */

export type ContentId = string;

export type ContentSlug = string;

export type ContentLink = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
  icon?: LucideIcon;
};

export type ContentCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description: string;
};

export type ContentStat = {
  id: ContentId;
  label: string;
  value: string;
  description?: string;
};

export type ContentValue = {
  id: ContentId;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type ContentAdvantage = {
  id: ContentId;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type WhyChooseContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type CompanyContact = {
  email: string;
  phone?: string;
  website: string;
  websiteLabel: string;
  address?: string;
  hours?: string;
};

export type HeroContent = {
  /** Optional — omitted from homepage to avoid duplicate branding with the navbar lockup */
  eyebrow?: string;
  headline: string;
  description: string;
  primaryCta: ContentCta;
  secondaryCta: ContentCta;
  trustIndicators: ContentStat[];
  visualAriaLabel: string;
};

export type CompanyContent = {
  name: string;
  legalName?: string;
  tagline: string;
  description: string;
  shortDescription: string;
  url: string;
  contact: CompanyContact;
  hero: HeroContent;
  about: {
    title: string;
    headline: string;
    body: string;
    valuesTitle: string;
    image: {
      src?: string;
      alt: string;
    };
  };
  mission: {
    title: string;
    description: string;
    icon?: LucideIcon;
  };
  vision: {
    title: string;
    description: string;
    icon?: LucideIcon;
  };
  values: ContentValue[];
  whyChoose: WhyChooseContent;
  advantages: ContentAdvantage[];
  stats: ContentStat[];
  copyrightTemplate: string;
  credit: string;
};

export type ServiceContent = {
  id: ContentId;
  slug: ContentSlug;
  title: string;
  shortDescription: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  tags?: string[];
  featured?: boolean;
  ctaLabel: string;
};

export type ServicesContent = {
  section: SectionIntro;
  items: ServiceContent[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
};

export type ProjectContent = {
  id: ContentId;
  slug: ContentSlug;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  href?: string;
  ctaLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
  meta?: string;
  liveUrl?: string;
  designUrl?: string;
  dashboardUrl?: string;
  status?: "live" | "coming-soon" | "in-development" | "available-on-request";
  links?: ProjectLink[];
  serviceSlug?: string;
};

/**
 * Minimal per-service portfolio: one-line subtitle + project cards only.
 */
export type ServicePortfolioContent = {
  /** One-line subtitle shown under the service title */
  subtitle: string;
  /** Eyebrow label above the project grid — defaults to "Projects" */
  sectionLabel?: string;
  items: ProjectContent[];
};

export type ProjectsContent = {
  section: SectionIntro;
  featuredSection: SectionIntro;
  items: ProjectContent[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
    secondary?: ContentCta;
  };
};

export type IndustryContent = {
  id: ContentId;
  slug: ContentSlug;
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
};

export type IndustriesContent = {
  section: SectionIntro;
  items: IndustryContent[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type FaqItemContent = {
  id: ContentId;
  question: string;
  answer: string;
  category?: string;
};

export type FaqContent = {
  section: SectionIntro;
  items: FaqItemContent[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type TechnologyCategoryId =
  | "frontend"
  | "backend"
  | "databases"
  | "mobile"
  | "cms-ecommerce"
  | "design"
  | "devtools"
  | "ai-automation";

export type TechnologyContent = {
  id: ContentId;
  label: string;
  categoryId: TechnologyCategoryId;
  icon?: LucideIcon;
};

export type TechnologyCategoryContent = {
  id: TechnologyCategoryId;
  title: string;
  icon?: LucideIcon;
};

export type TechnologiesContent = {
  section: SectionIntro;
  categories: TechnologyCategoryContent[];
  items: TechnologyContent[];
};

export type ProcessStepContent = {
  id: ContentId;
  step: number;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type ProcessContent = {
  section: SectionIntro;
  steps: ProcessStepContent[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type CommitmentQualityContent = {
  id: ContentId;
  title: string;
  description: string;
  icon?: LucideIcon;
};

export type CommitmentContent = {
  section: SectionIntro;
  metrics: ContentStat[];
  qualities: CommitmentQualityContent[];
  trustIndicators: ContentStat[];
  cta: {
    title: string;
    description: string;
    primary: ContentCta;
  };
};

export type ConversionContent = {
  section: SectionIntro;
  /** Gradient-accented portion of the headline */
  titleAccent: string;
  primaryCta: ContentCta;
  secondaryCta: ContentCta;
  trustIndicators: ContentStat[];
};

export type NavLinkContent = ContentLink;

export type NavDropdownContent = {
  label: string;
  href?: string;
  items: NavLinkContent[];
};

export type MegaMenuColumnContent = {
  title?: string;
  items: NavLinkContent[];
};

export type MegaMenuContent = {
  label: string;
  href?: string;
  columns: MegaMenuColumnContent[];
  featured?: {
    title: string;
    description: string;
    href: string;
    ctaLabel?: string;
  };
};

export type NavItemContent =
  | NavLinkContent
  | NavDropdownContent
  | MegaMenuContent;

export type NavigationLabels = {
  searchPlaceholder: string;
  searchAriaLabel: string;
  openSearchLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  closeMenuOverlayLabel: string;
  mobileNavLabel: string;
  primaryNavLabel: string;
  themeSwitchToLightLabel: string;
  themeSwitchToDarkLabel: string;
};

export type NavigationContent = {
  brandLabel: string;
  items: NavItemContent[];
  cta: ContentCta;
  secondaryCta?: ContentCta;
  labels: NavigationLabels;
};

export type SocialPlatformId = "github" | "linkedin" | "x";

export type SocialLinkContent = {
  id: SocialPlatformId;
  label: string;
  href: string;
  icon: LucideIcon;
};

export type SocialContent = {
  label: string;
  links: SocialLinkContent[];
};

export type FooterLinkGroupContent = {
  title: string;
  links: ContentLink[];
};

export type FooterNewsletterContent = {
  title: string;
  description: string;
  placeholder: string;
  submitLabel: string;
  emailLabel: string;
  successMessage: string;
  errorMessage: string;
};

export type FooterContent = {
  company: {
    name: string;
    description: string;
    tagline: string;
  };
  companyLinks: FooterLinkGroupContent;
  serviceLinks: FooterLinkGroupContent;
  social: SocialContent;
  contact: {
    title: string;
    email: string;
    phone?: string;
    address?: string;
    hours?: string;
    website?: string;
    websiteLabel?: string;
  };
  newsletter: FooterNewsletterContent;
  legalLinks: ContentLink[];
  copyrightTemplate: string;
  credit: string;
};

/** Type guards for navigation content */

export function isNavDropdownContent(
  item: NavItemContent,
): item is NavDropdownContent {
  return "items" in item && Array.isArray(item.items);
}

export function isMegaMenuContent(item: NavItemContent): item is MegaMenuContent {
  return "columns" in item && Array.isArray(item.columns);
}
