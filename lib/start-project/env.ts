/**
 * Resend / email environment — never hardcode secrets.
 */

export type StartProjectEmailEnv = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
};

export type EmailEnvError = {
  ok: false;
  error: string;
};

export type EmailEnvSuccess = {
  ok: true;
  env: StartProjectEmailEnv;
};

export function getStartProjectEmailEnv(): EmailEnvSuccess | EmailEnvError {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.FROM_EMAIL?.trim();
  const toEmail = process.env.TO_EMAIL?.trim();

  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  if (!fromEmail) {
    return {
      ok: false,
      error: "Email service is not configured (missing FROM_EMAIL).",
    };
  }

  if (!toEmail) {
    return {
      ok: false,
      error: "Email service is not configured (missing TO_EMAIL).",
    };
  }

  return {
    ok: true,
    env: { apiKey, fromEmail, toEmail },
  };
}
