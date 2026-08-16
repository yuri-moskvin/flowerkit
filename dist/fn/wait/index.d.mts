export type TWaitOptions = {
    signal?: AbortSignal | null;
};
export type TWaitArgs = Parameters<typeof wait>;
export type TWaitReturn = ReturnType<typeof wait>;
/**
 * Gets a `Promise` that resolves after specific time
 * @param {number} [ms=0] delay in ms
 * @param {TWaitOptions} [options={}] Optional cancellation signal
 * @returns {Promise<void>}
 * @throws {TypeError} wait: ms must be a non-negative finite number
 * @throws {TypeError} wait: options are invalid
 * @example
 * // How to sleep/delay in JS?
 * wait(3000).finally(() => {
 *   console.log("Runs after 3 sec!");
 * })
 * @example
 * // Delay the next step in an async animation sequence
 * await wait(200);
 * element.classList.add("is-visible");
 * @example
 * // Cancel a pending delay during component cleanup
 * const lifecycle = new AbortController();
 * await wait(1_000, { signal: lifecycle.signal });
 * lifecycle.abort();
 */
export declare const wait: (ms?: number, options?: TWaitOptions) => Promise<void>;
