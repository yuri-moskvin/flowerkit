export type TOnIntersectionArgs = Parameters<typeof onIntersection>;

export type TOnIntersectionReturn = ReturnType<typeof onIntersection>;

/**
 * Observes intersection changes for one or more elements.
 * It is a no-op when IntersectionObserver is unavailable.
 * @param {Element|Element[]} elements Elements to observe
 * @param {IntersectionObserverCallback} callback Observer callback
 * @param {IntersectionObserverInit} [options={}] Observer options
 * @param {boolean} [isAutoInit=true] Start observing immediately
 * @returns {{ observer: IntersectionObserver|null; observe: () => void; disconnect: () => void; }} Controls
 * @throws {TypeError} onIntersection: arguments are invalid
 * @example
 * const visibility = onIntersection(card, ([ entry ]) => setVisible(entry.isIntersecting));
 * @example
 * // Lazy-load an image when it approaches the viewport
 * const lazyImage = onIntersection(image, ([ entry ]) => {
 *   if (entry.isIntersecting) image.src = image.dataset.src ?? "";
 * }, { rootMargin: "200px" });
 */
export const onIntersection = (
  elements: Element | readonly Element[],
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
  isAutoInit: boolean = true
): {
  disconnect: () => void;
  observe: () => void;
  observer: IntersectionObserver | null;
} => {
  const targets = Array.isArray(elements) ? elements : [ elements ];
  if (targets.length === 0 || targets.some((element) => !element || element.nodeType !== 1)) {
    throw new TypeError("onIntersection: elements must contain DOM elements");
  }
  if (typeof callback !== "function") {
    throw new TypeError("onIntersection: callback must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("onIntersection: options must be a plain object");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onIntersection: isAutoInit must be a boolean");
  }
  const Observer = globalThis.IntersectionObserver;
  const observer = typeof Observer === "function" ? new Observer(callback, options) : null;
  const observe = (): void => targets.forEach((element) => observer?.observe(element));
  const disconnect = (): void => observer?.disconnect();
  if (isAutoInit) {
    observe();
  }
  return { disconnect, observe, observer };
};
