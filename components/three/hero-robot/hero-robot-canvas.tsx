"use client";

import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";

import { HeroRobotScene } from "./hero-robot-scene";

export type HeroRobotCanvasProps = {
  reducedMotion: boolean;
  onReady?: () => void;
};

/** How long to keep animating after the pointer leaves, so the head/body
 * can ease back toward a neutral pose instead of freezing mid-turn. */
const SETTLE_MS = 900;

/**
 * Client-only WebGL surface for the hero robot. Kept as a leaf component so
 * the parent can lazy-load it with `next/dynamic` (no SSR, smaller initial
 * bundle) and cross-fade it in once ready.
 *
 * Performance: the render loop is `"demand"` — nothing renders, and no
 * animation runs, unless the user is actively hovering/interacting (plus a
 * brief settle window after they leave). Idle cost is effectively zero.
 */
function HeroRobotCanvas({ reducedMotion, onReady }: HeroRobotCanvasProps) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [active, setActive] = useState(false);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSettleTimeout = useCallback(() => {
    if (settleTimeout.current) {
      clearTimeout(settleTimeout.current);
      settleTimeout.current = null;
    }
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (reducedMotion) return;
    clearSettleTimeout();
    setActive(true);
  }, [reducedMotion, clearSettleTimeout]);

  const handlePointerLeave = useCallback(() => {
    if (reducedMotion) return;
    clearSettleTimeout();
    settleTimeout.current = setTimeout(() => setActive(false), SETTLE_MS);
  }, [reducedMotion, clearSettleTimeout]);

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.12, 3.35], fov: 30 }}
      frameloop={reducedMotion || !active ? "demand" : "always"}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        onReady?.();
      }}
      className="!touch-none"
    >
      <PerformanceMonitor
        onDecline={() => setDpr([1, 1])}
        onIncline={() => setDpr([1, 1.5])}
      />
      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
      <HeroRobotScene reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export default HeroRobotCanvas;
