/**
 * Gera um hash único baseado no algoritmo DJB2.
 * @param str - O conteúdo a partir do qual o hash será gerado.
 * @returns O hash gerado como uma string.
 */
export const createHash = (str: string): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return `css-${(hash >>> 0).toString(36)}`;
};
