import { getDocument } from "ssr-window";

type TBubbleTarget = Document | Window | Element | HTMLElement;
type TBubbleParams<T = unknown> = CustomEventInit<T> & Record<string, unknown>;

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
export const bubble = <T = unknown>(
  el: TBubbleTarget = getDocument(),
  name: string,
  detail?: T,
  params: TBubbleParams<T> = {}
): void => {
  const isTarget = el && typeof (el as any).dispatchEvent === "function";
  if (!isTarget) {
    throw new TypeError("bubble: el must be an EventTarget");
  }
  if (typeof name !== "string" || name.length === 0) {
    throw new TypeError("bubble: name must be a non-empty string");
  }
  if (params === null || typeof params !== "object") {
    throw new TypeError("bubble: params must be an object");
  }

  const eventParams: CustomEventInit<T> = {
    cancelable: true,
    bubbles: true,
    detail,
    ...params,
  };

  if (typeof (globalThis as { dispatchEvent?: unknown; }).dispatchEvent === "function" && typeof CustomEvent === "function") {
    const event = new CustomEvent<T>(name, eventParams);
    (el as EventTarget).dispatchEvent(event);
  }

};
