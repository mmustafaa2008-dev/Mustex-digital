"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { brand } from "@/data/brand";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
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

const brandMotion = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

const sizeStyles: Record<
  BrandLockupSize,
  {
    icon: number;
    iconMobile: number;
    gap: string;
    divider: string;
    primary: string;
    secondary: string;
    slogan: string;
  }
> = {
  sm: {
    icon: brand.logoDisplaySize,
    iconMobile: brand.logoDisplaySizeMobile,
    gap: "gap-3.5 sm:gap-4 md:gap-[1.125rem]",
    divider: "h-8 sm:h-9",
    primary:
      "text-[0.8125rem] font-bold tracking-[0.26em] sm:text-[0.875rem] sm:font-extrabold sm:tracking-[0.3em]",
    secondary:
      "text-[0.5625rem] font-medium tracking-[0.34em] text-[var(--ds-foreground)]/55 sm:text-[0.625rem] sm:tracking-[0.38em]",
    slogan:
      "hidden text-[0.5rem] font-medium tracking-[0.2em] text-[var(--ds-foreground)]/45 min-[400px]:block sm:tracking-[0.26em]",
  },
  md: {
    icon: 52,
    iconMobile: 48,
    gap: "gap-4 md:gap-5",
    divider: "h-10",
    primary: "text-[0.9375rem] font-extrabold tracking-[0.3em]",
    secondary:
      "text-[0.6875rem] font-medium tracking-[0.4em] text-[var(--ds-foreground)]/55",
    slogan: "text-[0.5625rem] font-medium tracking-[0.3em] text-[var(--ds-foreground)]/45",
  },
  lg: {
    icon: 64,
    iconMobile: 56,
    gap: "gap-5 md:gap-6",
    divider: "h-14",
    primary: "text-xl font-extrabold tracking-[0.34em] md:text-2xl md:tracking-[0.36em]",
    secondary:
      "text-sm font-medium tracking-[0.44em] text-[var(--ds-foreground)]/55 md:text-base",
    slogan: "text-[0.6875rem] font-medium tracking-[0.34em] text-[var(--ds-foreground)]/45 md:text-xs",
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
 * Official Mustex Digitals brand lockup — transparent mark + enterprise wordmark.
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
  const reduceMotion = usePrefersReducedMotion();
  const ariaLabel = `${brand.name} — ${brand.slogan}`;
  const logoAssetSize = styles.icon * 2;

  const content = (
    <>
      <motion.span
        className={cn(
          "relative flex shrink-0 items-center justify-center",
          size === "sm" && "h-12 w-12 sm:h-[3.375rem] sm:w-[3.375rem]",
        )}
        style={
          size === "sm"
            ? undefined
            : { width: styles.icon, height: styles.icon }
        }
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: brandMotion.duration, ease: brandMotion.ease }}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      >
        <Image
          src={brand.logoSrc}
          alt=""
          width={logoAssetSize}
          height={logoAssetSize}
          priority={priority}
          sizes={
            size === "sm"
              ? `(max-width: 639px) ${styles.iconMobile}px, ${styles.icon}px`
              : `${styles.icon}px`
          }
          quality={95}
          className="size-full object-contain"
        />
      </motion.span>

      {markOnly ? null : (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "w-px shrink-0 self-center bg-[var(--ds-foreground)]/20",
              styles.divider,
            )}
          />
          <motion.span
            className="flex min-w-0 flex-col justify-center gap-0.5"
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: brandMotion.duration,
              ease: brandMotion.ease,
              delay: reduceMotion ? 0 : 0.06,
            }}
          >
            <span className="flex flex-col leading-none">
              {accentedWord(
                brand.wordmark.primary,
                brand.wordmark.primaryAccentIndex,
                cn(
                  "uppercase text-[var(--ds-foreground)]",
                  styles.primary,
                ),
              )}
              <span className={cn("mt-0.5 uppercase", styles.secondary)}>
                {brand.wordmark.secondary}
              </span>
            </span>
            {showSlogan ? (
              <SloganText
                slogan={brand.slogan.toUpperCase()}
                accent={brand.sloganAccent.toUpperCase()}
                className={cn("mt-1 uppercase", styles.slogan)}
              />
            ) : null}
          </motion.span>
        </>
      )}
    </>
  );

  const sharedClassName = cn(
    "group/brand inline-flex items-center py-0.5",
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

export { BrandLockup };
