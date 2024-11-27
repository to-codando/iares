import { escapeTemplateString, bindStyleScope } from "@/utils";

export const css = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  const scoped = !![...values].shift();
  const scopeId = Math.random().toString(36).slice(2, 6);

  const styles = strings
    .map((string, index) => {
      const value = values[index] || {};
      return `${string} ${value}`;
    })
    .join("");

  return escapeTemplateString(
    scoped ? bindStyleScope(scopeId, styles) : styles,
  );
};
