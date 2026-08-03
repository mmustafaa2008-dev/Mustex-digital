import type { NavigationContent } from "@/types/content";

import { getServiceBySlug } from "./services";

const megaServiceDefs = [
  { slug: "web-development", label: "Web Development" },
  { slug: "full-stack-development", label: "Full Stack Development" },
  { slug: "mobile-app-development", label: "Mobile App Development" },
  { slug: "ai-automation", label: "AI Automation" },
  { slug: "digital-marketing", label: "Digital Marketing" },
  { slug: "cloud-solutions", label: "Cloud Solutions" },
  { slug: "ui-ux-design", label: "UI/UX Design" },
  { slug: "custom-software", label: "Custom Software" },
] as const;

function resolveMegaServices() {
  return megaServiceDefs.map((def) => {
    const service = getServiceBySlug(def.slug);
    if (!service) {
      throw new Error(`Missing service for mega menu slug: ${def.slug}`);
    }

    return {
      label: def.label,
      href: service.href,
      description: service.shortDescription,
      icon: service.icon,
    };
  });
}

/**
 * Primary site navigation — App Router paths only (no hash links).
 */
export const navigation = {
  brandLabel: "Mustex Digitals",
  items: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
      columns: [
        {
          items: resolveMegaServices(),
        },
      ],
    },
    {
      label: "Projects",
      href: "/work",
    },
    {
      label: "Industries",
      href: "/industries",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  cta: {
    label: "Start Project",
    href: "/start-project",
  },
  secondaryCta: {
    label: "Explore Our Work",
    href: "/work",
  },
  labels: {
    searchPlaceholder: "Search Mustex Digitals",
    searchAriaLabel: "Search",
    openSearchLabel: "Open search",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    closeMenuOverlayLabel: "Close menu overlay",
    mobileNavLabel: "Mobile navigation",
    primaryNavLabel: "Primary",
    themeSwitchToLightLabel: "Switch to light theme",
    themeSwitchToDarkLabel: "Switch to dark theme",
  },
} as const satisfies NavigationContent;
