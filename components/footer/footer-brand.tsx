import { BrandLockup } from "@/components/brand";
import { cn } from "@/lib/utils";

import type { FooterCompanyInfo } from "./types";

export type FooterBrandProps = FooterCompanyInfo & {
  className?: string;
  headingId?: string;
};

/**
 * Company identity block for the footer — official brand lockup.
 */
function FooterBrand({
  name,
  description,
  logo,
  className,
  headingId,
}: FooterBrandProps) {
  return (
    <div
      data-slot="footer-brand"
      className={cn("flex max-w-sm flex-col gap-5", className)}
    >
      {logo ?? (
        <BrandLockup href="/" size="md" showSlogan />
      )}
      <p id={headingId} className="sr-only">
        {name}
      </p>
      {description ? (
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { FooterBrand };
