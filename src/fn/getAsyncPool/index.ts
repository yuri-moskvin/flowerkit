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
export const getAsyncPool = async <T, U>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => Promise<U> | U,
  concurrency: number = 4
): Promise<U[]> => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getAsyncPool: arr must be an array");
  }
  if (typeof callback !== "function") {
    throw new TypeError("getAsyncPool: callback must be a function");
  }
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new TypeError("getAsyncPool: concurrency must be a positive integer");
  }

  const result = new Array<U>(arr.length);
  let nextIndex = 0;
  const worker = async (): Promise<void> => {
    while (nextIndex < arr.length) {
      const index = nextIndex;
      nextIndex += 1;
      result[index] = await callback(arr[index], index, arr);
    }
  };
  const workers = Array.from(
    { length: Math.min(concurrency, arr.length) },
    () => worker()
  );
  await Promise.all(workers);
  return result;
};
