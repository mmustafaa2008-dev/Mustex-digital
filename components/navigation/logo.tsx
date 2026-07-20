"use client";

import { BrandLockup } from "@/components/brand";
import { cn } from "@/lib/utils";

export type LogoProps = {
  label?: string;
  href?: string;
  className?: string;
  /** Compact mark-only for tight layouts */
  markOnly?: boolean;
  /** Show slogan under the wordmark */
  showSlogan?: boolean;
};

/**
 * Navbar / chrome brand entry — wraps the official BrandLockup.
 */
function Logo({
  href = "/",
  className,
  markOnly = false,
  showSlogan = false,
}: LogoProps) {
  return (
    <BrandLockup
      href={href ?? "/"}
      markOnly={markOnly}
      showSlogan={showSlogan}
      size="sm"
      priority
      className={cn(className)}
    />
  );
}

export { Logo };
