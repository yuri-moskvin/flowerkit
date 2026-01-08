export type TRemoveCSSVarArgs = Parameters<typeof removeCSSVar>;
export type TRemoveCSSVarReturn = ReturnType<typeof removeCSSVar>;
/**
 * Removes CSS3 variable from specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} DOM element
 * @param variable{String} variable name
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @throws {TypeError} removeCSSVar: el must be an HTMLElement
 * @throws {TypeError} removeCSSVar: variable must be a non-empty string
 * @example
 * // How to remove CSS variable from div?
 * // <div id="myBlock" style="--myVar: 10;"></div>
 * const block = document.getElementById("myBlock");
 * removeCSSVar(block, "myVar");
 * // <div id="myBlock" style=""></div>
 */
export declare const removeCSSVar: (el: HTMLElement | undefined, variable: string) => void;
