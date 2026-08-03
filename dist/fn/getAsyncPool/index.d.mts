export type TGetAsyncPoolArgs = Parameters<typeof getAsyncPool>;
export type TGetAsyncPoolReturn = ReturnType<typeof getAsyncPool>;
/**
 * Maps an array asynchronously with a concurrency limit while preserving order.
 * @template T,U
 * @param {T[]} arr Source array
 * @param {(value: T, index: number, array: T[]) => Promise<U>|U} callback Mapper
 * @param {number} [concurrency=4] Maximum active callbacks
 * @returns {Promise<U[]>} Ordered results
 * @throws {TypeError} getAsyncPool: arr must be an array
 * @throws {TypeError} getAsyncPool: callback must be a function
 * @throws {TypeError} getAsyncPool: concurrency must be a positive integer
 * @example
 * await getAsyncPool(ids, (id) => loadItem(id), 3);
 * @example
 * // Upload files with no more than two simultaneous network requests
 * const uploadedFiles = await getAsyncPool(files, uploadFile, 2);
 */
export declare const getAsyncPool: <T, U>(arr: T[], callback: (value: T, index: number, array: T[]) => Promise<U> | U, concurrency?: number) => Promise<U[]>;
