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
 */
export const wait = (ms: number = 0): Promise<void> => {
  if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) {
    throw new TypeError("wait: ms must be a non-negative finite number");
  }
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};
