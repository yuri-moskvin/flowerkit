/**
 * Gets value of CSS variable
 * @param el{HTMLElement|Node|Element|Document} source DOM element
 * @param variable{String} variable name
 * @param isNumberFormat{Boolean=} whether to return a number rather than a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @returns {string|number}
 * @throws {TypeError} getCSSVar: el must be an HTMLElement
 * @throws {TypeError} getCSSVar: variable must be a non-empty string
 * @throws {TypeError} getCSSVar: isNumberFormat must be a boolean
 * @example
 * // How to get CSS3 variable value from an element?
 * const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">
 * getCSSVar(block, "--myVar"); // or just "myVar"
 */
export declare const getCSSVar: (el: HTMLElement, variable: string, isNumberFormat?: boolean | undefined) => string | number;
