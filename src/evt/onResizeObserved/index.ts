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
export const onResizeObserved = (
  elements: Element | readonly Element[],
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {},
  isAutoInit: boolean = true
): {
  disconnect: () => void;
  observe: () => void;
  observer: ResizeObserver | null;
} => {
  const targets = Array.isArray(elements) ? elements : [ elements ];
  if (targets.length === 0 || targets.some((element) => !element || element.nodeType !== 1)) {
    throw new TypeError("onResizeObserved: elements must contain DOM elements");
  }
  if (typeof callback !== "function") {
    throw new TypeError("onResizeObserved: callback must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("onResizeObserved: options must be a plain object");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onResizeObserved: isAutoInit must be a boolean");
  }
  const Observer = globalThis.ResizeObserver;
  const observer = typeof Observer === "function" ? new Observer(callback) : null;
  const observe = (): void => targets.forEach((element) => observer?.observe(element, options));
  const disconnect = (): void => observer?.disconnect();
  if (isAutoInit) {
    observe();
  }
  return { disconnect, observe, observer };
};
