import ow from "ow";
import { getDocument } from "ssr-window";
import { isNode } from "../../dom/index.js";

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
const setCSSVar = (el = getDocument().documentElement, variable, value = "") => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: () => `The object must be node`
  })));
  ow(variable, ow.string.not.empty);
  ow(value, ow.any(ow.string, ow.number, ow.boolean));

  el.style.setProperty(variable.startsWith("--") ? variable : `--${variable}`, value + "");
};

export {
  setCSSVar
};
