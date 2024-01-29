/**
 * Removes all child nodes of given node
 * @param el{Node|Element|HTMLElement|Document} - node
 * @example
 * // How to remove all child elements of a DOM node?
 * // <div id="myBlock"><div>Block with child nodes</div></div>
 * const myDiv = document.getElementById("myBlock");
 * removeChildNodes(myDiv);
 * console.log(Array.from(myDiv.children).length); // => 0
 */
export function removeChildNodes(el: Node | Element | HTMLElement | Document): void;
//# sourceMappingURL=index.d.ts.map