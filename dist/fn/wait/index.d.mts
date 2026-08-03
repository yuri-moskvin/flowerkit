export type TWaitArgs = Parameters<typeof wait>;
export type TWaitReturn = ReturnType<typeof wait>;
/**
 * Gets a `Promise` that resolves after specific time
 * @param {number} [ms=0] delay in ms
 * @returns {Promise<void>}
 * @throws {TypeError} wait: ms must be a non-negative finite number
 * @example
 * // How to sleep/delay in JS?
 * wait(3000).finally(() => {
 *   console.log("Runs after 3 sec!");
 * })
 * @example
 * // Delay the next step in an async animation sequence
 * await wait(200);
 * element.classList.add("is-visible");
 */
export declare const wait: (ms?: number) => Promise<void>;
