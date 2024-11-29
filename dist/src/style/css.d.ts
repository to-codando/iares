/**
 * Template tag `css` para processar CSS com suporte a interpolação de variáveis dinâmicas,
 * gerar classes únicas, escopar estilos e injetar CSS de forma otimizada.
 *
 * @param strings Partes estáticas da string.
 * @param interpolations Partes dinâmicas da string.
 * @returns Nome da classe gerada.
 */
export declare const css: (strings: TemplateStringsArray, ...interpolations: (string | number)[]) => string;
export type TaggedStyles = typeof css;
//# sourceMappingURL=css.d.ts.map