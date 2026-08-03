import {
  BadgeCheck,
  Handshake,
  Lightbulb,
  Lock,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import type { CommitmentContent } from "@/types/content";

/**
 * Our Commitment — metrics, quality pillars, and trust indicators.
 */
export const commitment = {
  section: {
    eyebrow: "Our Commitment",
    title: "Built on Excellence",
    description:
      "Every project is built with quality, transparency, and long-term partnerships at its core. We engineer solutions designed to last.",
  },
  metrics: [
    {
      id: "projects-delivered",
      label: "Projects Delivered",
      value: "Growing",
      description: "Shipping products that create lasting impact.",
    },
    {
      id: "client-focus",
      label: "Client Focus",
      value: "100%",
      description: "Dedicated partnership on every engagement.",
    },
    {
      id: "technologies",
      label: "Technologies",
      value: "15+",
      description: "Modern stack for resilient systems.",
    },
    {
      id: "support",
      label: "Support",
      value: "Long-Term",
      description: "Ongoing guidance beyond launch.",
    },
  ],
  qualities: [
    {
      id: "quality-first",
      title: "Quality First",
      description:
        "Every solution is designed with clean architecture, maintainable code, and modern engineering standards.",
      icon: BadgeCheck,
    },
    {
      id: "transparent-communication",
      title: "Transparent Communication",
      description:
        "We believe clear communication and regular collaboration create successful digital products.",
      icon: MessageSquare,
    },
    {
      id: "scalable-solutions",
      title: "Scalable Solutions",
      description:
        "Every application is built to support future growth without compromising performance.",
      icon: TrendingUp,
    },
    {
      id: "performance-security",
      title: "Performance & Security",
      description:
        "Speed, reliability, and secure development practices are part of every project we deliver.",
      icon: Lock,
    },
    {
      id: "long-term-partnership",
      title: "Long-Term Partnership",
      description:
        "Our relationship doesn't end after deployment. We continue supporting businesses as they grow.",
      icon: Handshake,
    },
    {
      id: "continuous-innovation",
      title: "Continuous Innovation",
      description:
        "We continuously learn, improve, and adopt modern technologies to deliver better digital experiences.",
      icon: Lightbulb,
    },
  ],
  trustIndicators: [
    {
      id: "engineering-standards",
      label: "Engineering Standards",
      value: "Enterprise",
    },
    {
      id: "delivery-model",
      label: "Delivery Model",
      value: "Transparent",
    },
    {
      id: "partnership",
      label: "Partnership",
      value: "Long-Term",
    },
    {
      id: "quality-bar",
      label: "Quality Bar",
      value: "Uncompromising",
    },
  ],
  cta: {
    title: "Committed to Building Software That Scales.",
    description:
      "At Mustex Digitals, we believe successful software is built through collaboration, innovation, and a relentless focus on quality.",
    primary: {
      label: "Let's Build Together",
      href: "/contact",
    },
  },
} as const satisfies CommitmentContent;
