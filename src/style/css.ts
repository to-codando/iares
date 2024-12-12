import type { TaggedStyle } from "./types";
import { createHash } from "./createHash";
import { transpile } from "./cssParser";
import { createStyleElement } from "./createStyleElement";

const cssCache: Map<string, string> = new Map();

export const css: TaggedStyle = (
  strings: TemplateStringsArray,
  ...interpolations: (string | number)[]
): string => {
  const rawCSS = strings.reduce(
    (accumulator, str, index) =>
      `${accumulator}${str}${interpolations[index] !== undefined ? interpolations[index] : ""}`,
    "",
  );

  const cachedClassName = cssCache.get(rawCSS);
  if (cachedClassName !== undefined) {
    return cachedClassName;
  }

  const classNameHash = createHash(rawCSS);
  const scopedStyle = transpile(rawCSS, classNameHash);
  const styleElement = createStyleElement(`component-${classNameHash}`);

  if (!styleElement.innerHTML.includes(scopedStyle)) {
    styleElement.innerHTML += scopedStyle;
  }

  cssCache.set(rawCSS, classNameHash);

  return classNameHash;
};
