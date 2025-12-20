Object.defineProperty(exports,"__esModule",{value:true});
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
 */const getElSiblings=el=>{if(!el||typeof el.nodeType!=="number")throw new TypeError("getElSiblings: el must be an HTMLElement");const siblings=[];let sibling=el?.parentNode?.firstChild;while(sibling){if(sibling.nodeType===1&&sibling!==el)siblings.push(sibling);sibling=sibling.nextSibling}return siblings};exports.default=getElSiblings;
//# sourceMappingURL=index.cjs.map
