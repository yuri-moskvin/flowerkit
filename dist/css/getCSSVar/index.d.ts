/**
 * Gets value of CSS variable
 * @param el{HTMLElement|Node|Element|Document} - source DOM element
 * @param variable{String} - variable name
 * @param isNumberFormat{Boolean=} - whether to return a number rather than a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @return {string|number}
 * @example
 * // How to get CSS3 variable value from element?
 * const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">
 * getCSSVar(block, "--myVar"); // or just "myVar"
 */
export function getCSSVar(el: HTMLElement | Node | Element | Document, variable: string, isNumberFormat?: boolean | undefined): string | number;
//# sourceMappingURL=index.d.ts.map