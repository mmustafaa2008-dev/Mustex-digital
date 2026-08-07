-- Mustex Digitals — initial schema
-- Run in the Supabase SQL editor, or via `supabase db push` if using the CLI.

create extension if not exists "pgcrypto";

-- ============================================================
-- project_inquiries — Start Project form submissions
-- ============================================================
create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  company text not null,
  country text not null,
  service text not null,
  budget text not null,
  timeline text not null,
  project_description text not null,
  preferred_contact_method text not null,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);

create index if not exists project_inquiries_email_idx
  on public.project_inquiries (email);

-- ============================================================
-- newsletter_subscribers — Footer newsletter signups
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'Active',
  subscribed_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

-- ============================================================
-- Row Level Security
-- ============================================================
-- All reads/writes happen exclusively from Next.js Server Actions using the
-- Supabase service role key, which bypasses RLS entirely. RLS is enabled on
-- both tables with NO public policies defined, so the anon/public key
-- (used only in the browser) can never read or write these tables directly.
alter table public.project_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;
