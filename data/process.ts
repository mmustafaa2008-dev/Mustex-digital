import {
  Code2,
  Headphones,
  LayoutTemplate,
  Map,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";

import type { ProcessContent } from "@/types/content";

/**
 * Development process steps — timeline / ProcessCard source.
 */
export const process = {
  section: {
    title: "Our Development Process",
    description:
      "From the first conversation to long-term support, every project follows a structured process focused on quality, transparency, and scalability.",
  },
  steps: [
    {
      id: "discover",
      step: 1,
      title: "Discover",
      description: "Understanding business goals and requirements.",
      icon: Search,
    },
    {
      id: "strategy",
      step: 2,
      title: "Strategy",
      description: "Defining architecture, stack, and milestones.",
      icon: Map,
    },
    {
      id: "design",
      step: 3,
      title: "Design",
      description: "UI/UX experiences focused on usability.",
      icon: LayoutTemplate,
    },
    {
      id: "development",
      step: 4,
      title: "Development",
      description: "Scalable, high-performance applications.",
      icon: Code2,
    },
    {
      id: "testing",
      step: 5,
      title: "Testing",
      description: "Functionality, security, and performance.",
      icon: ShieldCheck,
    },
    {
      id: "deployment",
      step: 6,
      title: "Deployment",
      description: "Modern cloud infrastructure.",
      icon: Rocket,
    },
    {
      id: "support",
      step: 7,
      title: "Support",
      description: "Continuous maintenance and updates.",
      icon: Headphones,
    },
  ],
  cta: {
    title: "Let's build your next software product together.",
    description: "Every successful product starts with a great conversation.",
    primary: {
      label: "Start a Conversation",
      href: "/contact",
    },
  },
} as const satisfies ProcessContent;
