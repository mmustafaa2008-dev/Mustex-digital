export type NewsletterSubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; error: string };
