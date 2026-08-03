export type TOnResizeObservedArgs = Parameters<typeof onResizeObserved>;
export type TOnResizeObservedReturn = ReturnType<typeof onResizeObserved>;
/**
 * Observes size changes for one or more elements.
 * It is a no-op when ResizeObserver is unavailable.
 * @param {Element|Element[]} elements Elements to observe
 * @param {ResizeObserverCallback} callback Observer callback
 * @param {ResizeObserverOptions} [options={}] Per-element observer options
 * @param {boolean} [isAutoInit=true] Start observing immediately
 * @returns {{ observer: ResizeObserver|null; observe: () => void; disconnect: () => void; }} Controls
 * @throws {TypeError} onResizeObserved: arguments are invalid
 * @example
 * const sizing = onResizeObserved(panel, ([ entry ]) => update(entry.contentRect));
 * @example
 * // Resize a canvas when its container dimensions change
 * const canvasSizing = onResizeObserved(container, ([ entry ]) => {
 *   canvas.width = entry.contentRect.width;
 *   canvas.height = entry.contentRect.height;
 * });
 */
export declare const onResizeObserved: (elements: Element | readonly Element[], callback: ResizeObserverCallback, options?: ResizeObserverOptions, isAutoInit?: boolean) => {
    disconnect: () => void;
    observe: () => void;
    observer: ResizeObserver | null;
};
