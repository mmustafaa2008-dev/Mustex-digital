import { company } from "@/data/company";
import { escapeHtml } from "@/lib/email/escape-html";

import { getStartProjectLabels } from "../labels";
import type { StartProjectInquiryValues } from "../schema";

export type AutoReplyEmailInput = {
  values: StartProjectInquiryValues;
};

/** Client confirmation email after inquiry submission. */
export function buildAutoReplyEmail({ values }: AutoReplyEmailInput) {
  const labels = getStartProjectLabels(values);
  const subject = "We've received your project inquiry";
  const firstName = values.fullName.trim().split(/\s+/)[0] || values.fullName;

  const html = `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#050816;color:#f8fafc;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#0b1224;border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 22px;background:linear-gradient(135deg,#0b1224 0%,#0f1d3d 55%,#12306b 100%);border-bottom:1px solid #1e293b;">
                <p style="margin:0 0 8px;color:#60a5fa;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
                  ${escapeHtml(company.name)}
                </p>
                <h1 style="margin:0;color:#f8fafc;font-size:26px;line-height:1.25;font-family:Arial,Helvetica,sans-serif;">
                  We've received your project inquiry
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 16px;color:#e2e8f0;font-size:16px;line-height:1.6;">
                  Hi ${escapeHtml(firstName)},
                </p>
                <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                  Thank you for contacting <strong style="color:#f8fafc;">${escapeHtml(company.name)}</strong>.
                  We’ve received your inquiry for <strong style="color:#f8fafc;">${escapeHtml(values.projectName)}</strong>
                  (${escapeHtml(labels.service)}) and our team is reviewing your requirements.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#111827;border:1px solid #1e293b;border-radius:12px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 8px;color:#60a5fa;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">
                        What happens next
                      </p>
                      <p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.7;">
                        We typically respond within <strong>24 hours</strong> during business hours
                        (<strong>${escapeHtml(company.contact.hours)}</strong>).
                      </p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                  If your request is urgent, reply to this email or reach us at
                  <a href="mailto:${escapeHtml(company.contact.email)}" style="color:#60a5fa;text-decoration:none;">${escapeHtml(company.contact.email)}</a>.
                </p>
                <p style="margin:0;color:#e2e8f0;font-size:15px;line-height:1.7;">
                  Best regards,<br />
                  <strong>${escapeHtml(company.name)}</strong><br />
                  <span style="color:#94a3b8;">${escapeHtml(company.tagline)}</span>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 28px;border-top:1px solid #1e293b;">
                <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                  ${escapeHtml(company.name)} · ${escapeHtml(company.contact.address)} ·
                  <a href="${escapeHtml(company.contact.website)}" style="color:#60a5fa;text-decoration:none;">${escapeHtml(company.contact.websiteLabel)}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  const text = [
    `We've received your project inquiry`,
    "",
    `Hi ${firstName},`,
    "",
    `Thank you for contacting ${company.name}. We've received your inquiry for ${values.projectName} (${labels.service}) and our team is reviewing your requirements.`,
    "",
    `We typically respond within 24 hours during business hours (${company.contact.hours}).`,
    "",
    `If urgent, email ${company.contact.email}.`,
    "",
    `Best regards,`,
    company.name,
    company.tagline,
  ].join("\n");

  return { subject, html, text };
}
