"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

import { newsletterEmailSchema, normalizeNewsletterEmail } from "./schema";
import type { NewsletterSubscribeResult } from "./types";

/** Postgres unique-violation error code. */
const UNIQUE_VIOLATION = "23505";

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Subscribe an email to the newsletter.
 *
 * Always resolves (never throws) so the friendly message survives Next.js's
 * production error redaction for Server Actions. `{ ok: true, alreadySubscribed: true }`
 * is the expected, non-error outcome when the email already exists.
 */
export async function subscribeToNewsletterAction(
  rawEmail: string,
): Promise<NewsletterSubscribeResult> {
  try {
    const parsed = newsletterEmailSchema.safeParse(
      normalizeNewsletterEmail(rawEmail),
    );

    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Enter a valid email address.",
      };
    }

    const email = parsed.data;

    let supabase: ReturnType<typeof getSupabaseServerClient>;
    try {
      supabase = getSupabaseServerClient();
    } catch (error) {
      console.error("[newsletter] Supabase is not configured", error);
      return {
        ok: false,
        error: "Newsletter signup is currently unavailable. Please try again later.",
      };
    }

    const { data: existing, error: lookupError } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("[newsletter] lookup failed", lookupError);
      return { ok: false, error: GENERIC_ERROR };
    }

    if (existing) {
      return { ok: true, alreadySubscribed: true };
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, status: "Active" });

    if (insertError) {
      // Another request may have inserted the same email between our
      // lookup and this insert — treat that race as "already subscribed"
      // rather than an error.
      if (insertError.code === UNIQUE_VIOLATION) {
        return { ok: true, alreadySubscribed: true };
      }

      console.error("[newsletter] insert failed", insertError);
      return { ok: false, error: GENERIC_ERROR };
    }

    return { ok: true, alreadySubscribed: false };
  } catch (error) {
    console.error("[newsletter] unexpected error", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
