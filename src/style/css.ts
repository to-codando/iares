// css.ts

import { createHash } from "./createHash";
import { createStyleScope } from "./createStyleScope";
import { createStyleElement } from "./createStyleElement";

/**
 * Cache para mapear o CSS bruto para nomes de classes geradas.
 */
const cssCache: Map<string, string> = new Map();

/**
 * Cache para mapear nomes de classes para IDs de componentes.
 */
const classToComponentId: Map<string, string> = new Map();

/**
 * Gera um identificador único para um componente.
 * @returns Identificador único.
 */
const generateComponentId = (): string => {
  return `component-${Math.random().toString(36).substring(2, 8)}`;
};

/**
 * Template tag `css` para processar CSS com suporte a interpolação de variáveis dinâmicas,
 * gerar classes únicas, escopar estilos e injetar CSS de forma otimizada.
 *
 * @param strings Partes estáticas da string.
 * @param interpolations Partes dinâmicas da string.
 * @returns Nome da classe gerada.
 */
export const css = (
  strings: TemplateStringsArray,
  ...interpolations: (string | number)[]
): string => {
  // Concatenar strings e interpolations para formar o CSS completo
  const rawCSS = strings.reduce((accumulator, str, index) => {
    return (
      accumulator +
      str +
      (interpolations[index] !== undefined ? interpolations[index] : "")
    );
  }, "");

  // Verifica se o CSS já foi processado
  const cachedClassName = cssCache.get(rawCSS);
  if (cachedClassName !== undefined) {
    return cachedClassName;
  }

  // Gera um nome de classe único baseado no conteúdo do CSS
  const className = createHash(rawCSS);

  // Associa a classe a um componente
  let componentId: string;
  const existingComponentId = classToComponentId.get(className);
  if (existingComponentId !== undefined) {
    componentId = existingComponentId;
  } else {
    componentId = generateComponentId();
    classToComponentId.set(className, componentId);
  }

  // Escopa o CSS para evitar conflitos de estilos
  const scopedCSS = createStyleScope(className, rawCSS);

  // Obtém ou cria o elemento <style> correspondente ao componente
  const styleElement = createStyleElement(componentId);

  // Verifica se a regra CSS escopada já foi inserida no elemento <style>
  if (!styleElement.innerHTML.includes(scopedCSS)) {
    styleElement.innerHTML += scopedCSS;
  }

  // Armazena o mapeamento no cache para reutilização futura
  cssCache.set(rawCSS, className);

  return className;
};
