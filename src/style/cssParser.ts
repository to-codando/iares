export const createScopeStyle = (str: string): string => {
  const hashResult = [...str].reduce(
    (hash, char) => (hash * 33) ^ char.charCodeAt(0),
    5381,
  );
  return `css-${(hashResult >>> 0).toString(36)}`;
};

// Função que processa CSS aplicando escopo
const processCSS = (css: string, className: string): string => {
  const substituteScope = (inputCss: string): string =>
    inputCss.replace(/&/g, `.${className}`);

  const wrapLooseRules = (scopedCss: string): string =>
    scopedCss.replace(
      /(?:^|\})([^{]+;)/g,
      (_, decl) => `.${className} {${decl.trim()}}`,
    );

  const scopeSelectors = (wrappedCss: string): string =>
    wrappedCss.replace(/([^{]+\{)/g, (match, selectorBlock) => {
      if (selectorBlock.includes("@")) return match; // Manter media queries intactas
      const scopedSelector = selectorBlock.includes(className)
        ? selectorBlock
        : `.${className} ${selectorBlock.trim()}`;
      return `${scopedSelector} `;
    });

  return scopeSelectors(wrapLooseRules(substituteScope(css)));
};

export const transpile = (css: string, className: string): string => {
  const mediaQueryRegex = /(@media[^{]+\{)([\s\S]+?})\s*}/g;
  const keyframeRegex = /(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/g;

  const extractKeyframes = (inputCss: string): [string, string[]] => {
    const keyframes: string[] = [];
    const newCss = inputCss.replace(keyframeRegex, (match) => {
      keyframes.push(match);
      return "";
    });
    return [newCss, keyframes];
  };

  const [cssWithoutKeyframes, keyframes] = extractKeyframes(css);

  const processMediaQueries = (inputCss: string): [string, string[]] => {
    const queries: string[] = [];
    const remainingCss = inputCss.replace(mediaQueryRegex, (_, p1, p2) => {
      const scopedContent = processCSS(p2.trim(), className);
      queries.push(`${p1}\n  ${scopedContent}\n}`);
      return "";
    });
    return [remainingCss, queries];
  };

  const [cssWithoutMediaQueries, mediaQueries] =
    processMediaQueries(cssWithoutKeyframes);

  const processedCss = processCSS(cssWithoutMediaQueries.trim(), className);

  const finalCss = [processedCss, ...mediaQueries, ...keyframes]
    .filter(Boolean)
    .join("\n");

  return finalCss;
};
