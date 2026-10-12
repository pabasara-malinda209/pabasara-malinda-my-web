import * as THREE from "three";

const std = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.4, ...extra });
const glass = () => std(0x0b1220, { metalness: 0.9, roughness: 0.1 });
const glow = (color) => new THREE.MeshBasicMaterial({ color });

const box = (w, h, d, mat, x, y, z) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
};

const wheel = (r, x, z) => {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.35, 16), std(0x0a0a0a, { metalness: 0.1 }));
  m.rotation.z = Math.PI / 2;
  m.position.set(x, r, z);
  return m;
};

const lights = (w, y, z) => [box(w * 0.28, 0.12, 0.05, glow(0xff2255), -w * 0.32, y, z), box(w * 0.28, 0.12, 0.05, glow(0xff2255), w * 0.32, y, z)];

const BUILDERS = {
  sports: (c) => [
    box(1.9, 0.5, 4, std(c), 0, 0.55, 0),
    box(1.4, 0.42, 1.8, glass(), 0, 1.0, 0.2),
    box(1.9, 0.08, 0.5, std(0x111111), 0, 0.95, 1.85),
    ...lights(1.9, 0.6, 2.01),
    wheel(0.38, -0.95, 1.3), wheel(0.38, 0.95, 1.3), wheel(0.38, -0.95, -1.3), wheel(0.38, 0.95, -1.3),
  ],
  bus: (c) => [
    box(2.5, 2.3, 7, std(c), 0, 1.65, 0),
    box(2.52, 0.7, 6.2, glass(), 0, 2.2, -0.2),
    box(2.52, 0.18, 7.02, std(0xd22c4b), 0, 1.0, 0),
    ...lights(2.5, 1.0, 3.51),
    wheel(0.55, -1.2, 2.3), wheel(0.55, 1.2, 2.3), wheel(0.55, -1.2, -2.3), wheel(0.55, 1.2, -2.3),
  ],
  truck: (c) => [
    box(2.3, 2.0, 2.0, std(c), 0, 1.5, -2.4),
    box(2.0, 0.7, 0.1, glass(), 0, 1.95, -3.41),
    box(2.5, 2.6, 5, std(0x1f2937), 0, 1.85, 1.2),
    ...lights(2.5, 0.8, 3.71),
    wheel(0.55, -1.15, -2.4), wheel(0.55, 1.15, -2.4), wheel(0.55, -1.2, 0.6), wheel(0.55, 1.2, 0.6), wheel(0.55, -1.2, 2.6), wheel(0.55, 1.2, 2.6),
  ],
  tuktuk: (c) => [
    box(1.5, 1.0, 2.4, std(c), 0, 0.95, 0.1),
    box(1.6, 0.1, 2.5, std(0x111111), 0, 2.15, 0.1),
    box(0.08, 0.75, 0.08, std(0x111111), -0.7, 1.75, -1.0),
    box(0.08, 0.75, 0.08, std(0x111111), 0.7, 1.75, -1.0),
    box(1.3, 0.6, 0.06, glass(), 0, 1.75, -1.0),
    ...lights(1.5, 0.9, 1.31),
    wheel(0.32, 0, -1.2), wheel(0.32, -0.7, 1.0), wheel(0.32, 0.7, 1.0),
  ],
};

export function buildVehicleMesh(id, color) {
  const group = new THREE.Group();
  BUILDERS[id](new THREE.Color(color)).forEach((m) => group.add(m));
  return group;
}
