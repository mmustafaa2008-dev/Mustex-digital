"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import type { RobotPoseRefs } from "./types";

/** Drop a humanoid robot export here — GLB, silver/white chassis recommended. */
const MODEL_PATH = "/models/robot.glb";

const HEAD_NODE_NAMES = ["Head", "head", "Neck", "neck", "mixamorigHead"];
const BODY_NODE_NAMES = [
  "Spine2",
  "Chest",
  "chest",
  "UpperBody",
  "upperBody",
  "Spine",
  "spine",
  "mixamorigSpine2",
];

function findFirstNamed(root: THREE.Object3D, names: string[]) {
  for (const name of names) {
    const found = root.getObjectByName(name);
    if (found) return found;
  }
  return null;
}

/**
 * Loads a real `.glb` humanoid robot (see `MODEL_PATH`). Suspends while
 * fetching; throws if the asset is missing, which the parent
 * `CanvasErrorBoundary` catches to fall back to `RobotPlaceholder`.
 */
function RobotModel({ headRef, bodyRef }: RobotPoseRefs) {
  const { scene } = useGLTF(MODEL_PATH);
  const rootRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    headRef.current = findFirstNamed(root, HEAD_NODE_NAMES) ?? root;
    bodyRef.current = findFirstNamed(root, BODY_NODE_NAMES) ?? root;

    root.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return () => {
      headRef.current = null;
      bodyRef.current = null;
    };
  }, [scene, headRef, bodyRef]);

  return <primitive ref={rootRef} object={scene} dispose={null} />;
}

export { RobotModel, MODEL_PATH };
