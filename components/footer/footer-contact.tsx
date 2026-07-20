import { Globe, Mail, MapPin, Phone } from "lucide-react";

import { createIconProps } from "@/lib/icons";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import type { FooterContactInfo } from "./types";

export type FooterContactProps = FooterContactInfo & {
  className?: string;
};

/**
 * Contact information block — all labels/values from content.
 */
function FooterContact({
  title,
  email,
  phone,
  address,
  hours,
  website,
  websiteLabel,
  className,
}: FooterContactProps) {
  const hasContent = Boolean(email || phone || address || hours || website);
  if (!hasContent) return null;

  return (
    <div
      data-slot="footer-contact"
      className={cn("flex flex-col gap-4", className)}
    >
      <p className="text-xs font-semibold tracking-[var(--tracking-caption)] text-[var(--ds-foreground)] uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-3 text-sm text-[var(--ds-foreground-subtle)]">
        {email ? (
          <li>
            <a
              href={`mailto:${email}`}
              className={cn(
                "inline-flex items-start gap-2.5 hover:text-[var(--ds-foreground)]",
                uiTransition,
                uiFocusRing,
                "rounded-[var(--ds-radius-xs)]",
              )}
            >
              <Mail
                {...createIconProps({ size: "sm", decorative: true })}
                className="mt-0.5 shrink-0 text-[var(--ds-primary-text)]"
              />
              <span>{email}</span>
            </a>
          </li>
        ) : null}
        {phone ? (
          <li>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className={cn(
                "inline-flex items-start gap-2.5 hover:text-[var(--ds-foreground)]",
                uiTransition,
                uiFocusRing,
                "rounded-[var(--ds-radius-xs)]",
              )}
            >
              <Phone
                {...createIconProps({ size: "sm", decorative: true })}
                className="mt-0.5 shrink-0 text-[var(--ds-primary-text)]"
              />
              <span>{phone}</span>
            </a>
          </li>
        ) : null}
        {website ? (
          <li>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-start gap-2.5 hover:text-[var(--ds-foreground)]",
                uiTransition,
                uiFocusRing,
                "rounded-[var(--ds-radius-xs)]",
              )}
            >
              <Globe
                {...createIconProps({ size: "sm", decorative: true })}
                className="mt-0.5 shrink-0 text-[var(--ds-primary-text)]"
              />
              <span>{websiteLabel ?? website}</span>
            </a>
          </li>
        ) : null}
        {address ? (
          <li className="inline-flex items-start gap-2.5">
            <MapPin
              {...createIconProps({ size: "sm", decorative: true })}
              className="mt-0.5 shrink-0 text-[var(--ds-primary-text)]"
            />
            <span>{address}</span>
          </li>
        ) : null}
        {hours ? (
          <li className="pl-7 text-[var(--ds-foreground-muted)]">{hours}</li>
        ) : null}
      </ul>
    </div>
  );
}

export { FooterContact };
