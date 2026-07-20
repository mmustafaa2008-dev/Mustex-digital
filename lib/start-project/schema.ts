import { z } from "zod";

import {
  budgetOptions,
  contactMethodOptions,
  serviceOptions,
  timelineOptions,
} from "@/data/start-project";

const serviceValues = serviceOptions.map((o) => o.value) as [
  (typeof serviceOptions)[number]["value"],
  ...(typeof serviceOptions)[number]["value"][],
];

const budgetValues = budgetOptions.map((o) => o.value) as [
  (typeof budgetOptions)[number]["value"],
  ...(typeof budgetOptions)[number]["value"][],
];

const timelineValues = timelineOptions.map((o) => o.value) as [
  (typeof timelineOptions)[number]["value"],
  ...(typeof timelineOptions)[number]["value"][],
];

const contactMethodValues = contactMethodOptions.map((o) => o.value) as [
  (typeof contactMethodOptions)[number]["value"],
  ...(typeof contactMethodOptions)[number]["value"][],
];

export const startProjectSchema = z.object({
  service: z.enum(serviceValues, {
    error: "Please choose a service.",
  }),
  budget: z.enum(budgetValues, {
    error: "Please select a project budget.",
  }),
  timeline: z.enum(timelineValues, {
    error: "Please select a timeline.",
  }),
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters.")
    .max(120, "Project name is too long."),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(120, "Company name is too long."),
  projectDescription: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(4000, "Description is too long."),
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name is too long."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(40, "Phone number is too long."),
  country: z
    .string()
    .trim()
    .min(2, "Enter your country.")
    .max(80, "Country name is too long."),
  preferredContactMethod: z.enum(contactMethodValues, {
    error: "Please choose a preferred contact method.",
  }),
  privacyAccepted: z
    .boolean()
    .refine((value) => value === true, {
      error: "You must agree to the privacy policy.",
    }),
  /** Honeypot — must stay empty. Hidden from real users. */
  website: z.string().max(200).optional().default(""),
});

export type StartProjectFormValues = z.infer<typeof startProjectSchema>;

/** Inquiry fields used in emails (excludes honeypot). */
export type StartProjectInquiryValues = Omit<StartProjectFormValues, "website">;

/** Server payload — same shape as the form (includes honeypot). */
export const startProjectServerSchema = startProjectSchema;
export type StartProjectServerInput = z.input<typeof startProjectServerSchema>;

/** RHF default values — enums start empty until the user selects. */
export type StartProjectFormDefaults = Omit<
  StartProjectFormValues,
  | "service"
  | "budget"
  | "timeline"
  | "preferredContactMethod"
  | "privacyAccepted"
  | "website"
> & {
  service?: StartProjectFormValues["service"];
  budget?: StartProjectFormValues["budget"];
  timeline?: StartProjectFormValues["timeline"];
  preferredContactMethod?: StartProjectFormValues["preferredContactMethod"];
  privacyAccepted: boolean;
  website: string;
};

export const startProjectDefaultValues: StartProjectFormDefaults = {
  service: undefined,
  budget: undefined,
  timeline: undefined,
  projectName: "",
  company: "",
  projectDescription: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  preferredContactMethod: undefined,
  privacyAccepted: false,
  website: "",
};

export const startProjectStepFields = {
  1: ["service"] as const,
  2: ["budget", "timeline"] as const,
  3: ["projectName", "company", "projectDescription"] as const,
  4: [
    "fullName",
    "email",
    "phone",
    "country",
    "preferredContactMethod",
    "privacyAccepted",
  ] as const,
} as const;

export type StartProjectStep = keyof typeof startProjectStepFields;
