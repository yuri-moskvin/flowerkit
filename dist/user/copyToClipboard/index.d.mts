export type TCopyToClipboardArgs = Parameters<typeof copyToClipboard>;
export type TCopyToClipboardReturn = ReturnType<typeof copyToClipboard>;
/**
 * Copies text to the clipboard using the Clipboard API with a legacy fallback.
 * Returns `false` when clipboard access is unavailable or denied.
 * @param {string} text Text to copy
 * @returns {Promise<boolean>} Whether copying succeeded
 * @throws {TypeError} copyToClipboard: text must be a string
 * @example
 * await copyToClipboard("https://example.com");
 * @example
 * // Copy a share URL and show feedback only when it succeeds
 * const copied = await copyToClipboard(window.location.href);
 * if (copied) showToast("Link copied");
 */
export declare const copyToClipboard: (text: string) => Promise<boolean>;
