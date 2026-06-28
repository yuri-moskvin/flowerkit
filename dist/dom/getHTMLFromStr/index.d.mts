export type TGetHTMLFromStrArgs = Parameters<typeof getHTMLFromStr>;
export type TGetHTMLFromStrReturn = ReturnType<typeof getHTMLFromStr>;
/**
 * Get parsed HTML from string and return NodeList that includes elements and text
 * @param str{string} - source string
 * @param {DOMParserSupportedType}type - content type:
 *   "application/xhtml+xml", "application/xml", "image/svg+xml",
 *   "text/html" (default), or "text/xml"
 * @returns {Promise<NodeList>} Promise resolving to NodeList, or rejecting with TypeError on invalid arguments.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @example
 * // How to get parsed HTML elements from string?
 * const nodes = await getHTMLFromStr(`
 *   <p>Hello world!</p>
 *   <p>Hello world!</p>
 * `);
 * const elements = Array.from(nodes); // array of two paragraph nodes
 */
export declare const getHTMLFromStr: (str?: string, type?: DOMParserSupportedType) => Promise<NodeList>;
