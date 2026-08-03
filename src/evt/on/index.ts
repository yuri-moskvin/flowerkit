export type TOnControls<TEvent extends Event = Event> = {
  addListener: () => void;
  handler: (event: TEvent) => void;
  removeListener: () => void;
};

export type TOnArgs = Parameters<typeof on>;

export type TOnReturn = ReturnType<typeof on>;

/**
 * Creates a managed event listener with explicit add and remove controls.
 * @template TEvent
 * @param {EventTarget} target Event target
 * @param {string} type Event type
 * @param {(event: TEvent) => void} callback Event callback
 * @param {boolean|AddEventListenerOptions} [options={}] Native listener options
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {TOnControls<TEvent>} Listener controls
 * @throws {TypeError} on: arguments are invalid
 * @example
 * const listener = on(window, "online", () => sync());
 * listener.removeListener();
 * @example
 * // Attach a keyboard shortcut now and remove it during component cleanup
 * const escapeKey = on<KeyboardEvent>(document, "keydown", (event) => {
 *   if (event.key === "Escape") closeDialog();
 * });
 * escapeKey.removeListener();
 */
export const on = <TEvent extends Event = Event>(
  target: EventTarget,
  type: string,
  callback: (event: TEvent) => void,
  options: boolean | AddEventListenerOptions = {},
  isAutoInit: boolean = true
): TOnControls<TEvent> => {
  if (!target || typeof target.addEventListener !== "function") {
    throw new TypeError("on: target must be an EventTarget");
  }
  if (typeof type !== "string" || type.length === 0) {
    throw new TypeError("on: type must be a non-empty string");
  }
  if (typeof callback !== "function") {
    throw new TypeError("on: callback must be a function");
  }
  if (typeof options !== "boolean" && (!options || typeof options !== "object" || Array.isArray(options))) {
    throw new TypeError("on: options must be a boolean or listener options");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("on: isAutoInit must be a boolean");
  }

  const handler = (event: TEvent): void => callback(event);
  const addListener = (): void => {
    target.addEventListener(type, handler as EventListener, options);
  };
  const removeListener = (): void => {
    target.removeEventListener(type, handler as EventListener, options);
  };
  if (isAutoInit) {
    addListener();
  }
  return { addListener, handler, removeListener };
};
