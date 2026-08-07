/**
 * Hand-written schema types for the Supabase tables used by this project.
 * Mirrors `supabase/migrations/0001_init.sql`. Regenerate/update manually
 * if the schema changes (no Supabase CLI codegen wired into this repo).
 */

export type ProjectInquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export type ProjectInquiryRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  project_description: string;
  preferred_contact_method: string;
  status: ProjectInquiryStatus;
  created_at: string;
};

export type ProjectInquiryInsert = {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  project_description: string;
  preferred_contact_method: string;
  status?: ProjectInquiryStatus;
  created_at?: string;
};

export type ProjectInquiryUpdate = Partial<ProjectInquiryInsert>;

export type NewsletterSubscriberStatus = "Active" | "Unsubscribed";

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  status: NewsletterSubscriberStatus;
  subscribed_at: string;
};

export type NewsletterSubscriberInsert = {
  id?: string;
  email: string;
  status?: NewsletterSubscriberStatus;
  subscribed_at?: string;
};

export type NewsletterSubscriberUpdate = Partial<NewsletterSubscriberInsert>;

/** Shape consumed by `createClient<Database>()` / `createBrowserClient<Database>()`. */
export type Database = {
  public: {
    Tables: {
      project_inquiries: {
        Row: ProjectInquiryRow;
        Insert: ProjectInquiryInsert;
        Update: ProjectInquiryUpdate;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriberRow;
        Insert: NewsletterSubscriberInsert;
        Update: NewsletterSubscriberUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
