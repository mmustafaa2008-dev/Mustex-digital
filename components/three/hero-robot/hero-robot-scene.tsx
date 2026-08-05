"use client";

import { ContactShadows } from "@react-three/drei";

import { RobotRig } from "./robot-rig";

export type HeroRobotSceneProps = {
  reducedMotion: boolean;
};

/**
 * Lighting rig + grounding shadow for the hero robot — kept to exactly
 * three lights (hemisphere fill, key directional, blue rim directional)
 * for performance; no point lights, since the emissive materials on the
 * robot already sell the "glow" without an extra dynamic light per accent.
 * `hemisphereLight` stands in for the old ambient + fill point light combo
 * — a single cheap light gives the metallic body enough soft, directional
 * fill to read as silver/white instead of flat dark grey.
 */
function HeroRobotScene({ reducedMotion }: HeroRobotSceneProps) {
  return (
    <>
      <hemisphereLight args={["#dbeafe", "#0f172a", 1.1]} />
      <directionalLight
        position={[2.6, 4, 3]}
        intensity={2.2}
        color="#f8fafc"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0005}
      />
      <directionalLight
        position={[-3.2, 1.4, -2.4]}
        intensity={1.6}
        color="#3b82f6"
      />

      <RobotRig reducedMotion={reducedMotion} />

      <ContactShadows
        position={[0, -1.02, 0]}
        opacity={0.55}
        scale={5}
        blur={2.6}
        far={2.2}
        resolution={128}
        color="#020617"
      />
    </>
  );
}

export { HeroRobotScene };
