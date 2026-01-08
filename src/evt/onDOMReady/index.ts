import { getDocument } from "ssr-window";

export type TOnDOMReadyArgs = Parameters<typeof onDOMReady>;

export type TOnDOMReadyReturn = ReturnType<typeof onDOMReady>;

/**
 * Runs a callback when the DOM is ready (`DOMContentLoaded`).
 * If already ready, executes immediately.
 *
 * @param {(e?: Event) => void} cb Callback to run on DOM ready
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e?: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onDOMReady: cb must be a function
 * @throws {TypeError} onDOMReady: isAutoInit must be a boolean
 *
 * @example
 * onDOMReady(() => console.log("DOM ready"));
 */
export const onDOMReady = (
  cb: (e?: Event) => void,
  isAutoInit: boolean | undefined = true
): {
  handler: (e?: Event) => void;
  addListener: () => void;
  removeListener: () => void;
} => {
  if (typeof cb !== "function") {
    throw new TypeError("onDOMReady: cb must be a function");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onDOMReady: isAutoInit must be a boolean");
  }

  const handler = (e?: Event): void => {
    cb(e);
  };

  const addListener = (): void => {
    if (getDocument().readyState === "loading") {
      getDocument().addEventListener("DOMContentLoaded", handler as EventListener);
    } else {
      handler();
    }
  };

  const removeListener = (): void => {
    getDocument().removeEventListener("DOMContentLoaded", handler as EventListener);
  };

  if (isAutoInit) {
    addListener();
  }

  return {
    handler,
    addListener,
    removeListener,
  };

};
