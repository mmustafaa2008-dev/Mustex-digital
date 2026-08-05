import type { ProjectsContent } from "@/types/content";

import { getFeaturedPortfolioProjects } from "./service-projects";

const featuredPortfolioItems = getFeaturedPortfolioProjects();

/**
 * Portfolio / case-study projects for cards and work sections.
 * Sourced from the real, verified service portfolios — no placeholder demos.
 */
export const projects: ProjectsContent = {
  section: {
    title: "Engineered Excellence: Our Portfolio",
    description:
      "Delivering world-class digital solutions that redefine industry standards. Precision engineering meets premium design for uncompromising performance.",
  },
  featuredSection: {
    title: "Featured Work",
    description:
      "Explore a selection of digital products and software solutions crafted with modern technologies and exceptional attention to detail.",
  },
  items: featuredPortfolioItems,
  cta: {
    title: "Have a vision? Let's build it.",
    description:
      "Partner with our engineering team to transform complex challenges into elegant, high-performance solutions.",
    primary: {
      label: "Start a Conversation",
      href: "/contact",
    },
    secondary: {
      label: "Explore Our Work",
      href: "/work",
    },
  },
};

export function getProjectBySlug(slug: string) {
  return projects.items.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.items.filter(
    (project) => "featured" in project && project.featured,
  );
}
