"use client";

import { RoundedBox } from "@react-three/drei";
import { memo } from "react";
import * as THREE from "three";

import type { RobotPoseRefs } from "./types";

const SILVER = "#e8ecf3";
const SILVER_DARK = "#aab3c2";
const GLOW_BLUE = "#3b82f6";
const GLOW_BLUE_LIGHT = "#7dd3fc";
const VISOR = "#0a0e1a";

/**
 * Shared, module-scoped geometries/materials — created once and reused
 * across every mesh that needs them (both arms, both legs, every glow
 * accent), instead of allocating a fresh GPU resource per instance.
 * Segment counts are kept low; this is a small, non-hero-sized silhouette
 * so extra tessellation buys nothing visually.
 */
const SILVER_MATERIAL = new THREE.MeshStandardMaterial({
  color: SILVER,
  metalness: 0.55,
  roughness: 0.32,
});
const DARK_MATERIAL = new THREE.MeshStandardMaterial({
  color: SILVER_DARK,
  metalness: 0.5,
  roughness: 0.42,
});
const VISOR_MATERIAL = new THREE.MeshStandardMaterial({
  color: VISOR,
  metalness: 0.4,
  roughness: 0.5,
});
const GLOW_BRIGHT_MATERIAL = new THREE.MeshStandardMaterial({
  color: GLOW_BLUE_LIGHT,
  emissive: GLOW_BLUE,
  emissiveIntensity: 3,
  toneMapped: false,
});
const GLOW_SOFT_MATERIAL = new THREE.MeshStandardMaterial({
  color: GLOW_BLUE_LIGHT,
  emissive: GLOW_BLUE,
  emissiveIntensity: 1.4,
  toneMapped: false,
});
const GLOW_DISC_MATERIAL = new THREE.MeshStandardMaterial({
  color: GLOW_BLUE_LIGHT,
  emissive: GLOW_BLUE,
  emissiveIntensity: 1.4,
  toneMapped: false,
  transparent: true,
  opacity: 0.55,
});

const SHOULDER_GEOMETRY = new THREE.SphereGeometry(0.095, 12, 10);
const UPPER_ARM_GEOMETRY = new THREE.CylinderGeometry(0.072, 0.078, 0.34, 10);
const ELBOW_RING_GEOMETRY = new THREE.TorusGeometry(0.062, 0.012, 8, 14);
const FOREARM_GEOMETRY = new THREE.CylinderGeometry(0.06, 0.066, 0.3, 10);
const HAND_GEOMETRY = new THREE.CapsuleGeometry(0.05, 0.09, 4, 8);

const HIP_JOINT_GEOMETRY = new THREE.SphereGeometry(0.1, 12, 10);
const THIGH_GEOMETRY = new THREE.CylinderGeometry(0.095, 0.1, 0.4, 10);
const ANKLE_RING_GEOMETRY = new THREE.TorusGeometry(0.078, 0.014, 8, 14);
const SHIN_GEOMETRY = new THREE.CylinderGeometry(0.08, 0.088, 0.42, 10);

const NECK_GEOMETRY = new THREE.CylinderGeometry(0.07, 0.08, 0.08, 10);
const EYE_GEOMETRY = new THREE.CapsuleGeometry(0.028, 0.05, 4, 6);
const ANTENNA_STICK_GEOMETRY = new THREE.CylinderGeometry(0.012, 0.012, 0.14, 6);
const ANTENNA_TIP_GEOMETRY = new THREE.SphereGeometry(0.028, 10, 8);

const CHEST_RING_GEOMETRY = new THREE.TorusGeometry(0.085, 0.017, 10, 20);
const CHEST_DISC_GEOMETRY = new THREE.CircleGeometry(0.06, 16);
const COLLAR_RING_GEOMETRY = new THREE.TorusGeometry(0.19, 0.012, 8, 20);

