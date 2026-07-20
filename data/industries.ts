import {
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

import type { IndustriesContent } from "@/types/content";

/**
 * Industry verticals served by Mustex Digital.
 */
export const industries = {
  section: {
    title: "Industries We Serve",
    description:
      "Helping businesses across industries build scalable digital products and modern technology solutions.",
  },
  items: [
    {
      id: "startup-saas",
      slug: "startup-saas",
      title: "Startup & SaaS",
      description:
        "Helping startups build scalable digital products from idea to launch.",
      href: "/industries/startup-saas",
      icon: Rocket,
    },
    {
      id: "healthcare",
      slug: "healthcare",
      title: "Healthcare",
      description:
        "Secure and modern digital experiences for healthcare providers and clinics.",
      href: "/industries/healthcare",
      icon: HeartPulse,
    },
    {
      id: "education",
      slug: "education",
      title: "Education",
      description:
        "Learning platforms, management systems, and educational technology.",
      href: "/industries/education",
      icon: GraduationCap,
    },
    {
      id: "real-estate",
      slug: "real-estate",
      title: "Real Estate",
      description:
        "Property management platforms, business websites, and digital experiences.",
      href: "/industries/real-estate",
      icon: Building2,
    },
    {
      id: "restaurants-hospitality",
      slug: "restaurants-hospitality",
      title: "Restaurants & Hospitality",
      description:
        "Restaurant websites, ordering systems, reservations, and customer engagement.",
      href: "/industries/restaurants-hospitality",
      icon: UtensilsCrossed,
    },
    {
      id: "retail-ecommerce",
      slug: "retail-ecommerce",
      title: "Retail & E-Commerce",
      description:
        "Online stores, inventory systems, and modern shopping experiences.",
      href: "/industries/retail-ecommerce",
      icon: Store,
    },
    {
      id: "finance-business",
      slug: "finance-business",
      title: "Finance & Business",
      description:
        "Business platforms, dashboards, reporting systems, and secure applications.",
      href: "/industries/finance-business",
      icon: Landmark,
    },
    {
      id: "logistics-transportation",
      slug: "logistics-transportation",
      title: "Logistics & Transportation",
      description:
        "Management systems, tracking platforms, and workflow automation.",
      href: "/industries/logistics-transportation",
      icon: Truck,
    },
    {
      id: "manufacturing",
      slug: "manufacturing",
      title: "Manufacturing",
      description:
        "Internal management software, ERP solutions, and operational dashboards.",
      href: "/industries/manufacturing",
      icon: Factory,
    },
    {
      id: "professional-services",
      slug: "professional-services",
      title: "Professional Services",
      description:
        "Corporate websites, client portals, booking systems, and business applications.",
      href: "/industries/professional-services",
      icon: Briefcase,
    },
  ],
  cta: {
    title: "Every industry has unique challenges.",
    description:
      "We adapt our engineering approach to your domain, compliance needs, and growth stage.",
    primary: {
      label: "Talk to Our Team",
      href: "/contact",
    },
  },
} as const satisfies IndustriesContent;

export function getIndustryBySlug(slug: string) {
  return industries.items.find((industry) => industry.slug === slug);
}
