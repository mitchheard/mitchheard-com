// Generates responsive WebP variants next to each source image:
//   public/projects/<name>.jpg -> <name>-400.webp, -800.webp, -1200.webp (and -1600.webp
//                                 when the source is that wide)
//   public/mitch.jpg           -> mitch-240.webp, mitch-480.webp
// The original JPGs stay as the <img> fallback. Output is committed, so the site build
// never runs this. Re-run after adding or replacing a screenshot:
//
//   npm run images
//
// Uses sharp, which is installed with Next.js. Widths larger than the source are skipped.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

const jobs = [
  ...(await readdir(path.join(root, "projects")))
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => ({ file: path.join("projects", f), widths: [400, 800, 1200, 1600] })),
  { file: "mitch.jpg", widths: [240, 480] },
];

let total = 0;
for (const { file, widths } of jobs) {
  const input = path.join(root, file);
  const { width: srcWidth } = await sharp(input).metadata();
  const base = input.replace(/\.jpg$/, "");
  for (const w of widths) {
    if (w > srcWidth) continue;
    const out = `${base}-${w}.webp`;
    const info = await sharp(input).resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(out);
    total += info.size;
    console.log(`${path.relative(root, out).padEnd(34)} ${String(Math.round(info.size / 1024)).padStart(4)} KB`);
  }
}
console.log(`total ${Math.round(total / 1024)} KB`);
