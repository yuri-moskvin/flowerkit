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
export declare const on: <TEvent extends Event = Event>(target: EventTarget, type: string, callback: (event: TEvent) => void, options?: boolean | AddEventListenerOptions, isAutoInit?: boolean) => TOnControls<TEvent>;
