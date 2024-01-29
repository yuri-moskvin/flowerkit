import ow from"ow";import{getDocument}from"ssr-window";import{isNode}from"../isNode/index.js";
/**
 * Gets a wrapper for specific element
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @param str{String} - string of wrapper HTML layout (supports nested blocks)
 * @return {ChildNode}
 * @example
 * // How to wrap content to the few nested `div` blocks?
 * // <div id="block">My Element</div>
 * const wrapperLayout = `
 *  <div class="wrapper">
 *    <div class="wrapper__inner"></div>
 *  </div>
 * `;
 * const el = document.getElementById("block");
 * const wrapped = getElWrapper(el, wrapperLayout);
 * console.log(wrapped.outerHTML); // => `<div class="wrapper"><div class="wrapper__inner"><div id="block">My Element</div></div></div>`
 */const getElWrapper=(el,str)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:()=>`The object must be node`}))));ow(str,ow.string.not.empty);const temp=getDocument().createElement("div");const parent=el.parentNode;const insertWhere=el.previousSibling;let target;temp.innerHTML=str;target=temp.firstChild;while(target.firstChild)target=target.firstChild;target.appendChild(el);parent.insertBefore(temp.firstChild,insertWhere?insertWhere.nextSibling:parent.firstChild);return target};export{getElWrapper};
//# sourceMappingURL=index.js.map
