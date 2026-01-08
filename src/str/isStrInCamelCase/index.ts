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
export const isStrInCamelCase = (str: string): boolean => {
  if (typeof str !== "string") {
    throw new TypeError("isStrInCamelCase: str must be a string");
  }
  // eslint-disable-next-line security/detect-unsafe-regex
  return !!str.length && /^([a-z]+)(([A-Z]([a-z]+))+)$/.test(str);
};
