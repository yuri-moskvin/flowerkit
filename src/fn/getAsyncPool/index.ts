import { _getAbortReason, _isAbortSignal } from "../_abort/index.ts";
import { getAbortSignal } from "../getAbortSignal/index.ts";

export type TGetAsyncPoolOptions<TSettle extends boolean = boolean> = {
  concurrency?: number;
  settle?: TSettle;
  signal?: AbortSignal | null;
};

export type TGetAsyncPoolResult<T, TSettle extends boolean> = TSettle extends true
  ? PromiseSettledResult<T>[]
  : T[];

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
export const getAsyncPool = async <T, U, TSettle extends boolean = false>(
  arr: T[],
  callback: (value: T, index: number, array: T[], signal: AbortSignal) => Promise<U> | U,
  concurrencyOrOptions: number | TGetAsyncPoolOptions<TSettle> = 4
): Promise<TGetAsyncPoolResult<U, TSettle>> => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getAsyncPool: arr must be an array");
  }
  if (typeof callback !== "function") {
    throw new TypeError("getAsyncPool: callback must be a function");
  }
  if (
    typeof concurrencyOrOptions !== "number"
    && (!concurrencyOrOptions
      || typeof concurrencyOrOptions !== "object"
      || Array.isArray(concurrencyOrOptions))
  ) {
    throw new TypeError("getAsyncPool: options must be a number or plain object");
  }

  const options = typeof concurrencyOrOptions === "number"
    ? { concurrency: concurrencyOrOptions, settle: false, signal: null }
    : concurrencyOrOptions;
  const {
    concurrency = 4,
    settle = false,
    signal = null,
  } = options;
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new TypeError("getAsyncPool: concurrency must be a positive integer");
  }
  if (typeof settle !== "boolean") {
    throw new TypeError("getAsyncPool: settle must be a boolean");
  }
  if (signal !== null && !_isAbortSignal(signal)) {
    throw new TypeError("getAsyncPool: signal must be an AbortSignal or null");
  }

  const controls = getAbortSignal({ signals: [ signal ] });
  if (controls.signal.aborted) {
    throw _getAbortReason(controls.signal);
  }

  const result = new Array<U | PromiseSettledResult<U>>(arr.length);
  let nextIndex = 0;
  const worker = async (): Promise<void> => {
    while (nextIndex < arr.length) {
      if (controls.signal.aborted) {
        throw _getAbortReason(controls.signal);
      }
      const index = nextIndex;
      nextIndex += 1;
      try {
        const value = await callback(arr[index], index, arr, controls.signal);
        result[index] = settle ? { status: "fulfilled", value } : value;
      } catch (error) {
        if (controls.signal.aborted) {
          throw _getAbortReason(controls.signal);
        }
        if (settle) {
          result[index] = { reason: error, status: "rejected" };
        } else {
          controls.abort(error);
          throw error;
        }
      }
    }
  };
  const workers = Array.from(
    { length: Math.min(concurrency, arr.length) },
    () => worker()
  );
  let removeAbortListener = (): void => {};
  const aborted = new Promise<never>((resolve, reject) => {
    const onAbort = (): void => reject(_getAbortReason(controls.signal));
    controls.signal.addEventListener("abort", onAbort, { once: true });
    removeAbortListener = (): void => controls.signal.removeEventListener("abort", onAbort);
  });

  try {
    await Promise.race([ Promise.all(workers), aborted ]);
    return result as TGetAsyncPoolResult<U, TSettle>;
  } finally {
    removeAbortListener();
    controls.dispose();
  }
};
