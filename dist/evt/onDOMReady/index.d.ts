/**
 * Runs callback when DOM tree can be manipulated
 * @param cb{Function} - callback function
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 * @example
 * // How to check if DOM is ready?
 * const callback = () => console.log("DOM Content Loaded");
 * onDOMReady(callback);
 */
export function onDOMReady(cb: Function, isAutoInit?: boolean | undefined): {
    handler: Function;
    addListener: Function;
    removeListener: Function;
};
//# sourceMappingURL=index.d.ts.map