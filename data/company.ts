import {
  BadgeCheck,
  Cpu,
  Eye,
  Gauge,
  Globe2,
  Handshake,
  HeartHandshake,
  Layers,
  Lightbulb,
  Lock,
  Paintbrush,
  Rocket,
  Server,
  Shield,
} from "lucide-react";

import type { CompanyContent } from "@/types/content";

/**
 * Company identity, mission, values, and contact — single source of truth.
 */
export const company = {
  name: "Mustex Digital",
  legalName: "Mustex Digital",
  tagline: "Building Software That Scales",
  description:
    "Mustex Digital builds scalable software, modern websites, mobile applications, AI solutions, and digital experiences that help businesses grow.",
  shortDescription:
    "Engineering modern software for ambitious businesses worldwide.",
  url: "https://mustex.com",
  contact: {
    email: "mustexdigital@gmail.com",
    website: "https://mustex.com",
    websiteLabel: "mustex.com",
    address: "Global · Remote-first",
    hours: "Mon–Fri, 9:00–18:00",
  },
  hero: {
    headline: "Building Software That Scales.",
    description:
      "Mustex Digital partners with global enterprises to architect and deploy resilient digital products through world-class software engineering and AI-driven innovation.",
    primaryCta: {
      label: "Start Your Project",
      href: "/start-project",
    },
    secondaryCta: {
      label: "Explore Our Work",
      href: "/work",
    },
    trustIndicators: [
      {
        id: "projects-delivered",
        label: "Projects Delivered",
        value: "Growing",
      },
      {
        id: "client-focus",
        label: "Client Focus",
        value: "100%",
      },
      {
        id: "technologies",
        label: "Technologies",
        value: "15+",
      },
    ],
    visualAriaLabel:
      "Animated AI software dashboard showing live metrics, charts, and system health",
  },
  about: {
    title: "Who We Are",
    headline: "Engineering modern software for ambitious businesses worldwide.",
    body: "At Mustex Digital, we specialize in building intelligent, scalable products that define the future of technology. Our approach merges technical excellence with premium innovation, creating high-end, specialized software solutions for sophisticated architectures.",
    valuesTitle: "Our Core Values",
    image: {
      alt: "Abstract composition of glowing glass panels and geometric systems representing Mustex Digital engineering architecture",
    },
  },
  mission: {
    title: "Mission",
    description:
      "Deliver world-class software that powers the next generation of industry leaders.",
    icon: Rocket,
  },
  vision: {
    title: "Vision",
    description:
      "Become a globally trusted partner for complex engineering and digital transformation.",
    icon: Globe2,
  },
  values: [
    {
      id: "innovation",
      title: "Innovation",
      description:
        "Pushing boundaries with cutting-edge architectures and forward-thinking engineering.",
      icon: Lightbulb,
    },
    {
      id: "quality",
      title: "Quality",
      description:
        "Uncompromising standards in every line of code, ensuring robust and elegant systems.",
      icon: BadgeCheck,
    },
    {
      id: "scalability",
      title: "Scalability",
      description:
        "Building foundations designed to grow seamlessly with your ambitious business.",
      icon: Layers,
    },
    {
      id: "transparency",
      title: "Transparency",
      description:
        "Clear communication and open processes throughout the entire development lifecycle.",
      icon: Eye,
    },
    {
      id: "security",
      title: "Security",
      description:
        "Enterprise-grade protection embedded deeply into every layer of our infrastructure.",
      icon: Shield,
    },
    {
      id: "long-term-partnership",
      title: "Long-Term Partnership",
      description:
        "Committed to your enduring success through ongoing support and strategic evolution.",
      icon: Handshake,
    },
  ],
  whyChoose: {
    eyebrow: "The Mustex Advantage",
    title: "Why Choose Mustex",
    description:
      "We combine modern engineering, thoughtful design, and long-term partnerships to build digital products that create real business impact.",
    cta: {
      title: "Built for ambitious businesses.",
      description:
        "Ready to transform your digital presence? Let's discuss how our engineering and design teams can accelerate your growth.",
      primary: {
        label: "Explore Our Work",
        href: "/work",
      },
    },
  },
  advantages: [
    {
      id: "scalable-architecture",
      title: "Scalable Architecture",
      description:
        "Applications designed to grow with your business, built on resilient cloud-native foundations.",
      icon: Server,
    },
    {
      id: "modern-technology",
      title: "Modern Technology",
      description:
        "Built using industry-leading technologies and frameworks to ensure long-term viability.",
      icon: Cpu,
    },
    {
      id: "performance-first",
      title: "Performance First",
      description:
        "Fast loading experiences optimized for speed, delivering exceptional core web vitals.",
      icon: Gauge,
    },
    {
      id: "security-reliability",
      title: "Security & Reliability",
      description:
        "Secure authentication, data encryption, and protected infrastructure for enterprise needs.",
      icon: Lock,
    },
    {
      id: "user-centered-design",
      title: "User-Centered Design",
      description:
        "Beautiful interfaces focused on usability, accessibility, and intuitive user journeys.",
      icon: Paintbrush,
    },
    {
      id: "long-term-partnership-advantage",
      title: "Long-Term Partnership",
      description:
        "Ongoing support, iterative improvements, and strategic technical guidance.",
      icon: HeartHandshake,
    },
  ],
  stats: [
    {
      id: "projects-delivered",
      label: "Projects Delivered",
      value: "Growing",
    },
    {
      id: "client-focus",
      label: "Client Focus",
      value: "100%",
    },
    {
      id: "technologies",
      label: "Technologies",
      value: "15+",
    },
    {
      id: "support",
      label: "Support",
      value: "Long-Term",
    },
  ],
  copyrightTemplate: "© {year} Mustex Digital",
  credit: "Designed & Engineered by Mustex Digital",
} as const satisfies CompanyContent;
