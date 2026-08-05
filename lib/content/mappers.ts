import type { FaqItemProps } from "@/components/cards/faq-item";
import type { IndustryCardProps } from "@/components/cards/industry-card";
import type { ProjectCardProps } from "@/components/cards/project-card";
import type { ServiceCardProps } from "@/components/cards/service-card";
import type { TechnologyBadgeProps } from "@/components/cards/technology-badge";
import type { SiteFooterViewProps } from "@/components/footer/types";
import type { NavbarPropsBase } from "@/components/navigation/types";
import {
  buildProjectLinks,
  resolveProjectThumbnail,
} from "@/lib/projects";
import type {
  FaqItemContent,
  FooterContent,
  IndustryContent,
  NavigationContent,
  ProjectContent,
  ServiceContent,
  TechnologyContent,
} from "@/types/content";

import { formatContentTemplate } from "./format";

export function toServiceCardProps(
  service: ServiceContent,
): ServiceCardProps {
  return {
    title: service.title,
    description: service.description,
    icon: service.icon,
    href: service.href,
    ctaLabel: service.ctaLabel,
    tags: service.tags ? [...service.tags] : undefined,
    featured: service.featured,
  };
}

export function toProjectCardProps(
  project: ProjectContent,
): ProjectCardProps {
  return {
    title: project.title,
    description: project.description,
    imageSrc: resolveProjectThumbnail(project),
    imageAlt: project.imageAlt ?? `${project.title} preview`,
    category: project.category,
    technologies: [...project.technologies],
    href: project.href,
    ctaLabel: project.ctaLabel,
    meta: project.meta,
    status: project.status,
    links: buildProjectLinks(project),
  };
}

export function toIndustryCardProps(
  industry: IndustryContent,
): IndustryCardProps {
  return {
    title: industry.title,
    description: industry.description,
    icon: industry.icon,
    href: industry.href,
  };
}

export function toFaqItemProps(item: FaqItemContent): FaqItemProps {
  return {
    question: item.question,
    answer: item.answer,
    value: item.id,
  };
}

export function toTechnologyBadgeProps(
  technology: TechnologyContent,
): TechnologyBadgeProps {
  return {
    label: technology.label,
    icon: technology.icon,
  };
}

export function toNavbarProps(
  content: NavigationContent,
): Pick<NavbarPropsBase, "items" | "cta" | "labels"> {
  return {
    items: [...content.items],
    cta: { ...content.cta },
    labels: { ...content.labels },
  };
}

export function toSiteFooterProps(content: FooterContent): SiteFooterViewProps {
  return {
    company: {
      name: content.company.name,
      description: content.company.description,
      tagline: content.company.tagline,
    },
    quickLinks: {
      title: content.companyLinks.title,
      links: content.companyLinks.links.map((link) => ({ ...link })),
    },
    services: {
      title: content.serviceLinks.title,
      links: content.serviceLinks.links.map((link) => ({ ...link })),
    },
    socialLinks: content.social.links.map((link) => ({
      label: link.label,
      href: link.href,
      icon: link.icon,
    })),
    socialLabel: content.social.label,
    contact: {
      title: content.contact.title,
      email: content.contact.email,
      phone: content.contact.phone,
      address: content.contact.address,
      hours: content.contact.hours,
      website: content.contact.website,
      websiteLabel: content.contact.websiteLabel,
    },
    newsletter: { ...content.newsletter },
    legalLinks: content.legalLinks.map((link) => ({ ...link })),
    copyright: formatContentTemplate(content.copyrightTemplate),
    credit: content.credit,
  };
}
