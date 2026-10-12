import * as THREE from "three";

export const ROAD_W = 14;
export const CP_GAP = 110;
export const CP_COUNT = 10;
export const FINISH_Z = -(CP_COUNT * CP_GAP + 60);

const rand = (a, b) => a + Math.random() * (b - a);

const addRoad = (scene, len) => {
  const road = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_W, len), new THREE.MeshStandardMaterial({ color: 0x10151f, roughness: 0.95 }));
  road.rotation.x = -Math.PI / 2;
  road.position.z = -len / 2 + 60;
  scene.add(road);
  [-1, 1].forEach((side) => {
    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, len), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    edge.position.set((side * ROAD_W) / 2, 0.04, road.position.z);
    scene.add(edge);
  });
  const count = Math.floor(len / 9);
  const dashes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.18, 0.02, 3), new THREE.MeshBasicMaterial({ color: 0x64748b }), count * 2);
  const m = new THREE.Matrix4();
  for (let i = 0; i < count; i++) {
    m.makeTranslation(-ROAD_W / 6, 0.02, 60 - i * 9);
    dashes.setMatrixAt(i * 2, m);
    m.makeTranslation(ROAD_W / 6, 0.02, 60 - i * 9);
    dashes.setMatrixAt(i * 2 + 1, m);
  }
  scene.add(dashes);
  const grid = new THREE.GridHelper(len * 1.3, 260, 0x3b1d8f, 0x161b2e);
  grid.position.set(0, -0.03, road.position.z);
  scene.add(grid);
};

const addTowers = (scene, len) => {
  const n = 180;
  const towers = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x131924, emissive: 0x0b2440, emissiveIntensity: 0.6 }),
    n
  );
  const m = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1;
    const h = rand(4, 34);
    const w = rand(2, 6);
    m.compose(
      new THREE.Vector3(side * (ROAD_W / 2 + rand(6, 40)), h / 2, 60 - Math.random() * len),
      new THREE.Quaternion(),
      new THREE.Vector3(w, h, w)
    );
    towers.setMatrixAt(i, m);
  }
  scene.add(towers);
};

const addCheckpoints = (scene) =>
  Array.from({ length: CP_COUNT }, (_, i) => {
    const x = rand(-ROAD_W / 2 + 3, ROAD_W / 2 - 3);
    const z = -(i + 1) * CP_GAP;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.15, 12, 48), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    ring.position.set(x, 2.4, z);
    const pad = new THREE.Mesh(new THREE.CircleGeometry(2.3, 32), new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.18 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(x, 0.03, z);
    scene.add(ring, pad);
    return { x, z, ring, pad, state: "pending" };
  });

const addObstacles = (scene, checkpoints) => {
  const geo = new THREE.ConeGeometry(0.5, 1.3, 12);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffb800, emissive: 0x5a3a00 });
  const list = [];
  checkpoints.forEach((cp) => {
    for (let k = 0; k < 3; k++) {
      const z = cp.z + rand(25, CP_GAP - 25);
      const x = rand(-ROAD_W / 2 + 1.5, ROAD_W / 2 - 1.5);
      const cone = new THREE.Mesh(geo, mat);
      cone.position.set(x, 0.65, z);
      scene.add(cone);
      list.push({ x, z, mesh: cone, alive: true, vy: 0 });
    }
  });
  return list;
};

const addFinish = (scene) => {
  const mat = new THREE.MeshBasicMaterial({ color: 0xff2bd6 });
  [-1, 1].forEach((s) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7, 0.5), mat);
    post.position.set((s * ROAD_W) / 2 + s * 0.5, 3.5, FINISH_Z);
    scene.add(post);
  });
  const banner = new THREE.Mesh(new THREE.BoxGeometry(ROAD_W + 2, 1.1, 0.3), mat);
  banner.position.set(0, 7, FINISH_Z);
  scene.add(banner);
};

export function buildTrack(scene) {
  const len = -FINISH_Z + 260;
  addRoad(scene, len);
  addTowers(scene, len);
  const checkpoints = addCheckpoints(scene);
  const obstacles = addObstacles(scene, checkpoints);
  addFinish(scene);

  const COLORS = { hit: 0x00ff9d, miss: 0xff3366 };
  return {
    checkpoints,
    obstacles,
    mark(i, hit) {
      const cp = checkpoints[i];
      cp.state = hit ? "hit" : "miss";
      cp.ring.material.color.setHex(COLORS[cp.state]);
      cp.pad.material.color.setHex(COLORS[cp.state]);
    },
    animate(t, dt) {
      checkpoints.forEach((cp, i) => {
        cp.ring.rotation.z = t * 0.8 + i;
        if (cp.state === "pending") cp.ring.scale.setScalar(1 + Math.sin(t * 4 + i) * 0.05);
      });
      obstacles.forEach((o) => {
        if (o.alive || !o.mesh.visible) return;
        o.vy -= 30 * dt;
        o.mesh.position.y += o.vy * dt;
        o.mesh.rotation.x += 8 * dt;
        if (o.mesh.position.y < -2) o.mesh.visible = false;
      });
    },
  };
}
