/**
 * Splits a string into Unicode-aware words for case conversion.
 * @param {string} str Source string
 * @returns {string[]} Words
 * @internal
 */
export const _getCaseWords = (str: string): string[] => {
  return str
    .trim()
    .replace(/([\p{Ll}\d])(\p{Lu})/gu, "$1 $2")
    .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, "$1 $2")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
};
