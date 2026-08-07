import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

/**
 * Server-only Supabase client for Server Actions and Route Handlers.
 *
 * Uses the service role key so trusted server code can write to
 * `project_inquiries` / `newsletter_subscribers` without relying on public
 * RLS insert policies (both tables have RLS enabled with no public
 * policies — see `supabase/migrations/0001_init.sql`).
 *
 * The `server-only` import guarantees a build-time error if this module is
 * ever imported from a Client Component, so the service role key can never
 * reach the browser bundle.
 */
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
