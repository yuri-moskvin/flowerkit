import { getWindow } from "ssr-window";

export type TOnMediaQueryChangeArgs = Parameters<typeof onMediaQueryChange>;

export type TOnMediaQueryChangeReturn = ReturnType<typeof onMediaQueryChange>;

/**
 * Creates a managed listener for changes to a CSS media query.
 * It is a no-op when `matchMedia` is unavailable, including SSR.
 * @param {string} query Media query
 * @param {(event: MediaQueryListEvent) => void} callback Change callback
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{ mediaQueryList: MediaQueryList|null; handler: (event: MediaQueryListEvent) => void; addListener: () => void; removeListener: () => void; }} Controls
 * @throws {TypeError} onMediaQueryChange: arguments are invalid
 * @example
 * onMediaQueryChange("(prefers-color-scheme: dark)", ({ matches }) => setDark(matches));
 * @example
 * // React to a desktop breakpoint without leaking a matchMedia listener
 * const desktop = onMediaQueryChange("(min-width: 1024px)", ({ matches }) => {
 *   setSidebarExpanded(matches);
 * });
 * desktop.removeListener();
 */
export const onMediaQueryChange = (
  query: string,
  callback: (event: MediaQueryListEvent) => void,
  isAutoInit: boolean = true
): {
  addListener: () => void;
  handler: (event: MediaQueryListEvent) => void;
  mediaQueryList: MediaQueryList | null;
  removeListener: () => void;
} => {
  if (typeof query !== "string" || query.length === 0) {
    throw new TypeError("onMediaQueryChange: query must be a non-empty string");
  }
  if (typeof callback !== "function") {
    throw new TypeError("onMediaQueryChange: callback must be a function");
  }
  if (typeof isAutoInit !== "boolean") {
    throw new TypeError("onMediaQueryChange: isAutoInit must be a boolean");
  }
  const window = getWindow();
  const mediaQueryList = typeof window.matchMedia === "function" ? window.matchMedia(query) : null;
  const handler = (event: MediaQueryListEvent): void => callback(event);
  const addListener = (): void => mediaQueryList?.addEventListener("change", handler);
  const removeListener = (): void => mediaQueryList?.removeEventListener("change", handler);
  if (isAutoInit) {
    addListener();
  }
  return {
    addListener, handler, mediaQueryList, removeListener,
  };
};
