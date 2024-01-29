/**
 * Gets a calculated CSS property of an DOM-element
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param prop{String} - CSS property
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @return {string}
 * @example
 * // How to get "height" prop of div from JS?
 * const block = document.querySelector("#myBlock");
 * getCSSValue(block, "height");
 */
export function getCSSValue(el: HTMLElement | Node | Element | Document, prop: string): string;
//# sourceMappingURL=index.d.ts.map