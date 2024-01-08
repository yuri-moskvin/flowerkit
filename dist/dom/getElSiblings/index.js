import ow from"ow";import{isNode}from"../isNode/index.js";
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
 */const getElSiblings=el=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:`The object must be node`}))));const siblings=[];let sibling=el?.parentNode?.firstChild;while(sibling){if(sibling.nodeType===1&&sibling!==el)siblings.push(sibling);sibling=sibling.nextSibling}return siblings};export{getElSiblings};
//# sourceMappingURL=index.js.map
