import { z } from "zod";

export const newsletterEmailSchema = z.email("Enter a valid email address.");

export type NewsletterEmail = z.infer<typeof newsletterEmailSchema>;

/** Trims and lowercases before validation/lookup so duplicates are matched case-insensitively. */
export function normalizeNewsletterEmail(raw: string): string {
  return raw.trim().toLowerCase();
}
