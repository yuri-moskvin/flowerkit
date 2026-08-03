export type TGetStrDeclinationArgs = Parameters<typeof getStrDeclination>;
export type TGetStrDeclinationReturn = ReturnType<typeof getStrDeclination>;
/**
 * Returns the correct word form (declension) depending on the number.
 * Commonly used for Cyrillic languages (one, few, many).
 *
 * @param {number} num Source integer (can be negative)
 * @param {[string,string,string]} words Exactly three declensions: [one, few, many]
 * @returns {string} Selected declension
 * @throws {TypeError} If arguments are invalid
 * @example
 * const words: [ string, string, string ] = [ "товар", "товара", "товаров" ];
 * getStrDeclination(1, words); // "товар"
 * getStrDeclination(2, words); // "товара"
 * getStrDeclination(5, words); // "товаров"
 * @example
 * // Build a localized cart item counter
 * const itemLabel = `${count} ${getStrDeclination(count, [ "товар", "товара", "товаров" ])}`;
 */
export declare const getStrDeclination: (num: number, words: readonly [string, string, string]) => string;
