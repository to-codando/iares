import * as fs from "node:fs";
import * as path from "node:path";
import type { BuildResult, Plugin, PluginBuild } from "esbuild";

// Tipo para a configuração de cópia
type Source = {
  origin: string;
  destiny: string;
};

type Sources = {
  sources: Source[];
};

const createDestinationDirectory = (destiny: string) => {
  if (!fs.existsSync(destiny)) {
    fs.mkdirSync(destiny, { recursive: true });
  }
};

const copyFileOrDirectory = ({ origin, destiny }: Source) => {
  createDestinationDirectory(destiny);

  if (fs.lstatSync(origin).isDirectory()) {
    const files = fs.readdirSync(origin);
    for (const file of files) {
      const filePath = path.join(origin, file);
      const destPath = path.join(destiny, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        copyFileOrDirectory({ origin: filePath, destiny: destPath });
      } else {
        fs.copyFileSync(filePath, destPath);
      }
    }
  } else {
    const destPath = path.join(destiny, path.basename(origin));
    fs.copyFileSync(origin, destPath);
  }
};

export const ToCopy = ({ sources }: Sources): Plugin => ({
  name: "to-copy-plugin",
  setup: (build: PluginBuild) => {
    build.onEnd((result: BuildResult) => {
      if (result.errors.length) {
        console.log(result.errors);
        process.exit(1);
      }

      for (const source of sources) {
        copyFileOrDirectory(source);
      }
    });
  },
});
