"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";

import { createIconProps } from "@/lib/icons";
import { uiDisabled, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type CheckboxProps = CheckboxPrimitive.Root.Props & {
  className?: string;
};

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--ds-radius-xs)]",
        "border border-[var(--ds-border)] bg-[var(--ds-surface-sunken)]",
        "data-[checked]:border-[var(--ds-primary)] data-[checked]:bg-[var(--ds-primary)]",
        "data-[checked]:text-[var(--ds-primary-foreground)]",
        "data-[indeterminate]:border-[var(--ds-primary)] data-[indeterminate]:bg-[var(--ds-primary)]",
        uiTransition,
        uiFocusRing,
        uiDisabled,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current data-[unchecked]:hidden"
      >
        <Check {...createIconProps({ size: "xs", decorative: true })} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root>;
export { Checkbox, CheckboxPrimitive };
