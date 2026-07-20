import {
  Bot,
  Cloud,
  Code2,
  Globe,
  LayoutDashboard,
  Layers,
  Megaphone,
  Network,
  Paintbrush,
  ShoppingCart,
  Smartphone,
  Wrench,
} from "lucide-react";

import type { ServicesContent } from "@/types/content";

/**
 * Service catalog consumed by cards, nav mega-menus, and footer links.
 */
export const services = {
  section: {
    title: "What We Build",
    description:
      "We create modern digital products, scalable software, and growth-focused solutions for startups, businesses, and enterprises.",
  },
  items: [
    {
      id: "web-development",
      slug: "web-development",
      title: "Web Development",
      shortDescription:
        "Modern business websites focused on performance, accessibility, and conversion.",
      description:
        "Modern business websites focused on ultimate performance, accessibility, and high conversion rates.",
      href: "/services/web-development",
      icon: Globe,
      tags: ["Next.js", "SEO", "Performance"],
      ctaLabel: "Learn more",
    },
    {
      id: "full-stack-development",
      slug: "full-stack-development",
      title: "Full Stack Development",
      shortDescription:
        "Custom web applications engineered with modern technologies and scalable architecture.",
      description:
        "Custom web applications engineered with modern technologies and scalable architecture to support your complex business logic.",
      href: "/services/full-stack-development",
      icon: Layers,
      tags: ["React", "Next.js", "Node.js"],
      featured: true,
      ctaLabel: "Learn more",
    },
    {
      id: "mobile-app-development",
      slug: "mobile-app-development",
      title: "Mobile App Development",
      shortDescription:
        "Reliable Flutter and native Android applications for the modern mobile ecosystem.",
      description:
        "Reliable, intuitive Flutter and native Android applications built for the modern mobile ecosystem.",
      href: "/services/mobile-app-development",
      icon: Smartphone,
      tags: ["Flutter", "Android", "Firebase"],
      ctaLabel: "Learn more",
    },
    {
      id: "ai-automation",
      slug: "ai-automation",
      title: "AI Automation",
      shortDescription:
        "AI-powered workflows and intelligent automations for digital transformation.",
      description:
        "AI-powered workflows and intelligent automations designed to drive digital transformation and efficiency.",
      href: "/services/ai-automation",
      icon: Bot,
      tags: ["OpenAI", "n8n", "Agents"],
      ctaLabel: "Learn more",
    },
    {
      id: "digital-marketing",
      slug: "digital-marketing",
      title: "Digital Marketing",
      shortDescription:
        "Social media execution, content planning, and measurable brand growth.",
      description:
        "Strategic social media execution, content planning, and measurable brand growth initiatives.",
      href: "/services/digital-marketing",
      icon: Megaphone,
      tags: ["Content", "Social", "Growth"],
      ctaLabel: "Learn more",
    },
    {
      id: "cloud-solutions",
      slug: "cloud-solutions",
      title: "Cloud Solutions",
      shortDescription:
        "Scalable cloud architecture, database design, and server management.",
      description:
        "Scalable cloud architecture, robust database design, and comprehensive server management.",
      href: "/services/cloud-solutions",
      icon: Cloud,
      tags: ["Cloud", "Databases", "DevOps"],
      ctaLabel: "Learn more",
    },
    {
      id: "ui-ux-design",
      slug: "ui-ux-design",
      title: "UI/UX Design",
      shortDescription:
        "Beautiful experiences prioritizing usability, interaction, and brand alignment.",
      description:
        "Beautiful user experiences prioritizing usability, modern interaction patterns, and brand alignment.",
      href: "/services/ui-ux-design",
      icon: Paintbrush,
      tags: ["Figma", "Design Systems"],
      ctaLabel: "Learn more",
    },
    {
      id: "custom-software",
      slug: "custom-software",
      title: "Custom Software",
      shortDescription:
        "Bespoke platforms and internal tools tailored to your workflows and growth stage.",
      description:
        "Bespoke platforms and internal tools engineered around your unique workflows, compliance needs, and long-term growth stage.",
      href: "/services/custom-software",
      icon: Code2,
      tags: ["Product", "Platforms", "Integrations"],
      featured: true,
      ctaLabel: "Learn more",
    },
    {
      id: "ecommerce",
      slug: "ecommerce",
      title: "E-Commerce Solutions",
      shortDescription:
        "Robust online stores with Shopify, WooCommerce, or custom platforms.",
      description:
        "Robust online stores using Shopify, WooCommerce, or entirely custom transactional technologies.",
      href: "/services/ecommerce",
      icon: ShoppingCart,
      tags: ["Shopify", "WooCommerce"],
      ctaLabel: "Learn more",
    },
    {
      id: "cms",
      slug: "cms",
      title: "CMS Development",
      shortDescription:
        "Flexible CMS solutions including WordPress, Wix, and headless systems.",
      description:
        "Flexible content management systems including WordPress, Wix, and headless custom solutions tailored to your editorial workflows.",
      href: "/services/cms",
      icon: LayoutDashboard,
      tags: ["WordPress", "Wix", "Headless"],
      featured: true,
      ctaLabel: "Learn more",
    },
    {
      id: "api",
      slug: "api",
      title: "API Development",
      shortDescription:
        "Secure REST APIs, GraphQL endpoints, and backend integrations.",
      description:
        "Secure REST APIs, GraphQL endpoints, and seamless backend systems integrations.",
      href: "/services/api",
      icon: Network,
      tags: ["REST", "GraphQL", "JWT"],
      ctaLabel: "Learn more",
    },
    {
      id: "maintenance",
      slug: "maintenance",
      title: "Website & Application Maintenance",
      shortDescription:
        "Security updates, monitoring, performance tuning, and technical support.",
      description:
        "Ongoing security updates, proactive monitoring, performance tuning, and dedicated technical support.",
      href: "/services/maintenance",
      icon: Wrench,
      tags: ["Support", "Security", "Performance"],
      featured: true,
      ctaLabel: "Learn more",
    },
  ],
  cta: {
    title: "Need a custom solution?",
    description:
      "Our engineering team is ready to architect and build your next major technical initiative. Let's discuss your requirements.",
    primary: {
      label: "Start a Conversation",
      href: "/contact",
    },
  },
} as const satisfies ServicesContent;

export function getServiceBySlug(slug: string) {
  return services.items.find((service) => service.slug === slug);
}

export function getAllServiceSlugs() {
  return services.items.map((service) => service.slug);
}

export function getFeaturedServices() {
  return services.items.filter(
    (service) => "featured" in service && service.featured,
  );
}
