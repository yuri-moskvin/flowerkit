export type TGetAsyncPoolOptions<TSettle extends boolean = boolean> = {
    concurrency?: number;
    settle?: TSettle;
    signal?: AbortSignal | null;
};
export type TGetAsyncPoolResult<T, TSettle extends boolean> = TSettle extends true ? PromiseSettledResult<T>[] : T[];
export type TGetAsyncPoolArgs = Parameters<typeof getAsyncPool>;
export type TGetAsyncPoolReturn = ReturnType<typeof getAsyncPool>;
/**
 * Maps an array asynchronously with a concurrency limit while preserving order.
 * Supports cancellation and an all-settled result mode.
 * @template T,U,TSettle
 * @param {T[]} arr Source array
 * @param {(value: T, index: number, array: T[], signal: AbortSignal) => Promise<U>|U} callback Mapper
 * @param {number|TGetAsyncPoolOptions<TSettle>} [concurrencyOrOptions=4] Concurrency or pool options
 * @returns {Promise<TGetAsyncPoolResult<U,TSettle>>} Ordered results
 * @throws {TypeError} getAsyncPool: arguments are invalid
 * @example
 * await getAsyncPool(ids, (id) => loadItem(id), 3);
 * @example
 * // Upload files with cancellation and collect every outcome
 * const controller = new AbortController();
 * const uploadedFiles = await getAsyncPool(files, uploadFile, {
 *   concurrency: 2,
 *   settle: true,
 *   signal: controller.signal,
 * });
 */
export declare const getAsyncPool: <T, U, TSettle extends boolean = false>(arr: T[], callback: (value: T, index: number, array: T[], signal: AbortSignal) => Promise<U> | U, concurrencyOrOptions?: number | TGetAsyncPoolOptions<TSettle>) => Promise<TGetAsyncPoolResult<U, TSettle>>;
