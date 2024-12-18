/**
 * Gera um hash único baseado no algoritmo DJB2.
 * @param str - O conteúdo a partir do qual o hash será gerado.
 * @returns O hash gerado como uma string.
 */
export const createHash = (text: string, selector: string): string => {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return `${selector}-${(hash >>> 0).toString(36)}`;
};
