"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useMagnetic } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { uiDisabled, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
        "group/button relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none",
        "rounded-[var(--ds-radius-sm)] border border-transparent",
        "active:translate-y-px active:scale-[0.985]",
        "hover:-translate-y-px",
        uiTransition,
        uiFocusRing,
        uiDisabled,
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_[data-slot=button-arrow]]:transition-transform [&_[data-slot=button-arrow]]:duration-[var(--duration-fast)]",
    "hover:[&_[data-slot=button-arrow]]:translate-x-1",
  ].join(" "),
  {
    variants: {
      variant: {
        default: cn(
          "bg-[var(--ds-primary)] text-[var(--ds-primary-foreground)]",
          "hover:bg-[color-mix(in_srgb,var(--ds-primary)_88%,white)]",
          "active:bg-[color-mix(in_srgb,var(--ds-primary)_92%,black)]",
          "shadow-[var(--ds-shadow-glow-sm)]",
          "hover:shadow-[var(--ds-shadow-glow-md)]",
          "polish-btn-shine",
        ),
        secondary: cn(
          "bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground)] border-[var(--ds-border)]",
          "hover:bg-[var(--ds-surface-bright)] hover:shadow-[var(--ds-shadow-md)]",
          "polish-btn-shine",
        ),
        outline: cn(
          "border-[var(--ds-border)] bg-transparent text-[var(--ds-foreground)]",
          "hover:bg-[var(--ds-muted)] hover:border-[var(--ds-border-strong)]",
          "hover:shadow-[var(--ds-shadow-glow-sm)]",
          "polish-btn-shine",
        ),
        ghost:
          "bg-transparent text-[var(--ds-foreground)] hover:bg-[var(--ds-muted)]",
        destructive: cn(
          "bg-[var(--ds-error-muted)] text-[var(--ds-error-text)] border-[var(--ds-error-border)]",
          "hover:bg-[color-mix(in_srgb,var(--ds-error-muted)_140%,transparent)]",
        ),
        link: "h-auto overflow-visible rounded-none border-0 bg-transparent px-0 text-[var(--ds-primary-text)] underline-offset-4 hover:underline shadow-none active:translate-y-0",
      },
      size: {
        xs: "h-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-[0.8125rem] [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-11 px-5 text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "h-12 px-6 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonPrimitive.Props &
  ButtonVariantProps & {
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /** Disable magnetic / ripple polish */
    plain?: boolean;
  };

type Ripple = { id: number; x: number; y: number };

function Button({
  className,
  variant = "default",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  plain = false,
  onClick,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonProps) {
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

  function spawnRipple(event: {
    currentTarget: HTMLElement;
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      {
        id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  }

  const button = (
    <ButtonPrimitive
      data-slot="button"
      data-state={loading ? "loading" : isDisabled ? "disabled" : "idle"}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (allowEffects) spawnRipple(event);
        onClick?.(event);
      }}
      onMouseMove={(event) => {
        if (allowMagnetic) {
          onMagneticMove(event as unknown as MouseEvent<HTMLElement>);
        }
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

      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      <span className={cn("relative z-[1]", loading && "opacity-90")}>
        {children}
      </span>
      {!loading && rightIcon ? (
        <span data-slot="button-arrow" className="relative z-[1] inline-flex">
          {rightIcon}
        </span>
      ) : null}
    </ButtonPrimitive>
  );

  if (!allowMagnetic) {
    return button;
  }

  return (
    <motion.span ref={shellRef} className="inline-flex" style={{ x, y }}>
      {button}
    </motion.span>
  );
}

export { Button, buttonVariants };
export type { ButtonVariantProps };
