declare module "env";

declare module "global-jsdom" {
  import type { ConstructorOptions } from "jsdom";
  function globalJsdom(html?: string, options?: ConstructorOptions): () => void;
  export = globalJsdom;
}

declare namespace NodeJS {
  interface ProcessEnv {}
}
