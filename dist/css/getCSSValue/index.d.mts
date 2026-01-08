export type TGetCSSValueArgs = Parameters<typeof getCSSValue>;
export type TGetCSSValueReturn = ReturnType<typeof getCSSValue>;
/**
 * Gets a calculated CSS property of an DOM-element
 * @param el{HTMLElement} DOM element
 * @param prop{String} CSS property
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @returns {string}
 * @throws {TypeError} getCSSValue: el must be an HTMLElement
 * @throws {TypeError} getCSSValue: prop must be a string
 * @example
 * // How to get "height" prop of div from JS?
 * const block = document.querySelector("#myBlock");
 * getCSSValue(block, "height");
 */
export declare const getCSSValue: (el: HTMLElement, prop: string) => string;
