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
export declare const onIntersection: (elements: Element | readonly Element[], callback: IntersectionObserverCallback, options?: IntersectionObserverInit, isAutoInit?: boolean) => {
    disconnect: () => void;
    observe: () => void;
    observer: IntersectionObserver | null;
};
