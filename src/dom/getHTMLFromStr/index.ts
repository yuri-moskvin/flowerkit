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
 * @example
 * // Parse an SVG string into DOM nodes on the browser or server
 * const iconNodes = await getHTMLFromStr(
 *   `<svg viewBox="0 0 24 24"><path d="M4 12h16" /></svg>`,
 *   "image/svg+xml"
 * );
 */
export const getHTMLFromStr = async (
  str: string = "",
  type: DOMParserSupportedType = "text/html"
): Promise<NodeList> => {

  if (typeof str !== "string" || str.length === 0) {
    throw new TypeError("getHTMLFromStr: str must be a non-empty string");
  }

  const allowed: DOMParserSupportedType[] = [
    "application/xhtml+xml",
    "application/xml",
    "image/svg+xml",
    "text/html",
    "text/xml",
  ];

  if (!allowed.includes(type)) {
    throw new TypeError("getHTMLFromStr: type must be a supported DOMParser type");
  }

  if (typeof DOMParser === "undefined") {
    const { parse } = await import("node-html-parser");
    return parse(str).childNodes as unknown as NodeList;
  }

  const parsed = new DOMParser().parseFromString(str, type);
  return type === "text/html" ? parsed.body.childNodes : parsed.childNodes;
};
