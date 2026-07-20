"use client";

import { Search } from "lucide-react";

import { createIconProps } from "@/lib/icons";
import { uiControlBase, uiFocusRing } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type NavSearchProps = {
  placeholder: string;
  searchAriaLabel: string;
  openSearchLabel: string;
  className?: string;
  onSubmit?: (query: string) => void;
  /** Compact icon trigger style for navbar */
  compact?: boolean;
};

/**
 * Search control for the navbar. Copy comes from the content layer.
 */
function NavSearch({
  placeholder,
  searchAriaLabel,
  openSearchLabel,
  className,
  onSubmit,
  compact = false,
}: NavSearchProps) {
  if (compact) {
    return (
      <button
        type="button"
        data-slot="nav-search"
        aria-label={openSearchLabel}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-[var(--ds-radius-sm)]",
          "text-[var(--ds-foreground-subtle)] hover:bg-[var(--ds-muted)] hover:text-[var(--ds-foreground)]",
          uiFocusRing,
          className,
        )}
        onClick={() => onSubmit?.("")}
      >
        <Search {...createIconProps({ size: "md", decorative: true })} />
      </button>
    );
  }

  return (
    <form
      data-slot="nav-search"
      role="search"
      className={cn("relative hidden md:block", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.(String(data.get("q") ?? ""));
      }}
    >
      <Search
        {...createIconProps({ size: "sm", decorative: true })}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--ds-foreground-muted)]"
      />
      <input
        type="search"
        name="q"
        placeholder={placeholder}
        aria-label={searchAriaLabel}
        className={cn(uiControlBase, "h-9 w-48 pl-9 pr-3 text-sm lg:w-64")}
      />
    </form>
  );
}

export { NavSearch };
