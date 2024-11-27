import http, { type IncomingMessage, type ServerResponse } from "node:http";
import { join } from "node:path";
import type { BuildResult, Plugin, PluginBuild } from "esbuild";

export type BuildHandlerParams = {
  buildVersion: number;
  build: PluginBuild;
};
export type BuildHandler = (params: BuildHandlerParams) => void;

export const onRebuild = (buildHandler?: BuildHandler): Plugin => ({
  name: "onRebuild",
  setup(build) {
    let buildVersion = 0;

    build.onStart(() => {
      buildVersion++;
    });

    build.onEnd((result: BuildResult) => {
      if (!result.errors.length) {
        return buildHandler?.({ buildVersion, build });
      }

      console.error("Build error:", result.errors);
    });
  },
});
