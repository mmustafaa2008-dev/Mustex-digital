"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { buildAutoReplyEmail } from "./emails/auto-reply";
import { buildInquiryEmail } from "./emails/inquiry";
import { getStartProjectEmailEnv } from "./env";
import { checkStartProjectRateLimit } from "./rate-limit";
import {
  startProjectServerSchema,
  type StartProjectServerInput,
} from "./schema";
import type { StartProjectActionResult } from "./types";

function getClientKey(headerStore: Headers): string {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return (
    headerStore.get("x-real-ip") ||
    headerStore.get("cf-connecting-ip") ||
    "unknown"
  );
}

/**
 * Submit Start Project inquiry — validates, rate-limits, sends Resend emails.
 * No database. Honeypot failures return a silent success.
 */
export async function submitStartProjectAction(
  input: StartProjectServerInput,
): Promise<StartProjectActionResult> {
  try {
    const parsed = startProjectServerSchema.safeParse(input);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return {
        ok: false,
        code: "validation",
        error:
          firstIssue?.message ??
          "Please check your details and try again.",
      };
    }

    const { website, ...values } = parsed.data;

    // Honeypot — bots fill hidden fields; pretend success.
    if (website && website.trim().length > 0) {
      return { ok: true };
    }

    const headerStore = await headers();
    const clientKey = getClientKey(headerStore);
    const rate = checkStartProjectRateLimit(`start-project:${clientKey}`);

    if (!rate.ok) {
      return {
        ok: false,
        code: "rate_limit",
        error: `Too many submissions. Please try again in about ${Math.ceil(rate.retryAfterSeconds / 60)} minutes.`,
      };
    }

    const envResult = getStartProjectEmailEnv();
    if (!envResult.ok) {
      console.error("[start-project]", envResult.error);
      return {
        ok: false,
        code: "config",
        error:
          "We couldn’t send your inquiry right now. Please email us directly or try again later.",
      };
    }

    const { apiKey, fromEmail, toEmail } = envResult.env;
    const resend = new Resend(apiKey);
    const submittedAt = new Date().toISOString();

    const inquiry = buildInquiryEmail({ values, submittedAt });
    const autoReply = buildAutoReplyEmail({ values });

    const inquiryResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: values.email,
      subject: inquiry.subject,
      html: inquiry.html,
      text: inquiry.text,
    });

    if (inquiryResult.error) {
      console.error("[start-project] inquiry email failed", inquiryResult.error);
      return {
        ok: false,
        code: "email",
        error:
          "We couldn’t deliver your inquiry. Please try again or email us directly.",
      };
    }

    const autoReplyResult = await resend.emails.send({
      from: fromEmail,
      to: [values.email],
      replyTo: toEmail,
      subject: autoReply.subject,
      html: autoReply.html,
      text: autoReply.text,
    });

    if (autoReplyResult.error) {
      // Inquiry already delivered — still treat as success for the user.
      console.error(
        "[start-project] auto-reply email failed",
        autoReplyResult.error,
      );
    }

    return { ok: true };
  } catch (error) {
    console.error("[start-project] unexpected error", error);
    return {
      ok: false,
      code: "email",
      error:
        "Something went wrong while submitting your project. Please try again.",
    };
  }
}
