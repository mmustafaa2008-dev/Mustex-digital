"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/supabase";

/**
 * Browser Supabase client — safe to use in Client Components.
 *
 * Only the public URL and anon key are used here; both are exposed to the
 * browser bundle by design (Next.js `NEXT_PUBLIC_*` env vars). The service
 * role key must never be imported into client code — see `lib/supabase/server.ts`.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured (missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }

  return createBrowserClient<Database>(url, anonKey);
}
