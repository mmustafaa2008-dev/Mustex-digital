import type { MutableRefObject } from "react";
import type { Object3D } from "three";

/**
 * Shared refs the rig uses to steer the head/upper-body of whichever robot
 * renderer is mounted (real `.glb` model or the procedural placeholder).
 */
export type RobotPoseRefs = {
  headRef: MutableRefObject<Object3D | null>;
  bodyRef: MutableRefObject<Object3D | null>;
};
