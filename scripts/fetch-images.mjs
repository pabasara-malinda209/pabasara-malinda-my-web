// Downloads the original project images into public/images/projects before the build.
// Source: the captured site's static CDN. Existing files are kept; failures only warn.
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const BASE = "https://modular-portfolio-2.preview.static.emergentagent.com/images/projects";
const NAMES = ["aether.jpg", "velocity.jpg", "zenith.jpg", "symphony.jpg"];
const OUT = path.join(process.cwd(), "public", "images", "projects");

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

await mkdir(OUT, { recursive: true });

for (const name of NAMES) {
  const dest = path.join(OUT, name);
  if (await exists(dest)) continue;
  try {
    const res = await fetch(`${BASE}/${name}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) throw new Error(`suspiciously small response (${buf.length} bytes)`);
    await writeFile(dest, buf);
    console.log(`[images] saved ${name} (${buf.length} bytes)`);
  } catch (err) {
    console.warn(`[images] could not fetch ${name}: ${err.message}`);
  }
}
