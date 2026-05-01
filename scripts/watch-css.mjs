/**
 * Watches src/styles/*.css and re-runs copy-css.mjs on any change.
 * Uses Node.js built-in fs.watch — no extra dependencies.
 */
import { watch } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = resolve(__dirname, "../src/styles");
const copyScript = resolve(__dirname, "copy-css.mjs");

function runCopy() {
  const child = fork(copyScript, [], { stdio: "inherit", cwd: __dirname + "/.." });
  child.on("exit", (code) => {
    if (code !== 0) console.error("[watch-css] copy-css.mjs exited with code", code);
  });
}

// Initial build
runCopy();

watch(stylesDir, { persistent: true }, (eventType, filename) => {
  if (filename && filename.endsWith(".css")) {
    console.log(`[watch-css] ${eventType}: ${filename} — rebuilding styles...`);
    runCopy();
  }
});

console.log(`[watch-css] Watching ${stylesDir}`);
