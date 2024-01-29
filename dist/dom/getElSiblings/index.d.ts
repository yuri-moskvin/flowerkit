/**
 * Gets array of all siblings of given node
 * @param el{Node|Element|HTMLElement} - node
 * @return {Array}
 * @example
 * // How to get all siblings of `li` DOM-element with specific ID?
 * // <ul>
 * //   <li id="item1">One</li>
 * //   <li id="item2">Two</li>
 * //   <li id="item3">Three</li>
 * // <ul>
 * const secondItem = document.getElementById("item2");
 * getElSiblings(secondItem).filter(item => item !== secondItem) // [ li#item1, li#utem3 ]
 */
export function getElSiblings(el: Node | Element | HTMLElement): any[];
//# sourceMappingURL=index.d.ts.map