/**
 * Gets a throttled function with specific delay
 * @param func{Function} - function
 * @param delay{Number=} - delay in ms, 1000 by default
 * @return {*}
 * @example
 * // How to implement function throttling?
 * const getDataFromAPI = () => Promise.resolve([]);
 * const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
 * getThrottledFn(); // => []
 */
export function getThrottledFn(func: Function, delay?: number | undefined): any;
//# sourceMappingURL=index.d.ts.map