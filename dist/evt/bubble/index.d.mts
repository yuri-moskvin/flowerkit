type TBubbleTarget = Document | Window | Element | HTMLElement;
type TBubbleParams<T = unknown> = CustomEventInit<T> & Record<string, unknown>;
export type TBubbleArgs = Parameters<typeof bubble>;
export type TBubbleReturn = ReturnType<typeof bubble>;
/**
 * Dispatches a bubbling `CustomEvent` on the provided target.
 *
 * @template T
 * @param {Document|Window|Element|HTMLElement} [el=document] Event target
 * @param {string} name Event name
 * @param {T} [detail] Custom event detail payload
 * @param {CustomEventInit<T> & Record<string, unknown>} [params={}] Extra `CustomEvent` init options
 * @returns {void}
 * @throws {TypeError} bubble: el must be an EventTarget
 * @throws {TypeError} bubble: name must be a non-empty string
 * @throws {TypeError} bubble: params must be an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 *
 * @example
 * bubble(document, "myEvent", { myData: "test" });
 *
 * @example
 * const el = document.querySelector("#myElement");
 * if (el) bubble(el, "myEvent");
 */
export declare const bubble: <T = unknown>(el: TBubbleTarget | undefined, name: string, detail?: T, params?: TBubbleParams<T>) => void;
export {};
