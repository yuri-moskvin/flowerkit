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
export declare const getRetriedFn: <T extends (...args: any[]) => any>(fn: T, options?: TRetryOptions) => ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>);
