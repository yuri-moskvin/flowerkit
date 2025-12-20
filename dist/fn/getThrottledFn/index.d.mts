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
export declare const getThrottledFn: <T extends (...args: any[]) => any>(func: T, delay?: number) => ((...args: Parameters<T>) => void);
