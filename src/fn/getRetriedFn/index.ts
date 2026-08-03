export type TRetryOptions = {
  backoff?: number;
  baseDelay?: number;
  maxDelay?: number;
  maxRetries?: number;
  onRetry?: (error: unknown, retry: number) => void;
  shouldRetry?: (error: unknown, retry: number) => boolean | Promise<boolean>;
  signal?: AbortSignal | null;
};

export type TGetRetriedFnArgs = Parameters<typeof getRetriedFn>;

export type TGetRetriedFnReturn = ReturnType<typeof getRetriedFn>;

const getAbortReason = (signal: AbortSignal): unknown => {
  return signal.reason ?? new DOMException("The operation was aborted", "AbortError");
};

const waitForRetry = async (delay: number, signal: AbortSignal | null): Promise<void> => {
  if (signal?.aborted) {
    throw getAbortReason(signal);
  }
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, delay);
    const abort = (): void => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(signal ? getAbortReason(signal) : undefined);
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
};

/**
 * Returns an async function that retries rejected calls with exponential backoff.
 * @template T
 * @param {T} fn Source function
 * @param {TRetryOptions} [options={}] Retry policy
 * @returns {(...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>} Retrying function
 * @throws {TypeError} getRetriedFn: options are invalid
 * @example
 * const loadWithRetry = getRetriedFn(loadData, { maxRetries: 2, baseDelay: 100 });
 * @example
 * // Retry a transient API request with exponential backoff and cancellation
 * const controller = new AbortController();
 * const fetchWithRetry = getRetriedFn(fetchProducts, {
 *   maxRetries: 3,
 *   baseDelay: 250,
 *   signal: controller.signal,
 * });
 */
export const getRetriedFn = <T extends (...args: any[]) => any>(
  fn: T,
  options: TRetryOptions = {}
): ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) => {
  if (typeof fn !== "function") {
    throw new TypeError("getRetriedFn: fn must be a function");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getRetriedFn: options must be a plain object");
  }
  const {
    backoff = 2,
    baseDelay = 0,
    maxDelay = Infinity,
    maxRetries = 2,
    onRetry,
    shouldRetry = () => true,
    signal = null,
  } = options;
  if (!Number.isInteger(maxRetries) || maxRetries < 0) {
    throw new TypeError("getRetriedFn: maxRetries must be a non-negative integer");
  }
  if (typeof baseDelay !== "number" || !Number.isFinite(baseDelay) || baseDelay < 0) {
    throw new TypeError("getRetriedFn: baseDelay must be a non-negative finite number");
  }
  if (typeof backoff !== "number" || !Number.isFinite(backoff) || backoff < 1) {
    throw new TypeError("getRetriedFn: backoff must be a finite number greater than or equal to 1");
  }
  if (typeof maxDelay !== "number" || Number.isNaN(maxDelay) || maxDelay < 0) {
    throw new TypeError("getRetriedFn: maxDelay must be a non-negative number or Infinity");
  }
  if (typeof shouldRetry !== "function" || (onRetry !== undefined && typeof onRetry !== "function")) {
    throw new TypeError("getRetriedFn: retry callbacks must be functions");
  }

  return async function retriedFunction(
    this: unknown,
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    let retry = 0;
    while (true) {
      if (signal?.aborted) {
        throw getAbortReason(signal);
      }
      try {
        return await fn.apply(this, args) as Awaited<ReturnType<T>>;
      } catch (error) {
        retry += 1;
        if (retry > maxRetries || !(await shouldRetry(error, retry))) {
          throw error;
        }
        onRetry?.(error, retry);
        const delay = Math.min(maxDelay, baseDelay * backoff ** (retry - 1));
        await waitForRetry(delay, signal);
      }
    }
  };
};
