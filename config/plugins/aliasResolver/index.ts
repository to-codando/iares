import * as fs from "node:fs";
import * as path from "node:path";
import type { Plugin } from "esbuild";
import { parse } from "jsonc-parser";

function findProjectRoot(): string {
  let currentDir = path.resolve(".");
  while (true) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error("package.json not found");
    }
    currentDir = parentDir;
  }
}

function loadTsconfigAliases(tsconfigPath: string): Record<string, string> {
  const tsconfig = fs.readFileSync(tsconfigPath, "utf8");
  const parsedConfig = parse(tsconfig);
  const paths = parsedConfig.compilerOptions?.paths || {};

  const aliases = Object.keys(paths).reduce(
    (acc, alias) => {
      const targetPath = paths[alias][0].replace("/*", "");
      const aliasKey = alias.replace("/*", "");
      acc[aliasKey] = path.resolve(parsedConfig.compilerOptions.baseUrl, targetPath);
      return acc;
    },
    {} as Record<string, string>,
  );

  return aliases;
}

async function isDirectory(p: string): Promise<boolean> {
  try {
    const stats = await fs.promises.stat(p);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function resolveFileInDirectory(dir: string): Promise<string | null> {
  const extensions = [".ts", ".tsx", ".js", ".jsx"];
  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && extensions.some((ext) => file.name.endsWith(ext))) {
      return path.join(dir, file.name);
    }
    if (file.isDirectory()) {
      const nestedFile = await resolveFileInDirectory(path.join(dir, file.name));
      if (nestedFile) return nestedFile;
    }
  }
  return null;
}

export const AliasResolver: Plugin = {
  name: "alias-resolver",
  setup(build) {
    const projectRoot = findProjectRoot();
    const tsconfigPath = path.join(projectRoot, "tsconfig.json");
    const aliases = loadTsconfigAliases(tsconfigPath);

    build.onResolve({ filter: new RegExp(`^(${Object.keys(aliases).join("|")})(/.*)?$`) }, async (args) => {
      const aliasKey = Object.keys(aliases).find((key) => args.path.startsWith(key));
      if (aliasKey) {
        const relativePath = args.path.slice(aliasKey.length);
        let resolvedPath = path.join(aliases[aliasKey], relativePath);

        if (await isDirectory(resolvedPath)) {
          const filePath = await resolveFileInDirectory(resolvedPath);
          if (filePath) {
            resolvedPath = filePath;
          }
        }

        return { path: resolvedPath };
      }
    });
  },
};
