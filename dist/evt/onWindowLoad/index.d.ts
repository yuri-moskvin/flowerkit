/**
 * Runs callback when page has fully loaded
 * @param cb{Function} - callback function
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @example
 * // How to detect when whole page (window) has loaded?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 * */
export function onWindowLoad(cb: Function, isAutoInit?: boolean | undefined): {
    handler: Function;
    addListener: Function;
    removeListener: Function;
};
//# sourceMappingURL=index.d.ts.map