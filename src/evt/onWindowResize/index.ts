import { getWindow } from "ssr-window";
import { getDebouncedFn } from "../../fn/getDebouncedFn/index.ts";

export type TOnWindowResizeArgs = Parameters<typeof onWindowResize>;

export type TOnWindowResizeReturn = ReturnType<typeof onWindowResize>;

/**
 * Runs a callback on window resize. If `delay` is provided, the callback is debounced.
 *
 * @param {(e: Event) => void} cb Resize callback
 * @param {number} [delay=300] Debounce delay in ms; falsy to call immediately
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onWindowResize: cb must be a function
 * @throws {TypeError} onWindowResize: delay must be a number if provided
 * @throws {TypeError} onWindowResize: isAutoInit must be a boolean
 *
 * @example
 * onWindowResize(() => console.log("resized"));
 */
export const onWindowResize = (
  cb: (e: Event) => void,
  delay: number | undefined = 300,
  isAutoInit: boolean | undefined = true
): {
  handler: (e: Event) => void;
  addListener: () => void;
  removeListener: () => void;
} => {
  if (typeof cb !== "function") {
    throw new TypeError("onWindowResize: cb must be a function");
  }
  if (typeof delay !== "number" && typeof delay !== "undefined") {
    throw new TypeError("onWindowResize: delay must be a number if provided");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onWindowResize: isAutoInit must be a boolean");
  }

  const fn = delay ? getDebouncedFn<typeof cb>(cb, delay) : cb;
  const handler = (e: Event): void => {
    fn(e);
  };

  const addListener = (): void => {
    getWindow().addEventListener("resize", handler as EventListener);
  };

  const removeListener = (): void => {
    getWindow().removeEventListener("resize", handler as EventListener);
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
