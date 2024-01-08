/**
 * Checks whether the specified object is a DOM element
 * @param el{*} - source object
 * @return {boolean}
 * @example
 * // How to check if object is dom node?
 * const isMyElNode = isNode(document.getElementById("test"));
 * console.log(isMyElNode) // => boolean
 */
const isNode=el=>el instanceof Element||el instanceof HTMLDocument;export{isNode};
//# sourceMappingURL=index.js.map
