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
export declare const isSelectorValid: (str: string) => boolean;
