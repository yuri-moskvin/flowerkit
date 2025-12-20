
import { getDocument } from "ssr-window";

/**
 * Gets a wrapper for specific element
 * @param el{HTMLElement|Node|Element|Document} DOM element
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
 */
export const getElWrapper = (el: HTMLElement, str: string): HTMLElement => {
  if (!el || typeof (el as any).nodeType !== "number") {
    throw new TypeError("getElWrapper: el must be an HTMLElement");
  }
  if (typeof str !== "string" || str.length === 0) {
    throw new TypeError("getElWrapper: str must be a non-empty string");
  }
  const temp = getDocument().createElement("div");
  const parent = el.parentNode;
  const insertWhere = (el as any).previousSibling;
  let target;
  temp.innerHTML = str;
  target = temp.firstChild as any;
  while ((target as any).firstChild) {
    target = (target as any).firstChild;
  }
  (target as any).appendChild(el);
  if (parent) {
    parent.insertBefore(temp.firstChild as any, (insertWhere ? (insertWhere as any).nextSibling : (parent as any).firstChild));
  }
  return target as any;
};
