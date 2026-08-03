export type TOnceArgs = Parameters<typeof once>;
export type TOnceReturn = ReturnType<typeof once>;
/**
 * Returns a function that invokes the source function once and reuses its result.
 * @template T
 * @param {T} fn Source function
 * @returns {(...args: Parameters<T>) => ReturnType<T>} One-time function
 * @throws {TypeError} once: fn must be a function
 * @throws {unknown} Re-throws and remembers an error from the first invocation
 * @example
 * const initialize = once(() => ({ ready: true }));
 * initialize() === initialize(); // true
 * @example
 * // Initialize an analytics SDK only once across multiple components
 * const initializeAnalytics = once(() => analytics.init(config));
 * initializeAnalytics();
 */
export declare const once: <T extends (...args: any[]) => any>(fn: T) => ((...args: Parameters<T>) => ReturnType<T>);
