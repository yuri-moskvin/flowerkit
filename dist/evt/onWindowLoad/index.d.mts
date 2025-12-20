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
export declare const onWindowLoad: (cb: (e?: Event) => void, isAutoInit?: boolean | undefined) => {
    handler: (e?: Event) => void;
    addListener: () => void;
    removeListener: () => void;
};
