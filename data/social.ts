import { Code2, Share2, X } from "lucide-react";

import type { SocialContent } from "@/types/content";

/**
 * Social platform links used by footer and contact surfaces.
 */
export const social = {
  label: "Social media",
  links: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com",
      icon: Code2,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: Share2,
    },
    {
      id: "x",
      label: "X (Twitter)",
      href: "https://x.com",
      icon: X,
    },
  ],
} as const satisfies SocialContent;
