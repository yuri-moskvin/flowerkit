export type TScrollAxis = "any" | "x" | "y";
export type TGetScrollParentArgs = Parameters<typeof getScrollParent>;
export type TGetScrollParentReturn = ReturnType<typeof getScrollParent>;
/**
 * Gets the nearest ancestor configured as a scroll container for the selected axis.
 * Falls back to the document scrolling element when no nested container is found.
 * @param {Element} element Source element
 * @param {TScrollAxis} [axis="any"] Scroll axis to inspect
 * @returns {Element|null} Nearest scroll container or document root
 * @throws {TypeError} getScrollParent: arguments are invalid
 * @example
 * const scrollContainer = getScrollParent(dropdownTrigger);
 * scrollContainer?.addEventListener("scroll", repositionDropdown);
 * @example
 * // Use the vertical scroll parent as an IntersectionObserver root
 * const root = getScrollParent(loadMoreButton, "y");
 * const observer = new IntersectionObserver(loadNextPage, { root });
 */
export declare const getScrollParent: (element: Element, axis?: TScrollAxis) => Element | null;
