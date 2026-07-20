/**
 * In-page section anchors for homepage navigation.
 * Matches existing heading ids — does not require section file changes.
 */
export const sectionAnchors = {
  home: "/",
  services: "/#services-heading",
  projects: "/#featured-work-heading",
  industries: "/#industries-heading",
  about: "/#about-heading",
  contact: "/#conversion-heading",
} as const;

export function parseNavHref(href: string): {
  pathname: string;
  hash: string | null;
} {
  if (href.startsWith("#")) {
    return { pathname: "/", hash: href.slice(1) };
  }

  try {
    const url = new URL(href, "http://local.invalid");
    return {
      pathname: url.pathname || "/",
      hash: url.hash ? url.hash.slice(1) : null,
    };
  } catch {
    return { pathname: href, hash: null };
  }
}

export function isHashNavHref(href: string): boolean {
  return Boolean(parseNavHref(href).hash);
}
