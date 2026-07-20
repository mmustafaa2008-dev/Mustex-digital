/**
 * Shared primitive styles — single source for focus / disabled / transition.
 * All UI components should compose these instead of duplicating.
 */

export const uiTransition =
  "transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

export const uiFocusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-focus-ring-offset)]";

export const uiDisabled =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

export const uiInvalid =
  "aria-invalid:border-[var(--ds-error-border)] aria-invalid:ring-[var(--ds-error-muted)]";

/** Interactive surface base used by inputs / selects */
export const uiControlBase = [
  "w-full min-w-0 rounded-[var(--ds-radius-sm)] border border-[var(--ds-border)]",
  "bg-[var(--ds-surface-sunken)] text-[var(--ds-foreground)]",
  "placeholder:text-[var(--ds-foreground-muted)]",
  "hover:border-[var(--ds-border-strong)]",
  uiTransition,
  uiFocusRing,
  uiDisabled,
  uiInvalid,
].join(" ");
