import * as THREE from "three";

const disposeScene = (scene) => {
  scene.traverse((o) => {
    o.geometry?.dispose();
    if (o.material) [].concat(o.material).forEach((m) => m.dispose());
  });
};

const buildParticles = (count) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3.4 + Math.random() * 2.6;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.9;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0x9fe8ff, size: 0.028, transparent: true, opacity: 0.85 });
  return new THREE.Points(geo, mat);
};

export function createHeroScene(el) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const group = new THREE.Group();
  scene.add(group);
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.6, 1),
    new THREE.MeshStandardMaterial({ color: 0x0d1424, metalness: 0.9, roughness: 0.22, flatShading: true })
  );
  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.25, 1),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.32 })
  );
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, 0.012, 8, 240),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6 })
  );
  ring.rotation.x = 1.25;
  const particles = buildParticles(window.innerWidth < 768 ? 900 : 2200);
  particles.rotation.x = 0.35;
  group.add(core, shell, ring, particles);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const p1 = new THREE.PointLight(0x00f0ff, 60, 30);
  p1.position.set(4, 3, 5);
  const p2 = new THREE.PointLight(0x7000ff, 80, 30);
  p2.position.set(-5, -3, 3);
  scene.add(p1, p2);

  const mouse = { x: 0, y: 0 };
  const onMove = (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = el.clientWidth;
    const h = el.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    group.position.set(w > 1024 ? 2.8 : 0, w < 768 ? 2.4 : 0.3, 0);
    camera.position.z = w < 768 ? 16 : 10;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();

  const clock = new THREE.Clock();
  let raf;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    const intro = Math.min(1, t / 1.8);
    const s = 0.4 + 0.6 * (1 - Math.pow(1 - intro, 3));
    group.scale.setScalar(s);
    core.rotation.set(t * 0.18, t * 0.24, 0);
    shell.rotation.set(-t * 0.1, -t * 0.14, 0);
    particles.rotation.y = t * 0.05;
    ring.rotation.z = t * 0.12;
    group.rotation.y += (mouse.x * 0.6 - group.rotation.y) * 0.04;
    group.rotation.x += (mouse.y * 0.4 - group.rotation.x) * 0.04;
    group.position.y += Math.sin(t * 0.8) * 0.0015;
    renderer.render(scene, camera);
  };
  tick();

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      disposeScene(scene);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    },
  };
}
