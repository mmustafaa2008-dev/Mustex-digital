import type { FaqContent } from "@/types/content";

/**
 * Frequently asked questions for accordion sections.
 */
export const faq = {
  section: {
    title: "Frequently Asked Questions",
    description:
      "Everything you need to know before starting your next digital project with Mustex Digital.",
  },
  items: [
    {
      id: "services",
      question: "What services does Mustex Digital provide?",
      answer:
        "We build modern web applications, mobile apps, AI-powered solutions, business websites, e-commerce platforms, UI/UX designs, CMS solutions, and provide long-term maintenance and digital support.",
      category: "general",
    },
    {
      id: "technologies",
      question: "Which technologies do you use?",
      answer:
        "Our solutions are built using modern technologies including React, Next.js, Node.js, Express, MongoDB, MySQL, Flutter, Firebase, Tailwind CSS, WordPress, Shopify, Wix, and AI automation tools.",
      category: "technology",
    },
    {
      id: "custom-software",
      question: "Can you build custom software for my business?",
      answer:
        "Yes. Every business has unique requirements, and we specialize in building custom software tailored to your workflows, goals, and long-term growth.",
      category: "services",
    },
    {
      id: "ongoing-support",
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Absolutely. We offer maintenance, updates, performance improvements, security enhancements, and long-term technical support.",
      category: "support",
    },
    {
      id: "redesign",
      question: "Can you redesign my existing website or application?",
      answer:
        "Yes. We modernize outdated websites and applications with improved performance, user experience, and scalable architecture.",
      category: "services",
    },
    {
      id: "startups",
      question: "Do you work with startups and small businesses?",
      answer:
        "Yes. Whether you're launching a startup or scaling an established business, we create solutions that fit your goals and budget.",
      category: "general",
    },
    {
      id: "getting-started",
      question: "How do we get started?",
      answer:
        "Simply contact us through our website. We'll discuss your goals, recommend the best solution, and guide you through every stage of the project.",
      category: "process",
    },
  ],
  cta: {
    title: "Still have questions?",
    description:
      "We're always happy to discuss your project, answer your questions, and help you choose the right technology solution.",
    primary: {
      label: "Contact Us",
      href: "/contact",
    },
  },
} as const satisfies FaqContent;

export function getFaqById(id: string) {
  return faq.items.find((item) => item.id === id);
}
