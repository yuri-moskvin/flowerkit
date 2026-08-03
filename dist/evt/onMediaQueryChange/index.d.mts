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
export declare const onMediaQueryChange: (query: string, callback: (event: MediaQueryListEvent) => void, isAutoInit?: boolean) => {
    addListener: () => void;
    handler: (event: MediaQueryListEvent) => void;
    mediaQueryList: MediaQueryList | null;
    removeListener: () => void;
};
