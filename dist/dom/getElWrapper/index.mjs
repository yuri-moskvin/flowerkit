import{getDocument}from"ssr-window";
/**
 * Gets a wrapper for specific element
 * @param el{HTMLElement} DOM element
 * @param str{String} string of wrapper HTML layout (supports nested blocks)
 * @returns {HTMLElement}
 * @throws {TypeError} getElWrapper: el must be an HTMLElement
 * @throws {TypeError} getElWrapper: str must be a non-empty string
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
 */const getElWrapper=(el,str)=>{if(!el||typeof el.nodeType!=="number")throw new TypeError("getElWrapper: el must be an HTMLElement");if(typeof str!=="string"||str.length===0)throw new TypeError("getElWrapper: str must be a non-empty string");const temp=getDocument().createElement("div");const parent=el.parentNode;const insertWhere=el.previousSibling;let target;temp.innerHTML=str;target=temp.firstChild;while(target.firstChild)target=target.firstChild;target.appendChild(el);if(parent)parent.insertBefore(temp.firstChild,insertWhere?insertWhere.nextSibling:parent.firstChild);return target};export{getElWrapper};
//# sourceMappingURL=index.mjs.map
