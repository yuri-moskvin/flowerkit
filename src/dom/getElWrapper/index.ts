
import { getDocument } from "ssr-window";

export type TGetElWrapperArgs = Parameters<typeof getElWrapper>;

export type TGetElWrapperReturn = ReturnType<typeof getElWrapper>;

/**
 * Gets a wrapper for specific element
 * @param el{HTMLElement} DOM element
 * @param str{string} string of wrapper HTML layout (supports nested blocks)
 * @returns {HTMLElement}
 * @throws {TypeError} getElWrapper: el must be an HTMLElement
 * @throws {TypeError} getElWrapper: str must be a non-empty string
 * @throws {TypeError} getElWrapper: str must contain an HTML element
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
 * @example
 * // Wrap a form field with reusable validation markup
 * const fieldWrapper = getElWrapper(input, `
 *   <label class="field"><span class="field__control"></span></label>
 * `);
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
  const nextSibling = el.nextSibling;
  temp.innerHTML = str.trim();
  const wrapper = temp.firstElementChild as HTMLElement | null;
  if (!wrapper) {
    throw new TypeError("getElWrapper: str must contain an HTML element");
  }
  let target = wrapper;
  while (target.firstElementChild) {
    target = target.firstElementChild as HTMLElement;
  }
  target.appendChild(el);
  if (parent) {
    parent.insertBefore(wrapper, nextSibling);
  }
  return wrapper;
};
