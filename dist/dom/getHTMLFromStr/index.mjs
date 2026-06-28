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
const getHTMLFromStr=async(str="",type="text/html")=>{if(typeof str!=="string"||str.length===0)throw new TypeError("getHTMLFromStr: str must be a non-empty string");const allowed=["application/xhtml+xml","application/xml","image/svg+xml","text/html","text/xml"];if(!allowed.includes(type))throw new TypeError("getHTMLFromStr: type must be a supported DOMParser type");if(typeof DOMParser==="undefined"){const{parse:parse}=await import("node-html-parser");return parse(str).querySelectorAll("*")}return(new DOMParser).parseFromString(str,type).body.childNodes};export{getHTMLFromStr};
//# sourceMappingURL=index.mjs.map
