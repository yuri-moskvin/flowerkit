export type TThrottledFn<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
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
export const getThrottledFn = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
): TThrottledFn<T> => {
  if (typeof func !== "function") {
    throw new TypeError("getThrottledFn: func must be a function");
  }
  if (typeof delay !== "number" || !Number.isFinite(delay) || delay < 0) {
    throw new TypeError("getThrottledFn: delay must be a non-negative finite number");
  }

  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: unknown;
  let result: ReturnType<T> | undefined;
  const invoke = (): ReturnType<T> | undefined => {
    if (!lastArgs) {
      return result;
    }
    const args = lastArgs;
    const context = lastContext;
    lastArgs = null;
    lastContext = undefined;
    result = func.apply(context, args) as ReturnType<T>;
    return result;
  };
  const throttled = function throttledFunction(
    this: unknown,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    if (!timeout) {
      lastArgs = args;
      lastContext = this;
      invoke();
      timeout = setTimeout((): void => {
        timeout = null;
        lastArgs = null;
        lastContext = undefined;
      }, delay);
    } else {
      lastArgs = args;
      lastContext = this;
    }
    return result;
  } as TThrottledFn<T>;

  throttled.cancel = (): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = null;
    lastArgs = null;
    lastContext = undefined;
  };
  throttled.flush = (): ReturnType<T> | undefined => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      return invoke();
    }
    return result;
  };
  throttled.pending = (): boolean => timeout !== null;

  return throttled;
};
