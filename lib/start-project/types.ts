import type { StartProjectInquiryValues } from "./schema";

/** Typed payload shape for a successful inquiry (no persistence). */
export type StartProjectSubmission = StartProjectInquiryValues & {
  submittedAt: string;
  source: "start-project-wizard";
};

export type StartProjectActionErrorCode =
  | "validation"
  | "rate_limit"
  | "config"
  | "email";

export type StartProjectActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code: StartProjectActionErrorCode;
    };
