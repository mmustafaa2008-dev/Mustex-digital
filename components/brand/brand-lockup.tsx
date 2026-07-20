"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { brand } from "@/data/brand";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type BrandLockupSize = "sm" | "md" | "lg";

export type BrandLockupProps = {
  className?: string;
  href?: string;
  /** Compact mark only — icon, no wordmark */
  markOnly?: boolean;
  /** Show tagline under the wordmark */
  showSlogan?: boolean;
  size?: BrandLockupSize;
  /** Prefer higher priority decode (navbar / loading) */
  priority?: boolean;
  onClick?: () => void;
};

const sizeStyles: Record<
  BrandLockupSize,
  {
    icon: number;
    gap: string;
    divider: string;
    primary: string;
    secondary: string;
    slogan: string;
  }
> = {
  sm: {
    icon: 40,
    gap: "gap-3",
    divider: "h-9",
    primary:
      "text-[0.75rem] font-semibold tracking-[0.2em] sm:text-[0.8125rem] sm:tracking-[0.24em]",
    secondary:
      "text-[0.5625rem] font-medium tracking-[0.32em] sm:text-[0.625rem] sm:tracking-[0.36em]",
    slogan:
      "hidden text-[0.5rem] font-medium tracking-[0.2em] min-[400px]:block sm:tracking-[0.26em]",
  },
  md: {
    icon: 44,
    gap: "gap-3.5",
    divider: "h-10",
    primary: "text-[0.9375rem] font-semibold tracking-[0.28em]",
    secondary: "text-[0.75rem] font-medium tracking-[0.4em]",
    slogan: "text-[0.5625rem] font-medium tracking-[0.3em]",
  },
  lg: {
    icon: 64,
    gap: "gap-5",
    divider: "h-14",
    primary: "text-xl font-semibold tracking-[0.32em] md:text-2xl",
    secondary: "text-sm font-medium tracking-[0.42em] md:text-base",
    slogan: "text-[0.6875rem] font-medium tracking-[0.34em] md:text-xs",
  },
};

function accentedWord(
  word: string,
  accentIndex: number | null,
  className: string,
) {
  if (accentIndex === null || accentIndex < 0 || accentIndex >= word.length) {
    return <span className={className}>{word}</span>;
  }

  return (
    <span className={className}>
      {word.slice(0, accentIndex)}
      <span className="text-[var(--ds-primary)]">{word[accentIndex]}</span>
      {word.slice(accentIndex + 1)}
    </span>
  );
}

function SloganText({
  slogan,
  accent,
  className,
}: {
  slogan: string;
  accent: string;
  className?: string;
}) {
  const index = slogan.lastIndexOf(accent);
  if (index === -1) {
    return <span className={className}>{slogan}</span>;
  }

  return (
    <span className={className}>
      {slogan.slice(0, index)}
      <span className="text-[var(--ds-primary)]">{accent}</span>
      {slogan.slice(index + accent.length)}
    </span>
  );
}

/**
 * Official Mustex Digital brand lockup — uploaded mark + enterprise wordmark.
 */
function BrandLockup({
  className,
  href,
  markOnly = false,
  showSlogan = true,
  size = "sm",
  priority = false,
  onClick,
}: BrandLockupProps) {
  const styles = sizeStyles[size];
  const ariaLabel = `${brand.name} — ${brand.slogan}`;

  const content = (
    <>
      <span
        className="relative shrink-0 overflow-hidden rounded-[var(--ds-radius-sm)] bg-black"
        style={{ width: styles.icon, height: styles.icon }}
      >
        <Image
          src={brand.logoSrc}
          alt=""
          width={styles.icon}
          height={styles.icon}
          priority={priority}
          className="size-full object-cover"
        />
      </span>

      {markOnly ? null : (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "w-px shrink-0 bg-[var(--ds-border)]",
              styles.divider,
            )}
          />
          <span className="flex min-w-0 flex-col justify-center gap-0.5">
            <span className="flex flex-col leading-none">
              {accentedWord(
                brand.wordmark.primary,
                brand.wordmark.primaryAccentIndex,
                cn(
                  "uppercase text-[var(--ds-foreground)]",
                  styles.primary,
                ),
              )}
              <span
                className={cn(
                  "mt-0.5 uppercase text-[var(--ds-foreground)]",
                  styles.secondary,
                )}
              >
                {brand.wordmark.secondary}
              </span>
            </span>
            {showSlogan ? (
              <SloganText
                slogan={brand.slogan.toUpperCase()}
                accent={brand.sloganAccent.toUpperCase()}
                className={cn(
                  "mt-1 uppercase text-[var(--ds-foreground)]",
                  styles.slogan,
                )}
              />
            ) : null}
          </span>
        </>
      )}
    </>
  );

  const sharedClassName = cn(
    "inline-flex items-center",
    styles.gap,
    uiTransition,
    uiFocusRing,
    "rounded-[var(--ds-radius-sm)]",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        data-slot="brand-lockup"
        aria-label={ariaLabel}
        className={sharedClassName}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      data-slot="brand-lockup"
      role="img"
      aria-label={ariaLabel}
      className={sharedClassName}
    >
      {content}
    </div>
  );
}

export type BrandMarkProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "alt"
> & {
  className?: string;
  size?: number;
};

/**
 * Icon-only mark for favicons, compact UI, and decorative use.
 */
function BrandMark({ className, size = 32, ...props }: BrandMarkProps) {
  return (
    <Image
      src={brand.logoSrc}
      alt={brand.logoAlt}
      width={size}
      height={size}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}

export { BrandLockup, BrandMark };
