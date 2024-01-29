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
 */
export function getElWrapper(el: HTMLElement | Node | Element | Document, str: string): ChildNode;
//# sourceMappingURL=index.d.ts.map