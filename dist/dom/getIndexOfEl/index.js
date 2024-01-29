import ow from"ow";import{isNode}from"../isNode/index.js";
/**
 * Gets index of Node from relatively its siblings
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @return {number}
 * @example
 * // How to get index of specific `li` element?
 * // <ul>
 * //   <li>0<li>
 * //   <li id="myElement">1</li>
 * //   <li>2</li>
 * // </ul>
 * const index = document.querySelector("li#myElement");
 * console.log(index); // => 1
 */const getIndexOfEl=el=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:()=>`The object must be node`}))));if(el.parentNode)return[...el.parentNode.children].indexOf(el);else return 0};export{getIndexOfEl};
//# sourceMappingURL=index.js.map
