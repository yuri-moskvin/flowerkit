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
export declare const getElWrapper: (el: HTMLElement, str: string) => HTMLElement;
