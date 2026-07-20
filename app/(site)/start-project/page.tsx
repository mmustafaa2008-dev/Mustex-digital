import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageJsonLd } from "@/components/seo";
import { StartProjectWizard } from "@/components/start-project";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("startProject");

export default function StartProjectPage() {
  return (
    <>
      <PageJsonLd routeKey="startProject" />
      <Section
        as="section"
        spacing="xl"
        aria-labelledby="start-project-heading"
        className="relative overflow-hidden bg-[var(--ds-background)] pt-10 md:pt-14"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-border-glow)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[var(--ds-primary)]/10 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 size-[28rem] rounded-full bg-[var(--ds-primary)]/8 blur-[120px]"
        />

        <Container width="wide" className="relative z-10">
          <StartProjectWizard />
        </Container>
      </Section>
    </>
  );
}
