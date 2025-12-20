Object.defineProperty(exports,"__esModule",{value:true});var nodeHtmlParser=require("node-html-parser");
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
 */const getHTMLFromStr=(str="",type="text/html")=>{if(typeof str!=="string"||str.length===0)throw new TypeError("getHTMLFromStr: str must be a non-empty string");const allowed=["application/xhtml+xml","application/xml","image/svg+xml","text/html","text/xml"];if(!allowed.includes(type))throw new TypeError("getHTMLFromStr: type must be a supported DOMParser type");if(typeof DOMParser==="undefined")return nodeHtmlParser.parse(str).querySelectorAll("*");else return(new DOMParser).parseFromString(str,type).body.childNodes};exports.getHTMLFromStr=getHTMLFromStr;
//# sourceMappingURL=index.cjs.map
