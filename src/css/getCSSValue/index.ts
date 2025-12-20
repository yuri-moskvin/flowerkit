import { getWindow } from "ssr-window";

/**
 * Gets a calculated CSS property of an DOM-element
 * @param el{HTMLElement|Node|Element|Document} DOM element
 * @param prop{String} CSS property
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @returns {string}
 * @throws {TypeError} getCSSValue: el must be an HTMLElement
 * @throws {TypeError} getCSSValue: prop must be a string
 * @example
 * // How to get "height" prop of div from JS?
 * const block = document.querySelector("#myBlock");
 * getCSSValue(block, "height");
 */
export const getCSSValue = (el: HTMLElement, prop: string): string => {
  if (!el || typeof (el as any).style !== "object") {
    throw new TypeError("getCSSValue: el must be an HTMLElement");
  }
  if (typeof prop !== "string") {
    throw new TypeError("getCSSValue: prop must be a string");
  }
  switch (prop) {
    case "width":
      return `${el.offsetWidth}px`;
    case "height":
      return `${el.offsetHeight}px`;
    default:
      return getWindow().getComputedStyle(el).getPropertyValue(prop);
  }
};
