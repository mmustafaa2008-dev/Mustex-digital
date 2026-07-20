import { company } from "@/data/company";
import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/email/escape-html";

import { getStartProjectLabels } from "../labels";
import type { StartProjectInquiryValues } from "../schema";

export type InquiryEmailInput = {
  values: StartProjectInquiryValues;
  submittedAt: string;
};

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1e293b;width:34%;vertical-align:top;color:#94a3b8;font-size:13px;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #1e293b;vertical-align:top;color:#f8fafc;font-size:14px;font-family:Arial,Helvetica,sans-serif;font-weight:600;">
        ${value}
      </td>
    </tr>
  `;
}

/** Internal notification email — Mustex inbox. */
export function buildInquiryEmail({ values, submittedAt }: InquiryEmailInput) {
  const labels = getStartProjectLabels(values);
  const subject = `New project inquiry: ${values.projectName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#050816;color:#f8fafc;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#0b1224;border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 20px;background:linear-gradient(135deg,#0b1224 0%,#0f1d3d 55%,#12306b 100%);border-bottom:1px solid #1e293b;">
                <p style="margin:0 0 8px;color:#60a5fa;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
                  ${escapeHtml(company.name)}
                </p>
                <h1 style="margin:0;color:#f8fafc;font-size:24px;line-height:1.3;font-family:Arial,Helvetica,sans-serif;">
                  New Project Inquiry
                </h1>
                <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;font-family:Arial,Helvetica,sans-serif;">
                  Submitted ${escapeHtml(new Date(submittedAt).toUTCString())}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Project Name", escapeHtml(values.projectName))}
                  ${row("Service", escapeHtml(labels.service))}
                  ${row("Budget", escapeHtml(labels.budget))}
                  ${row("Timeline", escapeHtml(labels.timeline))}
                  ${row("Description", escapeHtmlWithBreaks(values.projectDescription))}
                  ${row("Name", escapeHtml(values.fullName))}
                  ${row("Company", escapeHtml(values.company))}
                  ${row("Email", `<a href="mailto:${escapeHtml(values.email)}" style="color:#60a5fa;text-decoration:none;">${escapeHtml(values.email)}</a>`)}
                  ${row("Phone", escapeHtml(values.phone))}
                  ${row("Country", escapeHtml(values.country))}
                  ${row("Preferred Contact", escapeHtml(labels.preferredContactMethod))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px;">
                <p style="margin:16px 0 0;color:#64748b;font-size:12px;font-family:Arial,Helvetica,sans-serif;">
                  Reply directly to this email to contact the client.
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
    `New project inquiry — ${company.name}`,
    "",
    `Project Name: ${values.projectName}`,
    `Service: ${labels.service}`,
    `Budget: ${labels.budget}`,
    `Timeline: ${labels.timeline}`,
    `Description: ${values.projectDescription}`,
    `Name: ${values.fullName}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Country: ${values.country}`,
    `Preferred Contact: ${labels.preferredContactMethod}`,
    `Submitted: ${submittedAt}`,
  ].join("\n");

  return { subject, html, text };
}
