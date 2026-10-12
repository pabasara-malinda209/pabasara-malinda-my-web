import * as THREE from "three";
import { buildVehicleMesh } from "./vehicleMeshes";
import { buildTrack, ROAD_W, CP_COUNT, FINISH_Z } from "./track";

const TIME_LIMIT = 45;
const BONUS = 4;
const COUNTDOWN = 3;
const KEYS = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", ArrowUp: "gas", KeyW: "gas", ArrowDown: "brake", KeyS: "brake", Space: "brake" };

const tuning = (v) => ({
  max: 26 + v.speed * 0.38,
  accel: 10 + v.speed * 0.14,
  brake: 18 + v.braking * 0.35,
  steer: 5 + v.handling * 0.1,
});

export function createGame(container, vehicle, { onHud, onFinish }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090e);
  scene.fog = new THREE.Fog(0x07090e, 45, 210);
  const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 500);
  camera.position.set(0, 4.2, 9.5);
  scene.add(new THREE.HemisphereLight(0x9fdcff, 0x0b0b1a, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(8, 20, 6);
  scene.add(sun);

  const track = buildTrack(scene);
  const car = buildVehicleMesh(vehicle.id, vehicle.color);
  scene.add(car);

  const t = tuning(vehicle);
  const s = { x: 0, z: 0, speed: 0, timeLeft: TIME_LIMIT, elapsed: 0, hits: 0, next: 0, countdown: COUNTDOWN, over: false };
  const input = { left: false, right: false, gas: false, brake: false };
  const camTarget = new THREE.Vector3();

  const onKey = (down) => (e) => {
    const k = KEYS[e.code];
    if (!k || /INPUT|TEXTAREA/.test(e.target?.tagName ?? "")) return;
    e.preventDefault();
    input[k] = down;
  };
  const kd = onKey(true);
  const ku = onKey(false);
  window.addEventListener("keydown", kd);
  window.addEventListener("keyup", ku);

  const emit = () =>
    onHud({
      speed: Math.round(s.speed * 3.6),
      timeLeft: Math.max(0, s.timeLeft),
      hits: s.hits,
      passed: s.next,
      total: CP_COUNT,
      progress: Math.min(1, s.z / FINISH_Z),
      countdown: s.countdown > 0 ? Math.ceil(s.countdown) : 0,
    });

  const finish = (won) => {
    s.over = true;
    emit();
    onFinish({ finished: won, hits: s.hits, total: CP_COUNT, time: s.elapsed });
  };

  const drive = (dt) => {
    const cruise = t.max * 0.55;
    if (input.brake) s.speed = Math.max(0, s.speed - t.brake * dt);
    else if (input.gas) s.speed = Math.min(t.max, s.speed + t.accel * dt);
    else s.speed += (cruise - s.speed) * Math.min(1, dt * 0.8);
    const steer = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const grip = 0.35 + 0.65 * Math.min(1, s.speed / 20);
    s.x = THREE.MathUtils.clamp(s.x + steer * t.steer * grip * dt, -ROAD_W / 2 + 1.3, ROAD_W / 2 - 1.3);
    s.z -= s.speed * dt;
    car.rotation.y = THREE.MathUtils.lerp(car.rotation.y, -steer * 0.2, 0.15);
    car.rotation.z = THREE.MathUtils.lerp(car.rotation.z, -steer * 0.05, 0.15);
  };

  const collide = () => {
    const cp = track.checkpoints[s.next];
    if (cp && s.z <= cp.z) {
      const hit = Math.abs(s.x - cp.x) < 2.3;
      track.mark(s.next, hit);
      if (hit) {
        s.hits += 1;
        s.timeLeft += BONUS;
      }
      s.next += 1;
    }
    track.obstacles.forEach((o) => {
      if (o.alive && Math.abs(o.z - s.z) < 1.6 && Math.abs(o.x - s.x) < 1.3) {
        o.alive = false;
        o.vy = 12;
        s.speed *= 0.4;
      }
    });
  };

  let hudT = 0;
  const update = (dt, realDt) => {
    if (s.countdown > 0) {
      s.countdown -= realDt;
    } else {
      drive(dt);
      collide();
      s.elapsed += dt;
      s.timeLeft -= dt;
    }
    car.position.set(s.x, 0, s.z);
    camTarget.set(s.x * 0.6, 4.2, s.z + 9.5);
    camera.position.lerp(camTarget, 0.12);
    camera.lookAt(s.x * 0.8, 1.2, s.z - 14);
    hudT += dt;
    if (hudT > 0.1) {
      hudT = 0;
      emit();
    }
    if (s.z <= FINISH_Z || s.timeLeft <= 0) finish(s.z <= FINISH_Z);
  };

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const clock = new THREE.Clock();
  let raf;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const realDt = clock.getDelta();
    const dt = Math.min(realDt, 0.05);
    if (!s.over) update(dt, realDt);
    track.animate(clock.elapsedTime, dt);
    renderer.render(scene, camera);
  };
  tick();

  return {
    setInput: (k, v) => {
      input[k] = v;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    },
  };
}
