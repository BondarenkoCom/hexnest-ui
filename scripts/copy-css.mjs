import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const stylesDir = resolve("src/styles");
const out = resolve("dist/styles.css");

const files = readdirSync(stylesDir)
  .filter((f) => f.endsWith(".css"))
  .sort();

if (files.length === 0) {
  throw new Error(`No .css files found in ${stylesDir}`);
}

const banner = "/* @hexnest/ui — bundled styles. Sources: src/styles/*.css */\n";
const parts = files.map((f) => {
  const body = readFileSync(resolve(stylesDir, f), "utf8");
  return `\n/* ─── ${f} ─────────────────────────────────────────────── */\n${body}`;
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, banner + parts.join("\n"), "utf8");

console.log(`Wrote ${out} from ${files.length} parts:`);
for (const f of files) console.log(`  - ${f}`);

// Copy assets/ → dist/assets/
const assetsDir = resolve("assets");
const outAssetsDir = resolve("dist/assets");
if (existsSync(assetsDir)) {
  mkdirSync(outAssetsDir, { recursive: true });
  cpSync(assetsDir, outAssetsDir, { recursive: true });
  console.log(`Copied ${assetsDir} → ${outAssetsDir}`);
}
