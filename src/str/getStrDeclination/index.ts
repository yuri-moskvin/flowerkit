export type TGetStrDeclinationArgs = Parameters<typeof getStrDeclination>;

export type TGetStrDeclinationReturn = ReturnType<typeof getStrDeclination>;

/**
 * Returns the correct word form (declension) depending on the number.
 * Commonly used for Cyrillic languages (one, few, many).
 *
 * @param {number} num Source number (can be negative)
 * @param {[string,string,string]} words Exactly three declensions: [one, few, many]
 * @returns {string} Selected declension
 * @throws {TypeError} If arguments are invalid
 * @example
 * const words: [ string, string, string ] = [ "товар", "товара", "товаров" ];
 * getStrDeclination(1, words); // "товар"
 * getStrDeclination(2, words); // "товара"
 * getStrDeclination(5, words); // "товаров"
 */
export const getStrDeclination = (num: number, words: readonly [string, string, string]): string => {
  if (!Number.isFinite(num)) {
    throw new TypeError("getStrDeclination: num must be a finite number");
  }
  if (!Array.isArray(words) || words.length !== 3 || words.some((w) => typeof w !== "string")) {
    throw new TypeError("getStrDeclination: words must be a tuple of three strings [one, few, many]");
  }

  const n = Math.abs(num);
  const mod100 = n % 100;
  if (mod100 > 4 && mod100 < 20) {
    return words[2];
  }

  const mod10 = n % 10;
  const index = (mod10 < 5) ? [ 2, 0, 1, 1, 1 ][mod10] : 2;
  return words[index];
};
