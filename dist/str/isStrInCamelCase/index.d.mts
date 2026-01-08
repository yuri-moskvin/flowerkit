export type TIsStrInCamelCaseArgs = Parameters<typeof isStrInCamelCase>;
export type TIsStrInCamelCaseReturn = ReturnType<typeof isStrInCamelCase>;
/**
 * Checks if a string is in camelCase.
 * Rules:
 * Starts with lowercase letters
 * Contains one or more capitalized segments (e.g., "abcDef")
 *
 * @param {string} str Source string
 * @returns {boolean} True if string is camelCase
 * @throws {TypeError} If str is not a string
 * @example
 * isStrInCamelCase("abcDef"); // true
 * isStrInCamelCase("Word"); // false
 */
export declare const isStrInCamelCase: (str: string) => boolean;
