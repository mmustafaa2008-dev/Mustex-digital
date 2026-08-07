import { getSupabaseServerClient } from "@/lib/supabase/server";

import type { StartProjectInquiryValues } from "./schema";

export type InsertProjectInquiryResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Persist a Start Project inquiry into `project_inquiries` before any
 * email is sent. Uses the service-role Supabase client (server-only).
 */
export async function insertProjectInquiry(
  values: StartProjectInquiryValues,
): Promise<InsertProjectInquiryResult> {
  let supabase: ReturnType<typeof getSupabaseServerClient>;
  try {
    supabase = getSupabaseServerClient();
  } catch (error) {
    console.error("[start-project] Supabase is not configured", error);
    return {
      ok: false,
      error: "Database is not configured. Please try again later.",
    };
  }

  const { data, error } = await supabase
    .from("project_inquiries")
    .insert({
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      company: values.company,
      country: values.country,
      service: values.service,
      budget: values.budget,
      timeline: values.timeline,
      project_description: values.projectDescription,
      preferred_contact_method: values.preferredContactMethod,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[start-project] insert failed", error);
    return {
      ok: false,
      error: "We couldn't save your inquiry. Please try again.",
    };
  }

  return { ok: true, id: data.id };
}
