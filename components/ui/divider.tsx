"use client";

import { Separator } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0 border-0 bg-[var(--ds-border)]", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px min-h-4 self-stretch",
    },
    tone: {
      default: "bg-[var(--ds-border)]",
      subtle: "bg-[var(--ds-border-subtle)]",
      strong: "bg-[var(--ds-border-strong)]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    tone: "default",
  },
});

export type DividerProps = Omit<ComponentProps<typeof Separator>, "orientation"> &
  VariantProps<typeof dividerVariants>;

function Divider({
  className,
  orientation = "horizontal",
  tone = "default",
  ...props
}: DividerProps) {
  return (
    <Separator
      data-slot="divider"
      orientation={orientation ?? "horizontal"}
      className={cn(dividerVariants({ orientation, tone }), className)}
      {...props}
    />
  );
}

export { Divider, dividerVariants };
