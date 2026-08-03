export type TGetStrTruncatedArgs = Parameters<typeof getStrTruncated>;

export type TGetStrTruncatedReturn = ReturnType<typeof getStrTruncated>;

/**
 * Truncates a string to a maximum number of Unicode code points.
 * The suffix is included in the maximum length.
 * @param {string} str Source string
 * @param {number} maxLength Maximum result length
 * @param {string} [suffix="…"] Suffix for truncated strings
 * @returns {string} Truncated string
 * @throws {TypeError} getStrTruncated: str must be a string
 * @throws {TypeError} getStrTruncated: maxLength must be a non-negative integer
 * @throws {TypeError} getStrTruncated: suffix must be a string
 * @example
 * getStrTruncated("Hello world", 8); // "Hello w…"
 * @example
 * // Limit a product title to fit inside a compact card
 * const cardTitle = getStrTruncated(product.title, 48, "...");
 */
export const getStrTruncated = (str: string, maxLength: number, suffix: string = "…"): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrTruncated: str must be a string");
  }
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new TypeError("getStrTruncated: maxLength must be a non-negative integer");
  }
  if (typeof suffix !== "string") {
    throw new TypeError("getStrTruncated: suffix must be a string");
  }

  const chars = Array.from(str);
  if (chars.length <= maxLength) {
    return str;
  }
  const suffixChars = Array.from(suffix);
  if (suffixChars.length >= maxLength) {
    return suffixChars.slice(0, maxLength).join("");
  }
  return chars.slice(0, maxLength - suffixChars.length).join("") + suffix;
};
