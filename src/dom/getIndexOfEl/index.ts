export type TGetIndexOfElArgs = Parameters<typeof getIndexOfEl>;

export type TGetIndexOfElReturn = ReturnType<typeof getIndexOfEl>;

/**
 * Gets index of Node from relatively its siblings
 * @param el{HTMLElement|Node|Element|Document} DOM element
 * @returns {number}
 * @throws {TypeError} getIndexOfEl: el must be a Node/Element
 * @example
 * // <ul>
 * //  <li id="a">A</li>
 * //  Text node
 * //  <li id="b">B</li>
 * //  <li id="c">C</li>
 * // </ul>
 * getIndexOfEl(document.querySelector("#c")!) // 2
 */
export const getIndexOfEl = (el: HTMLElement | Node | Element | Document): number => {
  if (!el || typeof (el as any).parentNode === "undefined") {
    throw new TypeError("getIndexOfEl: el must be a Node/Element");
  }
  const parent = (el as any).parentNode as (ParentNode & { children?: HTMLCollection; }) | null;
  if (parent && parent.children) {
    return Array.from(parent.children).indexOf(el as Element);
  } else {
    return 0;
  }
};
