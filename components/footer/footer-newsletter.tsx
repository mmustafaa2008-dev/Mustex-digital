"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import type { FooterNewsletterConfig } from "./types";

export type FooterNewsletterProps = FooterNewsletterConfig & {
  className?: string;
  /** Compact column vs full-width banner */
  layout?: "stack" | "banner";
};

/**
 * Newsletter capture form for the footer.
 * All copy is supplied by the content layer.
 */
function FooterNewsletter({
  title,
  description,
  placeholder,
  submitLabel,
  emailLabel,
  successMessage,
  errorMessage,
  onSubmit,
  className,
  layout = "stack",
}: FooterNewsletterProps) {
  const reactId = useId();
  const emailId = `footer-newsletter-email-${reactId}`;
  const statusId = `footer-newsletter-status-${reactId}`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const isBanner = layout === "banner";

  return (
    <div
      data-slot="footer-newsletter"
      className={cn(
        "rounded-[var(--ds-radius-xl)] border border-[var(--ds-border-subtle)]",
        "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        isBanner
          ? "flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8"
          : "flex flex-col gap-4 p-5",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-1.5", isBanner && "max-w-md")}>
        <p
          className={cn(
            "font-semibold text-[var(--ds-foreground)]",
            isBanner
              ? "text-lg text-[var(--ds-primary-text)] md:text-xl"
              : "text-sm",
          )}
        >
          {title}
        </p>
        <p className="text-sm leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]">
          {description}
        </p>
      </div>

      <div className={cn("flex w-full flex-col gap-3", isBanner && "md:max-w-md")}>
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            if (!email.trim()) return;

            try {
              setStatus("loading");
              await onSubmit?.(email.trim());
              setStatus("success");
              setEmail("");
            } catch {
              setStatus("error");
            }
          }}
        >
          <div className="min-w-0 flex-1 space-y-1.5">
            <Label htmlFor={emailId} className="sr-only">
              {emailLabel}
            </Label>
            <Input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder={placeholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "success" || status === "error") {
                  setStatus("idle");
                }
              }}
              disabled={status === "loading"}
              aria-invalid={status === "error" || undefined}
              aria-describedby={statusId}
            />
          </div>
          <Button
            type="submit"
            size="md"
            loading={status === "loading"}
            className="shrink-0 shadow-[var(--ds-shadow-glow-sm)] sm:w-auto"
          >
            {submitLabel}
          </Button>
        </form>

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className="min-h-5 text-xs text-[var(--ds-foreground-muted)]"
        >
          {status === "success"
            ? successMessage
            : status === "error"
              ? errorMessage
              : null}
        </p>
      </div>
    </div>
  );
}

export { FooterNewsletter };
