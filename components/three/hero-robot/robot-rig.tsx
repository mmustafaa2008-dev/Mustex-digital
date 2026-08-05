"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import { CanvasErrorBoundary } from "../canvas-error-boundary";
import { RobotModel } from "./robot-model";
import { RobotPlaceholder } from "./robot-placeholder";

export type RobotRigProps = {
  /** Skip idle floating + cursor tracking; hold a neutral, static pose. */
  reducedMotion: boolean;
};

const HEAD_YAW_LIMIT = THREE.MathUtils.degToRad(26);
const HEAD_PITCH_LIMIT = THREE.MathUtils.degToRad(12);
const BODY_YAW_LIMIT = THREE.MathUtils.degToRad(9);
const BODY_PITCH_LIMIT = THREE.MathUtils.degToRad(4);
const HEAD_DAMP = 7;
const BODY_DAMP = 4.5;

/**
 * Composes the robot renderer (real `.glb` model, falling back to the
 * procedural placeholder) with idle floating and cursor-tracking head/body
 * rotation.
 */
function RobotRig({ reducedMotion }: RobotRigProps) {
  const headRef = useRef<THREE.Object3D | null>(null);
  const bodyRef = useRef<THREE.Object3D | null>(null);
  const baseHead = useRef(new THREE.Euler());
  const baseBody = useRef(new THREE.Euler());
  const capturedFor = useRef<{
    head: THREE.Object3D | null;
    body: THREE.Object3D | null;
  }>({ head: null, body: null });

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const head = headRef.current;
    const body = bodyRef.current;
    const { pointer } = state;

    if (head && capturedFor.current.head !== head) {
      baseHead.current.copy(head.rotation);
      capturedFor.current.head = head;
    }
    if (body && capturedFor.current.body !== body) {
      baseBody.current.copy(body.rotation);
      capturedFor.current.body = body;
    }

    if (head) {
      const targetY = baseHead.current.y + pointer.x * HEAD_YAW_LIMIT;
      const targetX = baseHead.current.x + pointer.y * HEAD_PITCH_LIMIT;
      head.rotation.y = THREE.MathUtils.damp(
        head.rotation.y,
        targetY,
        HEAD_DAMP,
        delta,
      );
      head.rotation.x = THREE.MathUtils.damp(
        head.rotation.x,
        targetX,
        HEAD_DAMP,
        delta,
      );
    }

    if (body) {
      const targetY = baseBody.current.y + pointer.x * BODY_YAW_LIMIT;
      const targetX = baseBody.current.x + pointer.y * BODY_PITCH_LIMIT;
      body.rotation.y = THREE.MathUtils.damp(
        body.rotation.y,
        targetY,
        BODY_DAMP,
        delta,
      );
      body.rotation.x = THREE.MathUtils.damp(
        body.rotation.x,
        targetX,
        BODY_DAMP,
        delta,
      );
    }
  });

  const renderer = (
    <CanvasErrorBoundary
      fallback={<RobotPlaceholder headRef={headRef} bodyRef={bodyRef} />}
    >
      <Suspense
        fallback={<RobotPlaceholder headRef={headRef} bodyRef={bodyRef} />}
      >
        <RobotModel headRef={headRef} bodyRef={bodyRef} />
      </Suspense>
    </CanvasErrorBoundary>
  );

  if (reducedMotion) {
    return <group position={[0, -0.06, 0]}>{renderer}</group>;
  }

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.1}
      floatIntensity={0.55}
      floatingRange={[-0.05, 0.05]}
    >
      <group position={[0, -0.06, 0]}>{renderer}</group>
    </Float>
  );
}

export { RobotRig };
