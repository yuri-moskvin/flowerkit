export type TIsStrUrlArgs = Parameters<typeof isStrUrl>;
export type TIsStrUrlReturn = ReturnType<typeof isStrUrl>;
/**
 * Heuristically checks if a string looks like a URL or URL pathname. This is a permissive regex-based check and not a full URL validator.
 *
 * @param {string} str Source string
 * @returns {boolean} True if string looks like a URL/pathname
 * @throws {TypeError} isStrUrl: str must be a string
 * @example
 * isStrUrl("www.example.com"); // true
 * isStrUrl("file.php"); // true
 * @example
 * // Detect whether pasted text should be rendered as a link
 * const shouldLinkify = isStrUrl(clipboardText.trim());
 */
export declare const isStrUrl: (str: string) => boolean;
