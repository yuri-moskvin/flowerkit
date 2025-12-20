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
export declare const onWindowResize: (cb: (e: Event) => void, delay?: number | undefined, isAutoInit?: boolean | undefined) => {
    handler: (e: Event) => void;
    addListener: () => void;
    removeListener: () => void;
};
