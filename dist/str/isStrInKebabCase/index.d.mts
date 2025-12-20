/**
 * Checks if a string is in kebab-case.
 * Rules:
 * Lowercase letters separated by single hyphens
 * No leading or trailing hyphen
 *
 * @param {string} str Source string
 * @returns {boolean} True if string is kebab-case
 * @throws {TypeError} If str is not a string
 * @example
 * isStrInKebabCase("good-kebab"); // true
 */
export declare const isStrInKebabCase: (str: string) => boolean;
