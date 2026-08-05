import type { ProjectContent, ServicePortfolioContent } from "@/types/content";

function project(
  data: Omit<ProjectContent, "href" | "ctaLabel"> & {
    href?: string;
    ctaLabel?: string;
  },
): ProjectContent {
  const inferredHref =
    data.href ?? data.liveUrl ?? data.designUrl ?? data.dashboardUrl;

  return {
    ...data,
    href: inferredHref,
    ctaLabel: inferredHref ? data.ctaLabel ?? "View Project" : undefined,
  };
}

const webDevelopmentProjects: ProjectContent[] = [
  project({
    id: "happitech",
    slug: "happitech",
    serviceSlug: "web-development",
    title: "Happitech",
    category: "Healthcare Technology",
    description:
      "Enterprise healthcare platform redesign focused on user experience, accessibility and performance.",
    technologies: ["Figma", "Custom Development"],
    liveUrl: "https://happitech.com/",
    designUrl:
      "https://www.figma.com/file/Vilv4xKm9qqfcXtTuUMecw/Happitech-Website-2.0-UI-Design",
    imageSrc: "/images/portfolio/happitech.webp",
    imageAlt: "Happitech healthcare platform website preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "hammam-linen",
    slug: "hammam-linen",
    serviceSlug: "web-development",
    title: "Hammam Linen",
    category: "E-Commerce",
    description:
      "Premium online linen store with elegant shopping experience.",
    technologies: ["Figma", "Custom Development"],
    liveUrl: "https://hammamlinen.com/",
    designUrl:
      "https://www.figma.com/design/jTjCMMqE4GrdiiDw01ycYw/HammamLinen_c",
    imageAlt: "Hammam Linen e-commerce website preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "gatik-dashboard",
    slug: "gatik-dashboard",
    serviceSlug: "web-development",
    title: "Gatik Dashboard",
    category: "Logistics Dashboard",
    description:
      "Modern logistics dashboard with custom API integrations and enterprise workflows.",
    technologies: ["Figma", "Dashboard", "Custom API"],
    liveUrl: "https://gatik.ai/",
    designUrl:
      "https://www.figma.com/design/nt7we5w7AkUf6Zqm7hFjGA/Freelancer_Project-(API)",
    imageSrc: "/images/portfolio/gatik-dashboard.webp",
    imageAlt: "Gatik logistics dashboard preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "outlaw-biker-jewelry",
    slug: "outlaw-biker-jewelry",
    serviceSlug: "web-development",
    title: "Outlaw Biker Jewelry",
    category: "E-Commerce",
    description:
      "WooCommerce jewelry store with optimized checkout and performance enhancements.",
    technologies: ["WordPress", "WooCommerce", "Stripe", "PayPal"],
    liveUrl: "https://outlawbikerjewelry.com/",
    imageAlt: "Outlaw Biker Jewelry WooCommerce store preview",
    status: "live",
    featured: true,
  }),
];

const fullStackProjects: ProjectContent[] = [
  project({
    id: "jobreef",
    slug: "jobreef",
    serviceSlug: "full-stack-development",
    title: "Jobreef",
    category: "Recruitment Platform",
    description:
      "Multi-role recruitment platform connecting employers with candidates.",
    technologies: ["React", "Figma", "Vercel"],
    liveUrl: "https://jobreef.vercel.app/",
    designUrl:
      "https://www.figma.com/file/eCErFztU5u2erhNuioUcXX/Jobreef-Concepts",
    imageSrc: "/images/portfolio/jobreef.webp",
    imageAlt: "Jobreef recruitment platform preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "amiiigo",
    slug: "amiiigo",
    serviceSlug: "full-stack-development",
    title: "Amiiigo",
    category: "Community Platform",
    description:
      "Community management platform focused on communication, collaboration and moderation.",
    technologies: ["Figma"],
    designUrl: "https://www.figma.com/design/IDj1kwEJgppO7rOmrWpBLj",
    status: "in-development",
    imageAlt: "Amiiigo community platform design preview",
    featured: true,
  }),
];

