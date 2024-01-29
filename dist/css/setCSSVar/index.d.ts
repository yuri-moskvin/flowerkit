/**
 * Sets CSS3 variable to specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} - DOM element
 * @param variable{String} - variable name
 * @param value{String|Number|Boolean=} - variable value
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @example
 * // How to set CSS variable to div?
 * // <div id="myBlock"></div>
 * const block = document.getElementById("myBlock");
 * setCSSVar(block, "myVar", 10);
 * // <div id="myBlock" style="--myVar: 10"></div>
 */
export function setCSSVar(el?: (HTMLElement | Node | Element | Document) | undefined, variable: string, value?: (string | number | boolean) | undefined): void;
//# sourceMappingURL=index.d.ts.map