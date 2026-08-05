import type { ProjectContent } from "@/types/content";

/**
 * Resolve the best available thumbnail for a portfolio project.
 * Only explicit, curated images are used — no live-site screenshots
 * (those render inconsistently and are not premium quality).
 * Falls back to the branded `ProjectPreviewPlaceholder` when unset.
 */
export function resolveProjectThumbnail(
  project: Pick<ProjectContent, "imageSrc">,
): string | undefined {
  return project.imageSrc;
}

export function buildProjectLinks(
  project: Pick<
    ProjectContent,
    "liveUrl" | "designUrl" | "dashboardUrl" | "status" | "links"
  >,
): ProjectContent["links"] {
  if (project.links?.length) return project.links;

  const links: NonNullable<ProjectContent["links"]> = [];

  if (project.status === "coming-soon" || project.status === "in-development") {
    links.push({
      label: "Coming Soon",
      href: "#",
      disabled: true,
    });
  } else if (project.liveUrl) {
    links.push({
      label: "Live Website",
      href: project.liveUrl,
      external: true,
    });
  }

  if (project.dashboardUrl) {
    links.push({
      label: "View Dashboard",
      href: project.dashboardUrl,
      external: true,
    });
  }

  if (project.designUrl) {
    links.push({
      label: "View Design",
      href: project.designUrl,
      external: true,
    });
  }

  return links.length ? links : undefined;
}
