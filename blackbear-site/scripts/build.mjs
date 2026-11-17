import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const project = fileURLToPath(new URL("../", import.meta.url));
const env = { ...process.env };
if (process.platform === "win32") {
  const compatibility = resolve(
    project,
    "scripts/windows-build-compat.cjs",
  ).replaceAll("\\", "/");
  env.NODE_OPTIONS =
    `${env.NODE_OPTIONS || ""} --require "${compatibility}"`.trim();
}
const result = spawnSync(
  process.execPath,
  [resolve(project, "node_modules/next/dist/bin/next"), "build"],
  { cwd: project, env, stdio: "inherit" },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
