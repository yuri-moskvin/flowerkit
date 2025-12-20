Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Checks whether the specified object is a DOM element
 * @param el{any} source object
 * @returns {boolean}
 * @example
 * // How to check if an object is dom node?
 * const isMyElNode = isNode(document.getElementById("test"));
 * console.log(isMyElNode) // => boolean
 */const isNode=el=>{if(typeof Element==="undefined"||typeof Document==="undefined")return typeof el==="object"&&el.nodeType===1&&typeof el.style==="object"&&typeof el.ownerDocument==="object";else return el instanceof Element||el instanceof Document};exports.isNode=isNode;
//# sourceMappingURL=index.cjs.map
