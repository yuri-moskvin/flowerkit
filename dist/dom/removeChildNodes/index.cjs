Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Removes all child nodes of given node
 * @param el{Node|Element|HTMLElement|Document} node
 * @throws {TypeError} removeChildNodes: el must be a Node
 * @example
 * // How to remove all child elements of a DOM node?
 * // <div id="myBlock"><div>Block with child nodes</div></div>
 * const myDiv = document.getElementById("myBlock");
 * removeChildNodes(myDiv);
 * console.log(Array.from(myDiv.children).length); // => 0
 */const removeChildNodes=el=>{if(!el||typeof el.nodeType!=="number")throw new TypeError("removeChildNodes: el must be a Node");while(el.firstChild)el.removeChild(el.lastChild)};exports.removeChildNodes=removeChildNodes;
//# sourceMappingURL=index.cjs.map
