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
export declare const onClickOutside: (elements: Element | readonly Element[], callback: (event: Event) => void, options?: TOnClickOutsideOptions) => {
    addListener: () => void;
    handler: (event: Event) => void;
    removeListener: () => void;
};
