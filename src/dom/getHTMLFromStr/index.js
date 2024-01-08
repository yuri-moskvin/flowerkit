import { parse } from "node-html-parser";
import ow from "ow";


/**
 * Get parsed HTML from string and returns NodeList that include elements and text
 * @param str{String} - source string
 * @param type{DOMParserSupportedType} - content type ("application/xhtml+xml", "application/xml", "image/svg+xml", "text/html" (by default) or "text/xml"
 * @return {NodeList}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @example
 * // How to get parsed HTML elements from string?
 * Array.from(getHTMLFromStr(`
 *   <p>Hello world!</p>
 *   <p>Hello world!</p>
 * `)); // returns array of two paragraph nodes
 */
const getHTMLFromStr = (str = "", type = "text/html") => {

  ow(str, ow.string.not.empty);
  ow(type, ow.string.is(value => [ "application/xhtml+xml", "application/xml", "image/svg+xml", "text/html" ].includes(value)));

  if (typeof DOMParser === "undefined") {
    return parse(str).querySelectorAll("*");
  } else {
    return new DOMParser().parseFromString(str, type).body.childNodes;
  }
};

export {
  getHTMLFromStr
};