function Arm({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  const shoulderX = 0.36 * sign;
  const swing = 0.06 * sign;

  return (
    <group position={[shoulderX, 0.26, 0]} rotation={[0, 0, -swing]}>
      <mesh geometry={SHOULDER_GEOMETRY} material={DARK_MATERIAL} castShadow />
      <mesh
        geometry={UPPER_ARM_GEOMETRY}
        material={SILVER_MATERIAL}
        position={[0.02 * sign, -0.19, 0]}
        rotation={[0, 0, 0.05 * sign]}
        castShadow
      />
      <mesh
        geometry={ELBOW_RING_GEOMETRY}
        material={GLOW_SOFT_MATERIAL}
        position={[0.045 * sign, -0.38, 0.01]}
      />
      <mesh
        geometry={FOREARM_GEOMETRY}
        material={SILVER_MATERIAL}
        position={[0.06 * sign, -0.55, 0.02]}
        rotation={[0.08, 0, 0.03 * sign]}
        castShadow
      />
      <mesh
        geometry={HAND_GEOMETRY}
        material={DARK_MATERIAL}
        position={[0.07 * sign, -0.73, 0.03]}
      />
    </group>
  );
}

function Leg({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1;
  const hipX = 0.16 * sign;

  return (
    <group position={[hipX, 0, 0]}>
      <mesh geometry={HIP_JOINT_GEOMETRY} material={DARK_MATERIAL} castShadow />
      <mesh
        geometry={THIGH_GEOMETRY}
        material={SILVER_MATERIAL}
        position={[0, -0.24, 0]}
        castShadow
      />
      <mesh
        geometry={ANKLE_RING_GEOMETRY}
        material={GLOW_SOFT_MATERIAL}
        position={[0, -0.46, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={SHIN_GEOMETRY}
        material={SILVER_MATERIAL}
        position={[0, -0.7, 0]}
        castShadow
      />
      <RoundedBox
        args={[0.16, 0.09, 0.28]}
        radius={0.035}
        smoothness={2}
        material={DARK_MATERIAL}
        position={[0, -0.94, 0.06]}
        castShadow
      />
    </group>
  );
}

/**
 * Procedural stand-in humanoid — silver/white chassis with glowing blue
 * accents, built from primitives so no external `.glb` asset is required.
 * Drop a real model at `public/models/robot.glb` and it is used instead
 * (see `robot-model.tsx`); this component keeps working as the graceful
 * fallback either way.
 */
function RobotPlaceholder({ headRef, bodyRef }: RobotPoseRefs) {
  return (
    <group>
      {/* Legs — static, planted; not part of the head/body look-rotation */}
      <group position={[0, -0.52, 0]}>
        <RoundedBox
          args={[0.42, 0.2, 0.3]}
          radius={0.08}
          smoothness={2}
          material={SILVER_MATERIAL}
          position={[0, 0.02, 0]}
          castShadow
        />
        <Leg side="left" />
        <Leg side="right" />
      </group>

      {/* Upper body — rotates toward the cursor */}
      <group
        ref={bodyRef as React.MutableRefObject<THREE.Group | null>}
        position={[0, 0.02, 0]}
      >
        <RoundedBox
          args={[0.58, 0.7, 0.36]}
          radius={0.15}
          smoothness={2}
          material={SILVER_MATERIAL}
          castShadow
          receiveShadow
        />

        {/* Chest core */}
        <mesh
          geometry={CHEST_RING_GEOMETRY}
          material={GLOW_BRIGHT_MATERIAL}
          position={[0, 0.1, 0.2]}
        />
        <mesh
          geometry={CHEST_DISC_GEOMETRY}
          material={GLOW_DISC_MATERIAL}
          position={[0, 0.1, 0.19]}
        />

        {/* Collar accent */}
        <mesh
          geometry={COLLAR_RING_GEOMETRY}
          material={GLOW_SOFT_MATERIAL}
          position={[0, 0.36, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <Arm side="left" />
        <Arm side="right" />

        {/* Head — rotates further than the body for a natural layered look */}
        <group
          ref={headRef as React.MutableRefObject<THREE.Group | null>}
          position={[0, 0.62, 0]}
        >
          <mesh
            geometry={NECK_GEOMETRY}
            material={DARK_MATERIAL}
            position={[0, -0.09, 0]}
            castShadow
          />
          <RoundedBox
            args={[0.34, 0.36, 0.34]}
            radius={0.1}
            smoothness={2}
            material={SILVER_MATERIAL}
            castShadow
            receiveShadow
          />

          {/* Visor */}
          <RoundedBox
            args={[0.26, 0.13, 0.05]}
            radius={0.05}
            smoothness={2}
            material={VISOR_MATERIAL}
            position={[0, 0.01, 0.15]}
          />

          {/* Glowing eyes */}
          <mesh
            geometry={EYE_GEOMETRY}
            material={GLOW_BRIGHT_MATERIAL}
            position={[-0.075, 0.01, 0.185]}
            rotation={[0, 0, Math.PI / 2]}
          />
          <mesh
            geometry={EYE_GEOMETRY}
            material={GLOW_BRIGHT_MATERIAL}
            position={[0.075, 0.01, 0.185]}
            rotation={[0, 0, Math.PI / 2]}
          />

          {/* Antenna */}
          <mesh
            geometry={ANTENNA_STICK_GEOMETRY}
            material={DARK_MATERIAL}
            position={[0, 0.22, 0]}
          />
          <mesh
            geometry={ANTENNA_TIP_GEOMETRY}
            material={GLOW_BRIGHT_MATERIAL}
            position={[0, 0.3, 0]}
          />
        </group>
      </group>
    </group>
  );
}

const MemoizedRobotPlaceholder = memo(RobotPlaceholder);

export { MemoizedRobotPlaceholder as RobotPlaceholder };
