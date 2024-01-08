import ow from "ow";
import { isNode } from "../isNode/index.js";

/**
 * Removes all child nodes of given node
 * @param el{Node|Element|HTMLElement|Document} - node
 * @example
 * // How to remove all child elements of a DOM node?
 * // <div id="myBlock"><div>Block with child nodes</div></div>
 * const myDiv = document.getElementById("myBlock");
 * removeChildNodes(myDiv);
 * console.log(Array.from(myDiv.children).length); // => 0
 */
const removeChildNodes = (el) => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: `The object must be node`
  })));

  while (el.firstChild) {
    el.removeChild(el.lastChild);
  }
};

export {
  removeChildNodes
};
