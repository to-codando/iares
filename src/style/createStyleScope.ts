const splitIntoRules = (css: string): string[] => {
  return css
    .split("}")
    .map((rule) => rule.trim())
    .filter((rule) => rule.length > 0);
};

const parseRule = (rule: string): [string[], string] | null => {
  const parts = rule.split("{").map((part) => part.trim());

  if (parts.length !== 2) {
    console.warn(`Regra CSS inválida omitida: "${rule}"`);
    return null; // Retorna null para indicar uma regra inválida
  }

  const [selectorPart, declarationPart] = parts;

  if (!selectorPart || !declarationPart) {
    console.warn(`Regra CSS incompleta omitida: "${rule}"`);
    return null;
  }

  const selectors = selectorPart.split(",").map((selector) => selector.trim());
  const declarations = declarationPart.trim();

  return [selectors, declarations];
};

const prefixSelector = (selector: string, className: string): string => {
  if (selector.startsWith("&")) {
    return selector.replace("&", `.${className}`);
  }
  return `.${className}${selector}`;
};

const scopeRule = (rule: string, className: string): string => {
  const parsedRule = parseRule(rule);
  if (!parsedRule) {
    return "";
  }

  const [selectors, declarations] = parsedRule;
  const scopedSelectors = selectors.map((selector) =>
    // Substituir diretamente o seletor original pelo da classe única
    selector.startsWith(".")
      ? `.${className}`
      : prefixSelector(selector, className),
  );

  return `${scopedSelectors.join(", ")} { ${declarations} }\n`;
};

export const createStyleScope = (className: string, css: string): string => {
  return splitIntoRules(css)
    .map((rule) => scopeRule(rule, className))
    .filter((scopedRule) => scopedRule.length > 0)
    .join(""); // Certifique-se de que cada regra final está corretamente formatada
};
