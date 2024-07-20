/**
 * Runs callback when page has been resized
 * @param cb{Function} - callback function
 * @param delay{Number=} - callback execution delay
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @example
 * // How to detect when page has been resized and run callback once when resize ends?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 *
 * // How to remove "resize" callback event listener?
 * const { removeListener, addListener } = onWindowResize(callback, 300, false);
 * addListener(); // adds listener manually
 * removeListener(); // removes listener manually
 * */
export function onWindowResize(cb: Function, delay?: number | undefined, isAutoInit?: boolean | undefined): {
    handler: Function;
    addListener: Function;
    removeListener: Function;
};
//# sourceMappingURL=index.d.ts.map