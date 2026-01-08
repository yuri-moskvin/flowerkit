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
export declare const onDOMReady: (cb: (e?: Event) => void, isAutoInit?: boolean | undefined) => {
    handler: (e?: Event) => void;
    addListener: () => void;
    removeListener: () => void;
};
