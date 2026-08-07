import type { FooterContent } from "@/types/content";

import { company } from "./company";
import { social } from "./social";

/**
 * Footer content composed from company, services, and social sources.
 */
export const footer = {
  company: {
    name: company.name,
    description: company.description,
    tagline: company.tagline,
  },
  companyLinks: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Featured Work", href: "/work" },
      { label: "Technology Stack", href: "/technology" },
      { label: "Development Process", href: "/process" },
      { label: "Industries", href: "/industries" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  serviceLinks: {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      {
        label: "Full Stack Development",
        href: "/services/full-stack-development",
      },
      {
        label: "Mobile App Development",
        href: "/services/mobile-app-development",
      },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Cloud Solutions", href: "/services/cloud-solutions" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "E-Commerce", href: "/services/ecommerce" },
      { label: "Website Maintenance", href: "/services/maintenance" },
    ],
  },
  social,
  contact: {
    title: "Connect",
    email: company.contact.email,
    address: company.contact.address,
    hours: company.contact.hours,
    website: company.contact.website,
    websiteLabel: company.contact.websiteLabel,
  },
  newsletter: {
    title: "Stay Updated",
    description:
      "Join our newsletter for the latest in scalable software, AI innovations, and engineering excellence.",
    placeholder: "Enter your email",
    submitLabel: "Subscribe",
    emailLabel: "Email address",
    successMessage: "Thank you for subscribing!",
    errorMessage: "Something went wrong. Please try again.",
  },
  legalLinks: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
  copyrightTemplate: company.copyrightTemplate,
  credit: company.credit,
} as const satisfies FooterContent;

/** @deprecated Prefer `footer` — kept for existing imports during migration. */
export const defaultFooterContent = footer;
