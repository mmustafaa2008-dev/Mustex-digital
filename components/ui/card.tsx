"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps, ElementType, ReactNode } from "react";

import { cardHover } from "@/lib/motion";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "relative rounded-[var(--ds-radius-lg)] border text-[var(--ds-foreground)]",
    "polish-gradient-border polish-glass-reflection",
    "hover:-translate-y-1 hover:scale-[1.015]",
    "hover:border-[var(--ds-primary-text)]/35 hover:shadow-[var(--ds-shadow-glow-sm)]",
    uiTransition,
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-[var(--ds-border-subtle)] bg-[var(--ds-surface)] shadow-[var(--ds-shadow-sm)]",
        elevated:
          "border-[var(--ds-border)] bg-[var(--ds-surface-elevated)] shadow-[var(--ds-shadow-md)]",
        outline:
          "border-[var(--ds-border)] bg-transparent shadow-none",
        muted:
          "border-[var(--ds-border-subtle)] bg-[var(--ds-muted)] shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: cn(
          "cursor-pointer",
          uiFocusRing,
        ),
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  },
);

export type CardProps = ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    as?: ElementType;
    motionPreset?: boolean;
  };

function Card({
  className,
  variant = "default",
  padding = "md",
  interactive = false,
  motionPreset = false,
  as: Comp = "div",
  ...props
}: CardProps) {
  const classes = cn(
    cardVariants({ variant, padding, interactive }),
    className,
  );

  if (motionPreset) {
    return (
      <motion.div
        data-slot="card"
        className={classes}
        tabIndex={interactive ? 0 : undefined}
        {...(cardHover as HTMLMotionProps<"div">)}
        {...(props as HTMLMotionProps<"div">)}
      />
    );
  }

  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "div";

  return (
    <Component
      data-slot="card"
      className={classes}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-[length:var(--text-heading-sm)] leading-[var(--leading-heading)] font-semibold tracking-[var(--tracking-heading)]",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm text-[var(--ds-foreground-muted)] leading-[var(--leading-body)]",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("mt-4", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-6 flex items-center gap-3", className)}
      {...props}
    />
  );
}

export type { ReactNode as CardReactNode };
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
