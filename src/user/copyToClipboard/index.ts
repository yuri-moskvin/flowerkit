import { getDocument, getWindow } from "ssr-window";

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
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof text !== "string") {
    throw new TypeError("copyToClipboard: text must be a string");
  }
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const clipboard = getWindow().navigator?.clipboard;
    if (clipboard?.writeText) {
      await clipboard.writeText(text);
      return true;
    }

    const document = getDocument();
    if (!document.body || typeof document.execCommand !== "function") {
      return false;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    try {
      textarea.select();
      return document.execCommand("copy");
    } finally {
      textarea.remove();
    }
  } catch {
    return false;
  }
};
