import { getDocument } from "ssr-window";

export type TOnClickOutsideOptions = {
  document?: Document;
  eventName?: "click" | "mousedown" | "pointerdown" | "touchstart";
  ignored?: readonly Element[];
  isAutoInit?: boolean;
  listenerOptions?: boolean | AddEventListenerOptions;
};

export type TOnClickOutsideArgs = Parameters<typeof onClickOutside>;

export type TOnClickOutsideReturn = ReturnType<typeof onClickOutside>;

/**
 * Calls a callback when an event occurs outside one or more elements.
 * @param {Element|Element[]} elements Elements treated as inside
 * @param {(event: Event) => void} callback Outside-event callback
 * @param {TOnClickOutsideOptions} [options={}] Listener options
 * @returns {{ handler: (event: Event) => void; addListener: () => void; removeListener: () => void; }} Controls
 * @throws {TypeError} onClickOutside: arguments are invalid
 * @example
 * const listener = onClickOutside(menu, () => closeMenu());
 * @example
 * // Close a dropdown on outside click but ignore its toggle button
 * const outside = onClickOutside(dropdown, closeDropdown, {
 *   ignored: [ toggleButton ],
 *   eventName: "pointerdown",
 * });
 */
export const onClickOutside = (
  elements: Element | readonly Element[],
  callback: (event: Event) => void,
  options: TOnClickOutsideOptions = {}
): {
  addListener: () => void;
  handler: (event: Event) => void;
  removeListener: () => void;
} => {
  const targets = Array.isArray(elements) ? elements : [ elements ];
  if (targets.length === 0 || targets.some((element) => !element || element.nodeType !== 1)) {
    throw new TypeError("onClickOutside: elements must contain DOM elements");
  }
  if (typeof callback !== "function") {
    throw new TypeError("onClickOutside: callback must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("onClickOutside: options must be a plain object");
  }
  const {
    document = getDocument(),
    eventName = "pointerdown",
    ignored = [],
    isAutoInit = true,
    listenerOptions = {},
  } = options;
  if (!Array.isArray(ignored) || ignored.some((element) => !element || element.nodeType !== 1)) {
    throw new TypeError("onClickOutside: ignored must be an array of elements");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onClickOutside: isAutoInit must be a boolean");
  }

  const handler = (event: Event): void => {
    const path = typeof event.composedPath === "function" ? event.composedPath() : [];
    const eventTarget = event.target as Node | null;
    const containsTarget = (element: Element): boolean => {
      return path.includes(element) || Boolean(eventTarget && element.contains(eventTarget));
    };
    if (![ ...targets, ...ignored ].some(containsTarget)) {
      callback(event);
    }
  };
  const addListener = (): void => document.addEventListener(eventName, handler, listenerOptions);
  const removeListener = (): void => document.removeEventListener(eventName, handler, listenerOptions);
  if (isAutoInit) {
    addListener();
  }
  return { addListener, handler, removeListener };
};
