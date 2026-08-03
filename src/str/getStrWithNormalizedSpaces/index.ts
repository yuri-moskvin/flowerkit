export type TGetStrWithNormalizedSpacesArgs = Parameters<typeof getStrWithNormalizedSpaces>;

export type TGetStrWithNormalizedSpacesReturn = ReturnType<typeof getStrWithNormalizedSpaces>;

/**
 * Trims a string and replaces consecutive whitespace with a single space.
 * @param {string} str Source string
 * @returns {string} Normalized string
 * @throws {TypeError} getStrWithNormalizedSpaces: str must be a string
 * @example
 * getStrWithNormalizedSpaces("  hello\n world  "); // "hello world"
 * @example
 * // Normalize a search query pasted by a user
 * const query = getStrWithNormalizedSpaces(searchInput.value);
 */
export const getStrWithNormalizedSpaces = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrWithNormalizedSpaces: str must be a string");
  }
  return str.trim().replace(/\s+/gu, " ");
};
