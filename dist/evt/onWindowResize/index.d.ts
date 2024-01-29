/**
 * Runs callback when page has been resized
 * @param cb{Function} - callback function
 * @param delay{Number=} - callback execution delay
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
 * @example
 * // How to detect when page has been resized and run callback once when resize ends?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 * */
export function onWindowResize(cb: Function, delay?: number | undefined): void;
//# sourceMappingURL=index.d.ts.map