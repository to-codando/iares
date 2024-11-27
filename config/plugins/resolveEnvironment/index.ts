import type { PluginBuild } from "esbuild";

export const resolveEnvironment = ({ environment }) => {
  return {
    name: "env",
    setup(build: PluginBuild) {
      build.onResolve({ filter: /^env$/ }, () => ({
        path: "env",
        namespace: "env-ns",
      }));

      build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({
        contents: JSON.stringify({ environment }),
        loader: "json",
      }));
    },
  };
};
