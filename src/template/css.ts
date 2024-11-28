import { createUUID } from "@/utils";

export const css = (
  strings: TemplateStringsArray,
  ...values: (string | number | (() => string | number))[]
): string => {
  const uniqueId = createUUID();

  const processedValues = values.map((value) =>
    typeof value === "function" ? value().toString() : value.toString(),
  );

  const rawCss = strings
    .map((str, index) => `${str}${processedValues[index] || ""}`)
    .join("");

  const prefixedCss = rawCss.replace(
    /([^{}]+){([^}]*)}/g,
    (match, selectors, content) => {
      if (selectors.trim().startsWith("@")) {
        return match;
      }

      const prefixedSelectors = selectors
        .split(",")
        .map((sel: string) => `.${uniqueId}${sel.trim()}`)
        .join(", ");

      return `${prefixedSelectors} {${content}}`;
    },
  );

  return prefixedCss;
};
