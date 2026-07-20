/**
 * Replace `{year}` in copyright / credit templates.
 */
export function formatContentTemplate(
  template: string,
  year: number = new Date().getFullYear(),
): string {
  return template.replaceAll("{year}", String(year));
}
