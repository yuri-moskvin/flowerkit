export type TGetLatestAsyncFnOptions = {
    signal?: AbortSignal | null;
};
export type TLatestAsyncFn<TArgs extends any[], TResult> = ((...args: TArgs) => Promise<Awaited<TResult>>) & {
    cancel: (reason?: unknown) => void;
    pending: () => boolean;
};
export type TLatestAsyncSource<TArgs extends any[], TResult> = (signal: AbortSignal, ...args: TArgs) => TResult;
export type TGetLatestAsyncFnArgs = Parameters<typeof getLatestAsyncFn>;
export type TGetLatestAsyncFnReturn = ReturnType<typeof getLatestAsyncFn>;
/**
 * Wraps an async operation so a new call aborts the previous pending call.
 * The source function receives a per-call signal as its first argument.
 * @template TArgs,TResult
 * @param {TLatestAsyncSource<TArgs, TResult>} fn Async source function
 * @param {TGetLatestAsyncFnOptions} [options={}] Shared lifecycle signal
 * @returns {TLatestAsyncFn<TArgs, TResult>} Latest-only async function with cancel controls
 * @throws {TypeError} getLatestAsyncFn: arguments are invalid
 * @example
 * const search = getLatestAsyncFn(async (signal, query: string) => {
 *   const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal });
 *   return response.json();
 * });
 * await search("roses");
 * @example
 * // Abort the active request when a component is disposed
 * const lifecycle = new AbortController();
 * const load = getLatestAsyncFn(loadProduct, { signal: lifecycle.signal });
 * lifecycle.abort();
 */
export declare const getLatestAsyncFn: <TArgs extends any[], TResult>(fn: TLatestAsyncSource<TArgs, TResult>, options?: TGetLatestAsyncFnOptions) => TLatestAsyncFn<TArgs, TResult>;
