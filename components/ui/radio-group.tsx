"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type { ComponentProps } from "react";

import { uiDisabled, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive>;

function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

export type RadioGroupItemProps = Radio.Root.Props & {
  className?: string;
};

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <Radio.Root
      data-slot="radio-group-item"
      className={cn(
        "peer inline-flex size-4 shrink-0 items-center justify-center rounded-full",
        "border border-[var(--ds-border)] bg-[var(--ds-surface-sunken)]",
        "data-[checked]:border-[var(--ds-primary)]",
        uiTransition,
        uiFocusRing,
        uiDisabled,
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="flex size-full items-center justify-center data-[unchecked]:hidden">
        <span className="size-2 rounded-full bg-[var(--ds-primary)]" />
      </Radio.Indicator>
    </Radio.Root>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupPrimitive };
