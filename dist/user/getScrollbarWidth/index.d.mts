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
export declare const getScrollbarWidth: () => number;
