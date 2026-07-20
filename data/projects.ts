import type { ProjectsContent } from "@/types/content";

/**
 * Portfolio / case-study projects for cards and work sections.
 */
export const projects = {
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
  items: [
    {
      id: "aura-health",
      slug: "aura-health",
      title: "Aura Health",
      description:
        "Predictive analytics platform for healthcare providers, integrating vast datasets with real-time diagnostic AI models.",
      category: "Enterprise AI",
      technologies: ["Next.js", "PyTorch", "AWS"],
      href: "/work/aura-health",
      ctaLabel: "View Case Study",
      featured: true,
      imageAlt: "Aura Health predictive analytics dashboard preview",
    },
    {
      id: "nexus-pay",
      slug: "nexus-pay",
      title: "Nexus Pay",
      description:
        "A high-frequency trading interface designed for institutional investors, demanding zero latency and absolute precision.",
      category: "FinTech",
      technologies: ["React", "Go", "WebSockets"],
      href: "/work/nexus-pay",
      ctaLabel: "View Case Study",
      featured: true,
      meta: "Fintech Case Study",
      imageAlt: "Nexus Pay high-frequency trading interface preview",
    },
    {
      id: "vortex-protocol",
      slug: "vortex-protocol",
      title: "Vortex Protocol",
      description:
        "Decentralized asset management system featuring a custom glassmorphic UI and complex smart contract integration.",
      category: "Web3 Platform",
      technologies: ["Vue3", "Solidity", "Three.js"],
      href: "/work/vortex-protocol",
      ctaLabel: "View Case Study",
      featured: true,
      imageAlt: "Vortex Protocol decentralized asset management preview",
    },
    {
      id: "community-management-platform",
      slug: "community-management-platform",
      title: "Community Management Platform",
      description:
        "A modern community management platform built to streamline communication and administrative workflows. Designed for scale and performance, providing deep analytics and intuitive moderation tools in a premium dark-mode environment.",
      category: "Full Stack Web Application",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      href: "/work/community-management-platform",
      ctaLabel: "View Case Study",
      featured: true,
      imageAlt: "Community Management Platform dashboard preview",
    },
    {
      id: "corporate-business-website",
      slug: "corporate-business-website",
      title: "Business Website",
      description:
        "A premium responsive business website designed to strengthen online presence. Utilizing advanced layout techniques and micro-interactions to create a commanding brand narrative that converts visitors into enterprise clients.",
      category: "Corporate Website",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      href: "/work/corporate-business-website",
      ctaLabel: "View Case Study",
      featured: true,
      imageAlt: "Corporate business website homepage preview",
    },
    {
      id: "professional-business-platform",
      slug: "professional-business-platform",
      title: "Business Website",
      description:
        "A visually engaging business website designed with clean UI and strong branding. Built to establish market authority and provide a seamless, performant experience across all devices.",
      category: "Professional Business Platform",
      technologies: ["React", "Tailwind CSS", "Next.js"],
      href: "/work/professional-business-platform",
      ctaLabel: "View Case Study",
      featured: true,
      imageAlt: "Professional business platform interface preview",
    },
  ],
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
} as const satisfies ProjectsContent;

export function getProjectBySlug(slug: string) {
  return projects.items.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.items.filter(
    (project) => "featured" in project && project.featured,
  );
}
