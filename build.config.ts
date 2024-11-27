//import "dotenv/config";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type BuildOptions, build, context } from "esbuild";
import Bun from "bun";

import {
  ToCopy,
  AliasResolver,
  onRebuild,
  resolveEnvironment,
  type BuildHandlerParams,
} from "./config/plugins";

import { getFiles } from "./config/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProductionMode = true; //process.env.ENVIRONMENT === "production";
const SOURCES = await getFiles(["./src/**/*.{js,jsx,ts,tsx,mdx}"]);

const config: BuildOptions = {
  bundle: true,
  write: true,
  keepNames: true,
  define: {},
  entryPoints: [...SOURCES],
  outdir: "./dist/src",
  tsconfig: "./tsconfig.json",
  supported: { "dynamic-import": true },
  platform: "browser",
  format: "esm",
  external: [
    "http",
    "canvas",
    "global-jsdom",
    "global-jsdom/register",
    "bun:test",
  ],
  treeShaking: isProductionMode,
  sourcemap: isProductionMode ? true : "both",
  minify: isProductionMode,
  target: isProductionMode ? ["ES2022"] : ["ESNEXT"],
  plugins: [
    AliasResolver,
    resolveEnvironment({
      environment: process.env.NODE_ENV,
    }),
    onRebuild((buildParams: BuildHandlerParams) => {
      const { buildVersion } = buildParams;

      if (!isProductionMode) {
        const buildMessage = `Build: ${buildVersion}`;
        console.log(buildMessage);
        return;
      }

      console.log("-----------------");
      console.log("[ 😎 Build done! ]");
      console.log("-----------------");
      console.log("");
    }),
  ],
  loader: {
    ".js": "js",
    ".jsx": "jsx",
    ".ts": "ts",
    ".tsx": "tsx",
    ".png": "dataurl",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "text",
  },
};

try {
  build(config);
} catch (error) {
  console.log(error);
  process.exit(1);
}
