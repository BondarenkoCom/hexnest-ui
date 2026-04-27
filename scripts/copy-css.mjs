import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const from = resolve("src/styles.css");
const to = resolve("dist/styles.css");

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);