const mobileAppProjects: ProjectContent[] = [
  project({
    id: "enterprise-mobile-applications",
    slug: "enterprise-mobile-applications",
    serviceSlug: "mobile-app-development",
    title: "Currently Working on Enterprise Mobile Applications",
    category: "Mobile Application",
    description:
      "Cross-platform and native enterprise mobile applications currently in active development.",
    technologies: ["Flutter", "Android", "Cross Platform"],
    status: "in-development",
    imageAlt: "Enterprise mobile application concept preview",
    featured: true,
  }),
];

const aiAutomationProjects: ProjectContent[] = [
  project({
    id: "ai-customer-support-agent",
    slug: "ai-customer-support-agent",
    serviceSlug: "ai-automation",
    title: "AI Customer Support Agent",
    category: "AI Automation",
    description:
      "Intelligent support agent handling customer inquiries, ticket routing and response automation.",
    technologies: ["OpenAI", "Automation", "Agents"],
    status: "in-development",
    imageAlt: "AI customer support agent concept preview",
    featured: true,
  }),
  project({
    id: "ai-workflow-automation",
    slug: "ai-workflow-automation",
    serviceSlug: "ai-automation",
    title: "AI Workflow Automation",
    category: "AI Automation",
    description:
      "Custom AI-driven workflow automation streamlining approvals, tasks and data processing.",
    technologies: ["n8n", "OpenAI", "Automation"],
    status: "in-development",
    imageAlt: "AI workflow automation concept preview",
    featured: true,
  }),
  project({
    id: "ai-document-processing-platform",
    slug: "ai-document-processing-platform",
    serviceSlug: "ai-automation",
    title: "AI Document Processing Platform",
    category: "AI Automation",
    description:
      "AI-powered platform for automated document parsing, classification and processing.",
    technologies: ["OpenAI", "OCR", "Automation"],
    status: "in-development",
    imageAlt: "AI document processing platform concept preview",
    featured: true,
  }),
];

const cloudSolutionsProjects: ProjectContent[] = [
  project({
    id: "enterprise-cloud-solutions",
    slug: "enterprise-cloud-solutions",
    serviceSlug: "cloud-solutions",
    title: "Currently Working on Enterprise Cloud Solutions",
    category: "Cloud Infrastructure",
    description:
      "Scalable enterprise cloud infrastructure and deployment solutions currently in development.",
    technologies: ["Cloud Architecture", "DevOps"],
    status: "in-development",
    imageAlt: "Enterprise cloud infrastructure concept preview",
    featured: true,
  }),
];

const digitalMarketingProjects: ProjectContent[] = [
  project({
    id: "marketing-portfolio",
    slug: "marketing-portfolio",
    serviceSlug: "digital-marketing",
    title: "Marketing Portfolio",
    category: "Confidential",
    description: "Portfolio available during client consultation.",
    technologies: [],
    status: "available-on-request",
    imageAlt: "Marketing campaigns confidential preview",
    featured: true,
  }),
];

const customSoftwareProjects: ProjectContent[] = [
  project({
    id: "double-leap",
    slug: "double-leap",
    serviceSlug: "custom-software",
    title: "Double Leap",
    category: "Transport Management",
    description:
      "Enterprise transport management platform with advanced TMS dashboard.",
    technologies: ["Custom Development", "Dashboard"],
    liveUrl: "https://doubleleapllc.com/",
    dashboardUrl: "https://tms.doubleleapllc.com/login",
    designUrl:
      "https://www.figma.com/design/1JjoX81nheR4tA9NqzktWw/Project_Transport-Service",
    imageSrc: "/images/portfolio/double-leap.webp",
    imageAlt: "Double Leap transport management platform preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "storytailors",
    slug: "storytailors",
    serviceSlug: "custom-software",
    title: "Storytailors",
    category: "Creative Agency",
    description:
      "Premium cinematic production website with immersive storytelling experience.",
    technologies: ["Figma", "Custom Development"],
    liveUrl: "https://storytailors.tv/",
    designUrl:
      "https://www.figma.com/file/LzEQ3aVKpJpzwyxGn6cecL/Storytailors",
    imageAlt: "Storytailors cinematic production website preview",
    status: "live",
    featured: true,
  }),
];

