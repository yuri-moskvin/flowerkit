/**
 * Splits a string into words:
 * Splits camelCase boundaries: "helloWorld" -> "hello World"
 * Removes non-letter separators
 *
 * @param {string} str Source string
 * @returns {string[]} Array of words (letters-only segments)
 * @throws {TypeError} If str is not a string
 * @example
 * getWords("helloWorld! what's_up?"); // ["hello","World","what","s","up"]
 */
export declare const getWords: (str: string) => string[];
