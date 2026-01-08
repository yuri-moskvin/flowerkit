import { getDocument } from "ssr-window";

export type TIsSelectorValidArgs = Parameters<typeof isSelectorValid>;

export type TIsSelectorValidReturn = ReturnType<typeof isSelectorValid>;

/**
 * Checks if string is valid CSS selector
 * @param str{String} source selector
 * @returns {boolean}
 * @throws {TypeError} isSelectorValid: str must be a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
 * @example
 * // How to check if the CSS selector is valid?
 * const selector = "#myElement";
 * const isValid = isSelectorValid(selector);
 * console.log(isValid); // => true
 */
export const isSelectorValid = (str: string): boolean => {
  if (typeof str !== "string") {
    throw new TypeError("isSelectorValid: str must be a string");
  }
  try {
    getDocument().createDocumentFragment().querySelector(str);
  } catch {
    return false;
  }
  return true;
};
