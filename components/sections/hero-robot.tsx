"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, type CSSProperties } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const HeroRobotCanvas = dynamic(
  () => import("@/components/three/hero-robot/hero-robot-canvas"),
  { ssr: false },
);

/** 3D only kicks in at desktop widths — tablets/phones get a static image. */
const DESKTOP_QUERY = "(min-width: 1024px)";

const STATIC_ROBOT_SRC = "/images/hero-robot-static.webp";

export type HeroRobotProps = {
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
  /**
   * The hero mounts this component twice (desktop grid slot + mobile
   * stacked slot) and toggles which one is visible with CSS breakpoints.
   * Only the `"desktop"` variant is ever allowed to mount the WebGL
   * canvas — and only once a `min-width: 1024px` match is confirmed — so
   * the page never runs more than one robot scene, and phones/tablets
   * never pay for Three.js at all.
   */
  variant?: "desktop" | "mobile";
};

/**
 * Interactive 3D humanoid AI robot for the homepage hero — silver/white
 * chassis, glowing blue accents, floats gently and turns its head/upper
 * body toward the cursor. Desktop-only (`min-width: 1024px`); tablets and
 * phones render a lightweight static WebP instead so no WebGL/Three.js
 * bundle ever ships to them. Renders a real `.glb` model when one exists
 * at `public/models/robot.glb`, otherwise falls back to a procedural
 * placeholder robot automatically (see `components/three/hero-robot`).
 */
function HeroRobot({
  ariaLabel,
  className,
  style,
  variant = "desktop",
}: HeroRobotProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktopViewport = useMediaQuery(DESKTOP_QUERY);
  const showCanvas = variant === "desktop" && isDesktopViewport;
  const [ready, setReady] = useState(false);

  return (
    <figure
      data-slot="hero-robot"
      aria-label={ariaLabel}
      className={cn(
        "relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden md:max-w-none lg:aspect-[4/3]",
        "rounded-[var(--ds-radius-xl)]",
        className,
      )}
      style={style}
    >
      {/* Atmosphere — matches the rest of the hero visual language */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--ds-background)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(96 165 250 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(96 165 250 / 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary)]/25 blur-[70px] md:size-[20rem]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.35, 0.6, 0.35], scale: [0.94, 1.06, 0.94] }
        }
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] polish-noise opacity-[0.05] mix-blend-overlay"
      />

      {/* Static fallback — the default for phones/tablets, and the
          progressive-enhancement placeholder on desktop until the 3D
          canvas has mounted and rendered its first frame. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        initial={false}
        animate={{ opacity: showCanvas && ready ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={STATIC_ROBOT_SRC}
          alt=""
          fill
          sizes="(min-width: 1024px) 576px, (min-width: 768px) 480px, 90vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {variant === "desktop" ? (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showCanvas && ready ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {showCanvas ? (
            <HeroRobotCanvas
              reducedMotion={Boolean(prefersReducedMotion)}
              onReady={() => setReady(true)}
            />
          ) : null}
        </motion.div>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(5_8_22_/_0.55)_100%)]"
      />
    </figure>
  );
}

export { HeroRobot };
