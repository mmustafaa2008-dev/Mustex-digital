import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type {
  ContentLink,
  FooterContent,
  FooterLinkGroupContent,
  FooterNewsletterContent,
} from "@/types/content";

export type FooterLink = ContentLink;

export type FooterLinkGroup = FooterLinkGroupContent;

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type FooterContactInfo = {
  title: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  website?: string;
  websiteLabel?: string;
};

export type FooterNewsletterConfig = FooterNewsletterContent & {
  onSubmit?: (email: string) => void | Promise<void>;
};

export type FooterCompanyInfo = {
  name: string;
  description?: string;
  tagline?: string;
  logo?: ReactNode;
};

/** Decomposed footer props — produced by `toSiteFooterProps`. */
export type SiteFooterViewProps = {
  company: FooterCompanyInfo;
  quickLinks?: FooterLinkGroup;
  services?: FooterLinkGroup;
  socialLinks?: FooterSocialLink[];
  socialLabel?: string;
  contact?: FooterContactInfo;
  newsletter?: FooterNewsletterConfig | false;
  legalLinks?: FooterLink[];
  copyright: string;
  credit?: string;
};

export type SiteFooterProps = {
  /** Footer content from `footer.ts` (default). */
  content?: FooterContent;
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
  className?: string;
};
