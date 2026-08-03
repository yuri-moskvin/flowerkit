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
export const once = <T extends (...args: any[]) => any>(
  fn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  if (typeof fn !== "function") {
    throw new TypeError("once: fn must be a function");
  }

  let isCalled = false;
  let error: unknown;
  let isFailed = false;
  let result: ReturnType<T>;
  return function onceFunction(this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (!isCalled) {
      isCalled = true;
      try {
        result = fn.apply(this, args) as ReturnType<T>;
      } catch (caughtError) {
        error = caughtError;
        isFailed = true;
        throw caughtError;
      }
    }
    if (isFailed) {
      throw error;
    }
    return result;
  };
};
