// Copies MapLibre's web-worker into /public so the browser can load it directly.
// Bundlers (Turbopack) can't resolve MapLibre's import.meta.url worker, which made
// the campsite map show "The map couldn't load here."
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
mkdirSync(root + "public/maplibre", { recursive: true });
copyFileSync(root + "node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs", root + "public/maplibre/maplibre-gl-worker.mjs");
console.log("maplibre worker copied to public/maplibre/");
