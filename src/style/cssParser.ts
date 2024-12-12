export const createScopeStyle = (str: string): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return `css-${(hash >>> 0).toString(36)}`;
};

// Função que processa CSS aplicando escopo
const processCSS = (inputCss: string, className: string): string => {
  let css = inputCss; // Cria uma cópia para evitar reatribuição direta
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
  const mediaQueryRegex = /(@media[^{]+\{)([\s\S]+?})\s*}/g;
  let processedCSS = css;

  const matchedQueries: string[] = [];
  let matchArray: RegExpExecArray | null;

  matchArray = mediaQueryRegex.exec(css);
  while (matchArray !== null) {
    if (matchArray) {
      const mediaQueryContent = processCSS(matchArray[2].trim(), className);
      matchedQueries.push(`${matchArray[1]}\n  ${mediaQueryContent}\n}`);
      processedCSS = processedCSS.replace(matchArray[0], "");
    }
    matchArray = mediaQueryRegex.exec(css); // Move a próxima chamada do exec aqui
  }

  processedCSS = processCSS(processedCSS.trim(), className);

  return `${processedCSS}\n${matchedQueries.join("\n")}`.trim();
};
