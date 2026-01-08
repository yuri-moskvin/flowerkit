export type TRemoveChildNodesArgs = Parameters<typeof removeChildNodes>;

export type TRemoveChildNodesReturn = ReturnType<typeof removeChildNodes>;

/**
 * Removes all child nodes of given node
 * @param el{Node} node
 * @throws {TypeError} removeChildNodes: el must be a Node
 * @example
 * // How to remove all child elements of a DOM node?
 * // <div id="myBlock"><div>Block with child nodes</div></div>
 * const myDiv = document.getElementById("myBlock");
 * removeChildNodes(myDiv);
 * console.log(Array.from(myDiv.children).length); // => 0
 */
export const removeChildNodes = (el: Node): void => {
  if (!el || typeof (el as any).nodeType !== "number") {
    throw new TypeError("removeChildNodes: el must be a Node");
  }
  while ((el as any).firstChild) {
    (el as any).removeChild((el as any).lastChild as ChildNode);
  }
};
