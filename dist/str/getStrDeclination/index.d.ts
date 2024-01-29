/**
 * Gets the declension of a word depending on the number. Useful for Cyrillic words
 * @param num{Number} - source number
 * @param words{Array=} - array of three words with declension of one, two and few or zero
 * @return {string}
 * @example
 * // How to get right declension of Cyrillic word?
 * const words = [ "товар", "товара", "товаров" ]; // one, two, few or zero
 * getWordDeclination(2, words); // "товара"
 *
 */
export function getStrDeclination(num: number, words?: any[] | undefined): string;
//# sourceMappingURL=index.d.ts.map