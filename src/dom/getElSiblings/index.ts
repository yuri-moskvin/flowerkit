/**
 * Gets an array of all siblings of given node
 * @param el{Node|Element|HTMLElement} node
 * @returns {Array}
 * @throws {TypeError} getElSiblings: el must be an HTMLElement
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
const getElSiblings = (el: HTMLElement): Array<ChildNode> => {
  if (!el || typeof (el as any).nodeType !== "number") {
    throw new TypeError("getElSiblings: el must be an HTMLElement");
  }

  const siblings = [];
  let sibling = el?.parentNode?.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = (sibling as any).nextSibling;
  }
  return siblings;
};
export default getElSiblings;
