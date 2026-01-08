
import { getDocument } from "ssr-window";

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
export const removeCSSVar = (el: HTMLElement = getDocument().documentElement, variable: string) => {
  if (!el || typeof (el as any).style !== "object") {
    throw new TypeError("removeCSSVar: el must be an HTMLElement");
  }
  if (typeof variable !== "string" || variable.length === 0) {
    throw new TypeError("removeCSSVar: variable must be a non-empty string");
  }
  el.style.removeProperty(variable.startsWith("--") ? variable : `--${variable}`);
};
