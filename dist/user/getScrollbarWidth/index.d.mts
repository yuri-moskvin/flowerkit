export type TGetScrollbarWidthArgs = Parameters<typeof getScrollbarWidth>;
export type TGetScrollbarWidthReturn = ReturnType<typeof getScrollbarWidth>;
/**
 * Computes the width of the browser's scrollbar in pixels.
 *
 * @returns {number} Scrollbar width in pixels
 * @example
 * const scrollbarWidth = getScrollbarWidth();
 * console.log(scrollbarWidth); // => number
 * @example
 * // Prevent a layout shift when locking page scroll behind a modal
 * document.body.style.paddingRight = `${getScrollbarWidth()}px`;
 * document.body.style.overflow = "hidden";
 */
export declare const getScrollbarWidth: () => number;
