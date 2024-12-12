export const createScopeStyle = (str: string): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return `css-${(hash >>> 0).toString(36)}`;
};

// Função que processa CSS aplicando escopo
const processCSS = (inputCss: string, className: string): string => {
  let css = inputCss; // Cópia para evitar reatribuição direta de parâmetros
  css = css.replace(/&/g, `.${className}`);

  // Envolve regras soltas dentro de um bloco da classe
  const wrappedCSS = css.replace(/(?:^|\})([^{]+;)/g, (match, decl) => {
    return `.${className} {${decl.trim()}}`;
  });

  return wrappedCSS.replace(/([^{]+\{)/g, (match, selectorBlock) => {
    if (selectorBlock.includes("@")) return match; // Mantém media queries intactas
    const scopedSelector = selectorBlock.includes(className)
      ? selectorBlock
      : `.${className} ${selectorBlock.trim()}`;
    return `${scopedSelector} `;
  });
};

export const transpile = (css: string, className: string): string => {
  const mediaQueryRegex = /(@media[^{]+\{)([\s\S]+?})\s*}/gm;
  const keyframeRegex = /(@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\}\s*)*?\})/gm;

  let processedCSS = css;

  const keyframeMatches: string[] = [];
  let keyframeMatch: RegExpExecArray | null;
  while ((keyframeMatch = keyframeRegex.exec(css)) !== null) {
    if (keyframeMatch) {
      keyframeMatches.push(keyframeMatch[0]);
      processedCSS = processedCSS.replace(keyframeMatch[0], "");
    }
  }

  const matchedQueries: string[] = [];
  let matchArray: RegExpExecArray | null;
  matchArray = mediaQueryRegex.exec(processedCSS);
  while (matchArray !== null) {
    if (matchArray) {
      const mediaQueryContent = processCSS(matchArray[2].trim(), className);
      matchedQueries.push(`${matchArray[1]}\n  ${mediaQueryContent}\n}`);
      processedCSS = processedCSS.replace(matchArray[0], "");
    }
    matchArray = mediaQueryRegex.exec(processedCSS);
  }

  processedCSS = processCSS(processedCSS.trim(), className);

  // Adiciona keyframes sem escopo
  const allCSS =
    `${processedCSS}\n${matchedQueries.join("\n")}\n${keyframeMatches.join("\n")}`.trim();

  return allCSS;
};
