import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { cp, mkdir, rm, readFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  // Build AI4U first (outputs to client/public/ai4u-embed)
  console.log("building AI4U embed...");
  try {
    await execAsync("npm install && npx vite build --config ai4u-vite.config.ts", {
      cwd: "apps/ai4u-source",
    });
    console.log("AI4U embed built successfully");
  } catch (error) {
    console.warn("AI4U build skipped (source not found or build failed):", error);
  }

  // Build Record Store demo (outputs to client/public/recordstoredemo)
  console.log("building Record Store demo...");
  try {
    await execAsync("npm install && npm run build", {
      cwd: "apps/Vinyl-Vault-Backend",
    });
    const recordStoreSource = path.resolve(
      "apps/Vinyl-Vault-Backend",
      "dist",
      "public",
    );
    const recordStoreDest = path.resolve(
      "client",
      "public",
      "recordstoredemo",
    );
    await rm(recordStoreDest, { recursive: true, force: true });
    await mkdir(recordStoreDest, { recursive: true });
    await cp(recordStoreSource, recordStoreDest, { recursive: true });
    console.log("Record Store demo built successfully");
  } catch (error) {
    console.warn(
      "Record Store demo build skipped (source not found or build failed):",
      error,
    );
  }

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
