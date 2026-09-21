// Prepares photos for the /story page.
//
// usage (sharp is not a project dependency, install it only when needed):
//   npm i --no-save sharp
//   node scripts/foto.mjs <originals-folder> <area>
//   e.g. node scripts/foto.mjs ~/Desktop/PROGETTI/point-of-view-foto/storia storia
//
// For every photo it writes 3 widths as webp (800, 1600, 2400 px, never larger than
// the original) into client/public/<area>/..., keeping the sub-folders, and updates
// client/src/content/foto.json with the size and the available widths.
// The originals stay OUT of git (point-of-view-foto/ next to the project).

import sharp from "sharp";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const WIDTHS = [800, 1600, 2400];
const QUALITY = 84;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

const [, , source, area] = process.argv;
if (!source || !area) {
  console.error("usage: node scripts/foto.mjs <originals-folder> <area>");
  process.exit(1);
}

const root = path.resolve(source.replace(/^~/, os.homedir()));
const target = path.resolve("client/public", area);
const manifestPath = path.resolve("client/src/content/foto.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};

const slug = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function* photosIn(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* photosIn(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

let done = 0;
for (const file of photosIn(root)) {
  const relative = path.relative(root, file);
  const folders = path.dirname(relative).split(path.sep).filter((c) => c !== ".").map(slug);
  const name = slug(path.parse(relative).name);
  const outDir = path.join(target, ...folders);
  fs.mkdirSync(outDir, { recursive: true });

  // .rotate() applies the camera orientation, so portrait shots stay upright
  const image = sharp(file, { limitInputPixels: false }).rotate();
  const { info } = await image.clone().toBuffer({ resolveWithObject: true });

  const widths = WIDTHS.filter((w) => w < info.width);
  widths.push(Math.min(info.width, WIDTHS[WIDTHS.length - 1]));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    await image.clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, smartSubsample: true })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }

  const base = "/" + path.posix.join(area, ...folders, name);
  manifest[base] = { w: info.width, h: info.height, widths: unique };
  done++;
  console.log(`✓ ${relative}  →  ${base}  (${unique.join(", ")} px)`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${done} photos ready in client/public/${area}`);
