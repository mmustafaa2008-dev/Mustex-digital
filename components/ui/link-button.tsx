"use client";

import type { VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useMagnetic } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

export type LinkButtonProps = Omit<ComponentProps<typeof Link>, "href"> &
  VariantProps<typeof buttonVariants> & {
    href: ComponentProps<typeof Link>["href"];
    loading?: boolean;
    disabled?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    plain?: boolean;
  };

type Ripple = { id: number; x: number; y: number };

/**
 * Anchor styled as a Button — magnetic hover, glow, ripple, arrow slide.
 */
function LinkButton({
  className,
  variant = "default",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  href,
  onClick,
  onMouseMove,
  onMouseLeave,
  plain = false,
  ...props
}: LinkButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const reduceMotion = usePrefersReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const allowEffects =
    !plain && variant !== "link" && !isDisabled && !reduceMotion;
  const allowMagnetic = allowEffects && finePointer;
  const shellRef = useRef<HTMLSpanElement | null>(null);
  const { x, y, onMouseMove: onMagneticMove, onMouseLeave: onMagneticLeave } =
    useMagnetic(shellRef, 0.2);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const spawnRipple = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  }, []);

  const link = (
    <Link
      href={isDisabled ? "#" : href}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      tabIndex={isDisabled ? -1 : undefined}
      data-slot="link-button"
      data-state={loading ? "loading" : isDisabled ? "disabled" : "idle"}
      className={cn(
        buttonVariants({ variant, size }),
        isDisabled && "pointer-events-none opacity-50",
        className,
      )}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        if (allowEffects) spawnRipple(event);
        onClick?.(event);
      }}
      onMouseMove={(event) => {
        if (allowMagnetic) onMagneticMove(event);
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        if (allowMagnetic) onMagneticLeave();
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {allowEffects
        ? ripples.map((ripple) => (
            <span
              key={ripple.id}
              aria-hidden="true"
              className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35"
              style={{ left: ripple.x, top: ripple.y }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-white/40"
                initial={{ scale: 0, opacity: 0.55 }}
                animate={{ scale: 18, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </span>
          ))
        : null}
      {leftIcon}
      <span className="relative z-[1]">{children}</span>
      {rightIcon ? (
        <span data-slot="button-arrow" className="relative z-[1] inline-flex">
          {rightIcon}
        </span>
      ) : null}
    </Link>
  );

  if (!allowMagnetic) {
    return link;
  }

  return (
    <motion.span ref={shellRef} className="inline-flex" style={{ x, y }}>
      {link}
    </motion.span>
  );
}

export { LinkButton };
