/**
 * Get parsed HTML from string and returns NodeList that include elements and text
 * @param str{String} source string
 * @param type{DOMParserSupportedType} content type ("application/xhtml+xml", "application/xml", "image/svg+xml", "text/html" (by default) or "text/xml"
 * @returns {NodeList}
 * @throws {TypeError} getHTMLFromStr: str must be a non-empty string
 * @throws {TypeError} getHTMLFromStr: type must be a supported DOMParser type
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @example
 * // How to get parsed HTML elements from string?
 * Array.from(getHTMLFromStr(`
 *   <p>Hello world!</p>
 *   <p>Hello world!</p>
 * `)); // returns array of two paragraph nodes
 */
export declare const getHTMLFromStr: (str?: string, type?: DOMParserSupportedType) => NodeList;
