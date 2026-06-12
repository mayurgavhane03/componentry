import { cp, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const srcStyles = resolve(root, "src", "styles");
const distStyles = resolve(root, "dist", "styles");

async function copyCss() {
  try {
    await access(srcStyles);
  } catch {
    console.log("No src/styles directory found. Skipping CSS copy.");
    return;
  }

  await mkdir(distStyles, { recursive: true });
  await cp(srcStyles, distStyles, { recursive: true, force: true });

  console.log("CSS files copied to dist/styles");
}

copyCss().catch((err) => {
  console.error("Failed to copy CSS files:", err);
  process.exit(1);
});