/**
 * Start Your Project wizard — copy and option catalogs.
 */

export const startProjectContent = {
  title: "Let's Build Something Amazing",
  subtitle: "Tell us what you need and we'll prepare the best solution.",
  steps: [
    { id: 1, label: "Service" },
    { id: 2, label: "Scope" },
    { id: 3, label: "Details" },
    { id: 4, label: "Contact" },
  ],
  success: {
    title: "Project Inquiry Submitted",
    description:
      "Thank you for contacting Mustex Digitals.\n\nOur team will review your requirements and contact you within 24 hours.",
    homeLabel: "Return Home",
    homeHref: "/",
    contactLabel: "Contact Us",
    contactHref: "/contact",
  },
} as const;

export const serviceOptions = [
  { value: "web-development", label: "Web Development" },
  { value: "full-stack-development", label: "Full Stack Development" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "cloud-solutions", label: "Cloud Solutions" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "custom-software", label: "Custom Software" },
  { value: "other", label: "Other" },
] as const;

export const budgetOptions = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2k–5k" },
  { value: "5k-10k", label: "$5k–10k" },
  { value: "10k-25k", label: "$10k–25k" },
  { value: "25k-plus", label: "$25k+" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "within-1-month", label: "Within 1 Month" },
  { value: "2-3-months", label: "2–3 Months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const contactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
] as const;
