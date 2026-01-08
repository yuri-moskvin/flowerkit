import { getDocument } from "ssr-window";

export type TSetCSSVarArgs = Parameters<typeof setCSSVar>;

export type TSetCSSVarReturn = ReturnType<typeof setCSSVar>;

/**
 * Sets CSS3 variable to specific DOM node
 * @param el{HTMLElement=} DOM element
 * @param variable{String} variable name
 * @param value{String|Number|Boolean=} variable value
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @returns {void}
 * @throws {TypeError} setCSSVar: el must be an HTMLElement
 * @throws {TypeError} setCSSVar: variable must be a non-empty string
 * @throws {TypeError} setCSSVar: value must be a string|number|boolean
 * @example
 * // How to set CSS variable to div?
 * // <div id="myBlock"></div>
 * const block = document.getElementById("myBlock");
 * setCSSVar(block, "myVar", 10);
 * // <div id="myBlock" style="--myVar: 10"></div>
 */
export const setCSSVar = (el: HTMLElement = getDocument().documentElement, variable: string, value: string | number | boolean = ""): void => {
  if (!el || typeof (el as any).style !== "object") {
    throw new TypeError("setCSSVar: el must be an HTMLElement");
  }
  if (typeof variable !== "string" || variable.length === 0) {
    throw new TypeError("setCSSVar: variable must be a non-empty string");
  }
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    throw new TypeError("setCSSVar: value must be a string|number|boolean");
  }
  el.style.setProperty(variable.startsWith("--") ? variable : `--${variable}`, value + "");
};
