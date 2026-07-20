"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  delay?: number;
  disabled?: boolean;
  className?: string;
};

/**
 * Accessible tooltip — keyboard focus + hover. Uses Base UI for a11y.
 */
function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 8,
  delay = 400,
  disabled = false,
  className,
}: TooltipProps) {
  if (disabled) {
    return children;
  }

  return (
    <TooltipPrimitive.Provider delay={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          data-slot="tooltip-trigger"
          render={<span className="inline-flex" />}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset}>
            <TooltipPrimitive.Popup
              data-slot="tooltip-content"
              className={cn(
                "z-50 max-w-xs rounded-[var(--ds-radius-sm)] px-2.5 py-1.5",
                "border border-[var(--ds-border)] bg-[var(--ds-surface-elevated)]",
                "text-xs font-medium text-[var(--ds-foreground)] shadow-[var(--ds-shadow-md)]",
                "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
                "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
                "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
                className,
              )}
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip, TooltipPrimitive };
