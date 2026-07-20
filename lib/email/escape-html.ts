/** Escape untrusted text for HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Convert plain text newlines to `<br />` after escaping. */
export function escapeHtmlWithBreaks(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}
