import type { Metadata } from "next";

import { MarketingPage } from "@/components/layout/marketing-page";
import { PageJsonLd } from "@/components/seo";
import { ConversionSection } from "@/components/sections";
import { company } from "@/data/company";
import { conversion } from "@/data/conversion";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <PageJsonLd routeKey="contact" />
      <MarketingPage
        title="Contact"
        description={`Reach ${company.name} at ${company.contact.email}. Tell us about your product, timeline, and goals.`}
        primaryCta={{
          label: conversion.primaryCta.label,
          href: conversion.primaryCta.href,
        }}
      />
      <ConversionSection hideIntro />
    </>
  );
}
