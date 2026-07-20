"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { createIconProps } from "@/lib/icons";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type FaqItemProps = {
  question: string;
  answer: string;
  value?: string;
  className?: string;
};

/**
 * Single FAQ accordion item — glass panel with animated open/close.
 */
function FaqItem({
  question,
  answer,
  value,
  className,
}: FaqItemProps) {
  const itemValue = value ?? question;

  return (
    <Accordion.Item
      value={itemValue}
      data-slot="faq-item"
      className={cn(
        "group/item overflow-hidden rounded-[var(--ds-radius-lg)]",
        "border border-[var(--ds-border-subtle)]",
        "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        "transition-[border-color,box-shadow,transform] duration-[var(--duration-normal)] ease-[var(--ease-standard)]",
        "hover:border-[var(--ds-primary-text)]/30 hover:shadow-[var(--ds-shadow-glow-sm)]",
        "data-[open]:border-[var(--ds-primary-text)]/35 data-[open]:shadow-[var(--ds-shadow-glow-sm)]",
        className,
      )}
    >
      <Accordion.Header className="m-0">
        <Accordion.Trigger
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6",
            "text-base font-semibold tracking-[var(--tracking-heading)] text-[var(--ds-foreground)] md:text-lg",
            "hover:text-[var(--ds-primary-text)]",
            uiTransition,
            uiFocusRing,
            "rounded-[var(--ds-radius-lg)]",
            "group",
          )}
        >
          <span className="pr-2">{question}</span>
          <span
            className={cn(
              "polish-icon-glow inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--ds-radius-md)]",
              "border border-[var(--ds-border-subtle)] bg-[var(--ds-primary-muted)]",
              "text-[var(--ds-primary-text)]",
              "transition-[transform,border-color,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
              "group-hover:border-[var(--ds-primary-text)]/35",
              "group-data-[panel-open]:rotate-180 group-data-[panel-open]:shadow-[var(--ds-shadow-glow-sm)]",
            )}
          >
            <ChevronDown
              {...createIconProps({ size: "sm", decorative: true })}
            />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel
        keepMounted
        className={cn(
          "h-[var(--accordion-panel-height)] overflow-hidden",
          "text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)] md:text-base",
          "transition-[height,opacity] duration-[var(--duration-slow)] ease-[var(--ease-soft)]",
          "data-[starting-style]:h-0 data-[starting-style]:opacity-0",
          "data-[ending-style]:h-0 data-[ending-style]:opacity-0",
          "motion-reduce:transition-none",
        )}
      >
        <div className="px-5 pr-14 pb-5 md:px-6 md:pr-16 md:pb-6">{answer}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export type FaqListProps = {
  items: Array<Omit<FaqItemProps, "className"> & { className?: string }>;
  className?: string;
  /** Allow multiple open items */
  multiple?: boolean;
  defaultValue?: string[];
};

/**
 * Ready-to-use FAQ list wrapping Base UI Accordion.
 * Keyboard: Enter/Space toggle, arrows move between triggers.
 */
function FaqList({
  items,
  className,
  multiple = false,
  defaultValue,
}: FaqListProps) {
  return (
    <Accordion.Root
      data-slot="faq-list"
      multiple={multiple}
      defaultValue={defaultValue}
      keepMounted
      className={cn("flex flex-col gap-3 md:gap-4", className)}
    >
      {items.map((item) => (
        <FaqItem key={item.value ?? item.question} {...item} />
      ))}
    </Accordion.Root>
  );
}

export { FaqItem, FaqList, Accordion as FaqAccordion };
