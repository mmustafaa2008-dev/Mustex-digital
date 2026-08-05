import type { ConversionContent } from "@/types/content";

import { company } from "./company";

const consultationMailSubject = "Free Consultation Request";
const consultationMailBody = [
  "Hello Mustex Digitals,",
  "",
  "I would like to schedule a free consultation regarding my project.",
  "",
  "Name:",
  "Company:",
  "Phone:",
  "Project Details:",
  "",
  "Thank you.",
].join("\n");

/** mailto: link — opens the user's default email client (no Calendly integration yet). */
const scheduleConsultationHref = `mailto:${company.contact.email}?subject=${encodeURIComponent(consultationMailSubject)}&body=${encodeURIComponent(consultationMailBody)}`;

/**
 * Final conversion CTA — homepage closing section.
 */
export const conversion = {
  section: {
    title: "Ready to Build Something",
    description:
      "Whether you're launching a startup, modernizing your business, or building enterprise software, Mustex Digitals is ready to transform your ideas into scalable digital solutions.",
  },
  titleAccent: "Exceptional?",
  primaryCta: {
    label: "Start Your Project",
    href: "/start-project",
  },
  secondaryCta: {
    label: "Schedule a Free Consultation",
    href: scheduleConsultationHref,
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
    {
      id: "support",
      label: "Support",
      value: "Long-Term",
    },
  ],
} as const satisfies ConversionContent;
