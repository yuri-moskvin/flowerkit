import { getDocument } from "ssr-window";

export type TGetScrollbarWidthArgs = Parameters<typeof getScrollbarWidth>;

export type TGetScrollbarWidthReturn = ReturnType<typeof getScrollbarWidth>;

/**
 * Computes the width of the browser's scrollbar in pixels.
 *
 * @returns {number} Scrollbar width in pixels
 * @example
 * const scrollbarWidth = getScrollbarWidth();
 * console.log(scrollbarWidth); // => number
 */
export const getScrollbarWidth = (): number => {
  const doc = getDocument();
  const outer = doc.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  doc.body.appendChild(outer);

  const inner = doc.createElement("div");
  outer.appendChild(inner);

  const w = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  return w;
};
