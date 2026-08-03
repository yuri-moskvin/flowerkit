export type TThrottledFn<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
    pending: () => boolean;
};
export type TGetThrottledFnArgs = Parameters<typeof getThrottledFn>;
export type TGetThrottledFnReturn = ReturnType<typeof getThrottledFn>;
/**
 * Gets a throttled function with specific delay
 * @template {(...args: any[]) => any} T
 * @param {T} func function
 * @param {number} [delay=1000] delay in ms, 1000 by default
 * @returns {TThrottledFn<T>} Throttled function with cancel, flush, and pending controls
 * @throws {TypeError} getThrottledFn: func must be a function
 * @throws {TypeError} getThrottledFn: delay must be a non-negative finite number
 * @example
 * // How to implement function throttling?
 * const getDataFromAPI = () => Promise.resolve([]);
 * const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
 * getThrottledDataFromAPI(); // => []
 * @example
 * // Throttle scroll progress updates to avoid excessive layout work
 * const updateProgress = getThrottledFn(() => renderScrollProgress(), 100);
 * window.addEventListener("scroll", updateProgress);
 * updateProgress.cancel();
 */
export declare const getThrottledFn: <T extends (...args: any[]) => any>(func: T, delay?: number) => TThrottledFn<T>;
