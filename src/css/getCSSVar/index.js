import ow from "ow";
import { isNode } from "../../dom/isNode/index.js";
import { getCSSValue } from "../getCSSValue/index.js";

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
const getCSSVar = (el, variable, isNumberFormat = false) => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: `The object must be node`
  })));
  ow(variable, ow.string.not.empty);
  ow(isNumberFormat, ow.optional.boolean);

  const prefix = "--";
  const prop = variable.startsWith(prefix) ? variable : prefix + variable;
  const value = getCSSValue(el, prop);
  return isNumberFormat ? parseFloat(value) : value;
};

export {
  getCSSVar
};
