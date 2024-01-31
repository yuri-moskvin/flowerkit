/**
 * Removes CSS3 variable from specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} - DOM element
 * @param variable{String} - variable name
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @example
 * // How to remove CSS variable from div?
 * // <div id="myBlock" style="--myVar: 10;"></div>
 * const block = document.getElementById("myBlock");
 * removeCSSVar(block, "myVar");
 * // <div id="myBlock" style=""></div>
 */
export function removeCSSVar(el?: (HTMLElement | Node | Element | Document) | undefined, variable: string): void;
//# sourceMappingURL=index.d.ts.map