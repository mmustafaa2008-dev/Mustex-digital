import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { SectionSkeleton } from "@/components/ui/skeleton";
import { PageJsonLd } from "@/components/seo";
import { HeroSection, ServicesSection } from "@/components/sections";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("home");

const AboutSection = dynamic(
  () =>
    import("@/components/sections/about-section").then((mod) => ({
      default: mod.AboutSection,
    })),
  { loading: () => <SectionSkeleton />, ssr: true },
);

const WhyChooseSection = dynamic(
  () =>
    import("@/components/sections/why-choose-section").then((mod) => ({
      default: mod.WhyChooseSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const FeaturedWorkSection = dynamic(
  () =>
    import("@/components/sections/featured-work-section").then((mod) => ({
      default: mod.FeaturedWorkSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const TechnologyStackSection = dynamic(
  () =>
    import("@/components/sections/technology-stack-section").then((mod) => ({
      default: mod.TechnologyStackSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const DevelopmentProcessSection = dynamic(
  () =>
    import("@/components/sections/development-process-section").then((mod) => ({
      default: mod.DevelopmentProcessSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const IndustriesSection = dynamic(
  () =>
    import("@/components/sections/industries-section").then((mod) => ({
      default: mod.IndustriesSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const CommitmentSection = dynamic(
  () =>
    import("@/components/sections/commitment-section").then((mod) => ({
      default: mod.CommitmentSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const ConversionSection = dynamic(
  () =>
    import("@/components/sections/conversion-section").then((mod) => ({
      default: mod.ConversionSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

const FaqSection = dynamic(
  () =>
    import("@/components/sections/faq-section").then((mod) => ({
      default: mod.FaqSection,
    })),
  { loading: () => <SectionSkeleton /> },
);

/**
 * Mustex Digitals homepage — hero + services eager; remainder code-split.
 */
export default function Home() {
  return (
    <>
      <PageJsonLd routeKey="home" />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseSection />
      <FeaturedWorkSection />
      <TechnologyStackSection />
      <DevelopmentProcessSection />
      <IndustriesSection />
      <CommitmentSection />
      <ConversionSection />
      <FaqSection />
    </>
  );
}
