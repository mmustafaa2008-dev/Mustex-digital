import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";
import { SectionDescription } from "@/components/ui/section-description";
import { SectionHeading } from "@/components/ui/section-heading";

export type MarketingPageProps = {
  title: string;
  description: string;
  children?: ReactNode;
  primaryCta?: { label: string; href: string };
};

/**
 * Shared inner-page scaffold — navbar/footer come from the site layout.
 */
function MarketingPage({
  title,
  description,
  children,
  primaryCta,
}: MarketingPageProps) {
  const headingId = "page-heading";

  return (
    <Section
      as="section"
      spacing="xl"
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[var(--ds-background)] pt-10 md:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-border-glow)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[130px]"
      />

      <Container width="wide" className="relative z-10">
        <header className="mx-auto mb-10 flex max-w-3xl flex-col gap-4 md:mb-14 md:gap-5">
          <SectionHeading id={headingId} size="xl">
            {title}
          </SectionHeading>
          <SectionDescription size="lg">{description}</SectionDescription>
          {primaryCta ? (
            <div className="pt-2">
              <LinkButton href={primaryCta.href} size="lg" variant="default">
                {primaryCta.label}
              </LinkButton>
            </div>
          ) : null}
        </header>
        {children}
      </Container>
    </Section>
  );
}

export { MarketingPage };
