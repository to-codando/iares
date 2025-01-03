import type { TaggedStyle } from "./types";
import { createHash } from "./createHash";
import { transformStyle } from "./cssParser";
import { createStyleElement } from "./createStyleElement";

type HandlerParams = {
  hashId: string;
  scopedStyle: string;
  styleElement: Element;
};
type Handler = (payload: HandlerParams) => void;

const cssCache: Map<string, string> = new Map();

export const css =
  (selector: string, handler: Handler = () => { }): TaggedStyle =>
    (
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
        // Verifica se o elemento style existe no DOM
        const existingStyle = document.head.querySelector(
          `[data-component="${cachedClassName}"]`,
        );

        // Se não existir, recria o elemento style
        if (!existingStyle) {
          const scopedStyle = transformStyle(rawCSS, cachedClassName);
          const styleElement = createStyleElement(cachedClassName);
          styleElement.innerHTML += scopedStyle;
          handler({ hashId: cachedClassName, scopedStyle, styleElement });
        }

        return cachedClassName;
      }

      const hashId = createHash(rawCSS, selector);
      const scopedStyle = transformStyle(rawCSS, hashId);
      const styleElement = createStyleElement(hashId);

      handler({ hashId, scopedStyle, styleElement });

      if (!styleElement.innerHTML.includes(scopedStyle)) {
        styleElement.innerHTML += scopedStyle;
      }

      cssCache.set(rawCSS, hashId);

      return hashId;
    };
