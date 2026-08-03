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
export declare const getStrTruncated: (str: string, maxLength: number, suffix?: string) => string;
