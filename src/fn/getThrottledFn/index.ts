export type TGetThrottledFnArgs = Parameters<typeof getThrottledFn>;

export type TGetThrottledFnReturn = ReturnType<typeof getThrottledFn>;

/**
 * Gets a throttled function with specific delay
 * @template {(...args: any[]) => any} T
 * @param {T} func function
 * @param {number} [delay=1000] delay in ms, 1000 by default
 * @returns {(...args: Parameters<T>) => void}
 * @throws {TypeError} getThrottledFn: func must be a function
 * @throws {TypeError} getThrottledFn: delay must be a non-negative finite number
 * @example
 * // How to implement function throttling?
 * const getDataFromAPI = () => Promise.resolve([]);
 * const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
 * getThrottledDataFromAPI(); // => []
 */
export const getThrottledFn = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
): ((...args: Parameters<T>) => void) => {
  if (typeof func !== "function") {
    throw new TypeError("getThrottledFn: func must be a function");
  }
  if (typeof delay !== "number" || !Number.isFinite(delay) || delay < 0) {
    throw new TypeError("getThrottledFn: delay must be a non-negative finite number");
  }

  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>): void => {
    if (!timeout) {
      func(...args);
      timeout = setTimeout((): void => {
        timeout = null;
      }, delay);
    }
  };
};
