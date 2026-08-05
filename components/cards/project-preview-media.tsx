"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { ProjectPreviewPlaceholder } from "./project-preview-placeholder";

export type ProjectPreviewMediaProps = {
  title: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

/**
 * Project thumbnail — live preview image with branded placeholder fallback.
 */
function ProjectPreviewMedia({
  title,
  category,
  imageSrc,
  imageAlt,
  className,
}: ProjectPreviewMediaProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !failed;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-[var(--ds-surface-sunken)]",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={imageSrc!}
          alt={imageAlt || `${title} preview`}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProjectPreviewPlaceholder title={title} category={category} />
      )}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-t from-[var(--ds-background)] via-[var(--ds-background)]/35 to-transparent",
          "opacity-70 transition-opacity duration-[var(--duration-normal)]",
          "group-hover:opacity-95",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[image:var(--gradient-primary-glow)] opacity-0",
          "transition-opacity duration-[var(--duration-normal)]",
          "group-hover:opacity-60",
        )}
      />
    </div>
  );
}

export { ProjectPreviewMedia };
