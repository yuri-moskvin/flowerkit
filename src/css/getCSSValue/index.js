import ow from "ow";
import { getWindow } from "ssr-window";
import { isNode } from "../../dom/isNode/index.js";

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
const getCSSValue = (el, prop) => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: () => `The object must be node`
  })));

  ow(prop, ow.string.not.empty);

  switch (prop) {
    case "width":
      return `${el.offsetWidth}px`;
    case "height":
      return `${el.offsetHeight}px`;
    default:
      return getWindow().getComputedStyle(el).getPropertyValue(prop);
  }
};

export {
  getCSSValue
};
