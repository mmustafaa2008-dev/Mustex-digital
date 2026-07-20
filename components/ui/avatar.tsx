"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--ds-muted)] text-[var(--ds-foreground-subtle)] select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[0.625rem]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarProps = ComponentProps<"span"> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt: string;
    fallback?: string;
  };

function Avatar({
  className,
  size = "md",
  src,
  alt,
  fallback,
  ...props
}: AvatarProps) {
  const initials =
    fallback ??
    alt
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {src ? (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      ) : null}
      <AvatarPrimitive.Fallback
        className="flex size-full items-center justify-center font-medium"
        delay={src ? 400 : 0}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export { Avatar, avatarVariants };
