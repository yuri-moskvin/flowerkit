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
export function getHTMLFromStr(str?: string, type?: DOMParserSupportedType): NodeList;
//# sourceMappingURL=index.d.ts.map