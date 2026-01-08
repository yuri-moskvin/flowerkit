import { getDocument, getWindow } from "ssr-window";

export type TOnWindowLoadArgs = Parameters<typeof onWindowLoad>;

export type TOnWindowLoadReturn = ReturnType<typeof onWindowLoad>;

/**
 * Runs a callback when the window load event fires.
 * Executes immediately if already loaded.
 *
 * @param {(e?: Event) => void} cb Callback to run on load
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e?: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onWindowLoad: cb must be a function
 * @throws {TypeError} onWindowLoad: isAutoInit must be a boolean
 * @throws {TypeError} onWindowLoad: cb must be a function
 * @throws {TypeError} onWindowLoad: isAutoInit must be a boolean
 *
 * @example
 * const { removeListener } = onWindowLoad(() => console.log("Loaded"));
 */
export const onWindowLoad = (
  cb: (e?: Event) => void,
  isAutoInit: boolean | undefined = true
): {
  handler: (e?: Event) => void;
  addListener: () => void;
  removeListener: () => void;
} => {
  if (typeof cb !== "function") {
    throw new TypeError("onWindowLoad: cb must be a function");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onWindowLoad: isAutoInit must be a boolean");
  }
  if (typeof cb !== "function") {
    throw new TypeError("onWindowLoad: cb must be a function");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onWindowLoad: isAutoInit must be a boolean");
  }

  const handler = (e?: Event): void => {
    cb(e);
  };

  const addListener = (): void => {
    if (getDocument().readyState === "complete") {
      handler();
    } else {
      getWindow().addEventListener("load", handler as EventListener);
    }
  };

  const removeListener = (): void => {
    getWindow().removeEventListener("load", handler as EventListener);
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
