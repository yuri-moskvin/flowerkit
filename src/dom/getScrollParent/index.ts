export type TScrollAxis = "any" | "x" | "y";

export type TGetScrollParentArgs = Parameters<typeof getScrollParent>;

export type TGetScrollParentReturn = ReturnType<typeof getScrollParent>;

const isElement = (value: unknown): value is Element => {
  return Boolean(value && typeof value === "object" && (value as Element).nodeType === 1);
};

const getParentElement = (element: Element): Element | null => {
  if (element.parentElement) {
    return element.parentElement;
  }
  const root = element.getRootNode?.();
  return root && "host" in root && isElement(root.host) ? root.host : null;
};

const isScrollable = (element: Element, axis: TScrollAxis): boolean => {
  const view = element.ownerDocument?.defaultView;
  if (!view) {
    return false;
  }
  const style = view.getComputedStyle(element);
  const canScroll = (value: string): boolean => /^(auto|overlay|scroll)$/.test(value);
  const overflow = style.overflow;
  const overflowX = style.overflowX;
  const overflowY = style.overflowY;
  if (axis === "x") {
    return canScroll(overflowX) || canScroll(overflow);
  }
  if (axis === "y") {
    return canScroll(overflowY) || canScroll(overflow);
  }
  return canScroll(overflowX) || canScroll(overflowY) || canScroll(overflow);
};

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
export const getScrollParent = (
  element: Element,
  axis: TScrollAxis = "any"
): Element | null => {
  if (!isElement(element)) {
    throw new TypeError("getScrollParent: element must be a DOM element");
  }
  if (axis !== "any" && axis !== "x" && axis !== "y") {
    throw new TypeError('getScrollParent: axis must be "any", "x", or "y"');
  }

  const document = element.ownerDocument;
  let parent = getParentElement(element);
  while (parent && parent !== document.body && parent !== document.documentElement) {
    if (isScrollable(parent, axis)) {
      return parent;
    }
    parent = getParentElement(parent);
  }
  return document.scrollingElement ?? document.documentElement ?? null;
};
