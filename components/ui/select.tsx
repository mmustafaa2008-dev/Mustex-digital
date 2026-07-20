"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import { uiControlBase, uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  [
    uiControlBase,
    "inline-flex items-center justify-between gap-2 text-left",
    "data-[placeholder]:text-[var(--ds-foreground-muted)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-3.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  className?: string;
} & VariantProps<typeof selectTriggerVariants>;

function Select({
  options,
  placeholder = "Select an option",
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  loading = false,
  size = "md",
  name,
  id,
  className,
  ...a11y
}: SelectProps) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={isDisabled}
      name={name}
    >
      <SelectPrimitive.Trigger
        id={id}
        data-slot="select-trigger"
        aria-busy={loading || undefined}
        className={cn(selectTriggerVariants({ size }), className)}
        {...a11y}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin opacity-70" />
        ) : (
          <SelectPrimitive.Icon>
            <ChevronDown className="size-4 shrink-0 opacity-70" />
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          className="outline-none"
          sideOffset={6}
          alignItemWithTrigger={false}
        >
          <SelectPrimitive.Popup
            data-slot="select-popup"
            className={cn(
              "z-50 max-h-[min(20rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto",
              "rounded-[var(--ds-radius-md)] border border-[var(--ds-border)]",
              "bg-[var(--ds-surface-elevated)] text-[var(--ds-foreground)] shadow-[var(--ds-shadow-lg)]",
              "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            )}
          >
            <SelectPrimitive.List className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex cursor-default items-center gap-2 rounded-[var(--ds-radius-xs)] px-2 py-2 text-sm outline-none select-none",
                    "data-[highlighted]:bg-[var(--ds-muted)] data-[highlighted]:text-[var(--ds-foreground)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    uiTransition,
                    uiFocusRing,
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute right-2">
                    <Check className="size-3.5 text-[var(--ds-primary-text)]" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export type SelectRootProps = ComponentProps<typeof SelectPrimitive.Root>;
export { Select, selectTriggerVariants, SelectPrimitive };