const uiUxProjects: ProjectContent[] = [
  project({
    id: "titan-fitness",
    slug: "titan-fitness",
    serviceSlug: "ui-ux-design",
    title: "Titan Fitness",
    category: "Fitness Website",
    description:
      "High-impact fitness brand website with bold typography and conversion-focused layouts.",
    technologies: ["Figma", "Custom Development"],
    liveUrl: "https://titan-fitness-gym-website.vercel.app/",
    imageSrc: "/images/portfolio/titan-fitness.webp",
    imageAlt: "Titan Fitness gym website preview",
    status: "live",
    featured: true,
  }),
  project({
    id: "ampm-global",
    slug: "ampm-global",
    serviceSlug: "ui-ux-design",
    title: "AMPM Global",
    category: "Logistics Platform",
    description:
      "Enterprise logistics platform UI with structured dashboards and operational workflows.",
    technologies: ["Figma"],
    designUrl:
      "https://www.figma.com/design/hTjvRv04F4ILKT2iTACHwC/AMPM-Global-Ltd",
    imageAlt: "AMPM Global logistics platform design preview",
    featured: true,
  }),
  project({
    id: "fix-on-call",
    slug: "fix-on-call",
    serviceSlug: "ui-ux-design",
    title: "Fix On Call",
    category: "Service Platform",
    description:
      "On-demand service platform interface designed for clarity, trust and fast booking flows.",
    technologies: ["Figma"],
    designUrl:
      "https://www.figma.com/design/O9vTfG90kw4MiNvxpl0g2c/FIX-ON-CALL",
    imageAlt: "Fix On Call service platform design preview",
    featured: true,
  }),
];

const servicePortfolios: Record<string, ServicePortfolioContent> = {
  "web-development": {
    subtitle:
      "Professional websites, business platforms, and e-commerce solutions built for performance.",
    items: webDevelopmentProjects,
  },
  "full-stack-development": {
    subtitle: "Modern scalable web applications and enterprise software.",
    items: fullStackProjects,
  },
  "mobile-app-development": {
    subtitle: "Cross-platform and native mobile applications.",
    items: mobileAppProjects,
  },
  "ai-automation": {
    subtitle: "AI-powered workflow automation and intelligent business systems.",
    items: aiAutomationProjects,
  },
  "digital-marketing": {
    subtitle: "Performance-driven marketing campaigns and brand growth.",
    items: digitalMarketingProjects,
  },
  "cloud-solutions": {
    subtitle: "Scalable cloud infrastructure and deployment solutions.",
    items: cloudSolutionsProjects,
  },
  "custom-software": {
    subtitle: "Enterprise software tailored for business workflows.",
    items: customSoftwareProjects,
  },
  "ui-ux-design": {
    subtitle: "Modern user experiences and interface design.",
    items: uiUxProjects,
  },
};

export function getServicePortfolio(
  serviceSlug: string,
): ServicePortfolioContent | undefined {
  return servicePortfolios[serviceSlug];
}

/**
 * Curated cross-service highlights for the homepage / main Projects page —
 * one flagship project per discipline, pulled from the real service portfolios.
 */
export function getFeaturedPortfolioProjects(): ProjectContent[] {
  const byId = (items: ProjectContent[], id: string) => {
    const found = items.find((item) => item.id === id);
    if (!found) {
      throw new Error(`Missing featured portfolio project: ${id}`);
    }
    return found;
  };

  return [
    byId(webDevelopmentProjects, "happitech"),
    byId(webDevelopmentProjects, "gatik-dashboard"),
    byId(fullStackProjects, "jobreef"),
    byId(customSoftwareProjects, "double-leap"),
    byId(uiUxProjects, "titan-fitness"),
  ];
}
