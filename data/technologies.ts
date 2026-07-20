import {
  Bot,
  Code2,
  Database,
  Paintbrush,
  Server,
  Smartphone,
  Store,
  Wrench,
} from "lucide-react";

import type { TechnologiesContent } from "@/types/content";

/**
 * Technology stack catalog grouped by category.
 */
export const technologies = {
  section: {
    title: "Technology Stack",
    description:
      "Modern tools and platforms we use to engineer resilient, high-performance digital products.",
  },
  categories: [
    { id: "frontend", title: "Frontend", icon: Code2 },
    { id: "backend", title: "Backend", icon: Server },
    { id: "databases", title: "Databases", icon: Database },
    { id: "mobile", title: "Mobile", icon: Smartphone },
    { id: "cms-ecommerce", title: "CMS & E-Commerce", icon: Store },
    { id: "design", title: "UI / UX Design", icon: Paintbrush },
    { id: "devtools", title: "Dev Tools", icon: Wrench },
    { id: "ai-automation", title: "AI & Automation", icon: Bot },
  ],
  items: [
    { id: "react-next", label: "React & Next.js", categoryId: "frontend" },
    { id: "js-ts", label: "JS & TypeScript", categoryId: "frontend" },
    { id: "html-css", label: "HTML5 & CSS3", categoryId: "frontend" },
    { id: "tailwind", label: "Tailwind CSS", categoryId: "frontend" },
    { id: "nodejs", label: "Node.js", categoryId: "backend" },
    {
      id: "express-rest",
      label: "Express.js & REST APIs",
      categoryId: "backend",
    },
    { id: "jwt", label: "JWT Authentication", categoryId: "backend" },
    { id: "mongodb", label: "MongoDB", categoryId: "databases" },
    { id: "mysql", label: "MySQL", categoryId: "databases" },
    { id: "firebase-db", label: "Firebase", categoryId: "databases" },
    { id: "flutter-dart", label: "Flutter & Dart", categoryId: "mobile" },
    { id: "android", label: "Android", categoryId: "mobile" },
    { id: "firebase-mobile", label: "Firebase", categoryId: "mobile" },
    {
      id: "wordpress-wix",
      label: "WordPress & Wix",
      categoryId: "cms-ecommerce",
    },
    {
      id: "shopify-woo",
      label: "Shopify & WooCommerce",
      categoryId: "cms-ecommerce",
    },
    { id: "figma-ps", label: "Figma & Photoshop", categoryId: "design" },
    { id: "design-systems", label: "Design Systems", categoryId: "design" },
    {
      id: "wireframing",
      label: "Wireframing & Prototyping",
      categoryId: "design",
    },
    { id: "git-github", label: "Git & GitHub", categoryId: "devtools" },
    { id: "vscode-npm", label: "VS Code & npm", categoryId: "devtools" },
    {
      id: "postman-vercel",
      label: "Postman & Vercel",
      categoryId: "devtools",
    },
    {
      id: "openai-agents",
      label: "OpenAI & AI Agents",
      categoryId: "ai-automation",
    },
    {
      id: "n8n-workflows",
      label: "n8n & Workflows",
      categoryId: "ai-automation",
    },
    {
      id: "api-integrations",
      label: "API Integrations",
      categoryId: "ai-automation",
    },
  ],
} as const satisfies TechnologiesContent;

export function getTechnologiesByCategory(
  categoryId: (typeof technologies.categories)[number]["id"],
) {
  return technologies.items.filter((item) => item.categoryId === categoryId);
}

export function getTechnologyCategoriesWithItems() {
  return technologies.categories.map((category) => ({
    ...category,
    items: getTechnologiesByCategory(category.id),
  }));
}
