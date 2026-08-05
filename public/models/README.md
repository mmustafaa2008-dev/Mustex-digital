# Hero robot model

Drop a humanoid robot export here as:

```
public/models/robot.glb
```

Requirements for a clean swap-in:

- Format: `.glb` (binary glTF), reasonably optimized (Draco/mesh-opt compression recommended, ideally < 5–8 MB).
- Polygon count: keep it low — aim for well under ~50k triangles (decimate/retopologize first). This is a small hero-corner visual, not a full-screen centerpiece, so extra detail only costs frame time without being visible.
- Materials: give the body a silver/white `MeshStandardMaterial`-friendly PBR material (metalness ~0.8, low roughness). Add a separate emissive material on the eyes/visor/accents (e.g. `#3b82f6`) so the "glow" reads correctly under the site's lighting rig.
- Rigging (optional but recommended): name the head bone/node `Head` (or `Neck`) and the chest/spine bone/node `Spine2` / `Chest` / `UpperBody` — the rig in `components/three/hero-robot/robot-model.tsx` looks for these names to drive the cursor-tracking head/upper-body rotation. If no matching node is found, the whole model rotates instead.
- Scale/orientation: model should be roughly human-proportioned, standing upright, facing `+Z`, feet near the origin (`y = 0`).

Until a real file exists at this path, the site automatically renders
`RobotPlaceholder` (a procedural silver/white robot built from primitives)
so the hero never breaks — see `components/three/hero-robot/robot-rig.tsx`.
