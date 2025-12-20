/**
 * Checks if a string is in snake_case.
 * Rules:
 * Lowercase letters separated by single underscores
 * No leading or trailing underscore
 *
 * @param {string} str Source string
 * @returns {boolean} True if string is snake_case
 * @throws {TypeError} If str is not a string
 * @example
 * isStrInSnakeCase("good_snake"); // true
 */
export declare const isStrInSnakeCase: (str: string) => boolean;
