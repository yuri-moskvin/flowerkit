import { _getAbortReason, _isAbortSignal } from "../_abort/index.ts";

export type TWaitOptions = {
  signal?: AbortSignal | null;
};

export type TWaitArgs = Parameters<typeof wait>;

export type TWaitReturn = ReturnType<typeof wait>;

/**
 * Gets a `Promise` that resolves after specific time
 * @param {number} [ms=0] delay in ms
 * @param {TWaitOptions} [options={}] Optional cancellation signal
 * @returns {Promise<void>}
 * @throws {TypeError} wait: ms must be a non-negative finite number
 * @throws {TypeError} wait: options are invalid
 * @example
 * // How to sleep/delay in JS?
 * wait(3000).finally(() => {
 *   console.log("Runs after 3 sec!");
 * })
 * @example
 * // Delay the next step in an async animation sequence
 * await wait(200);
 * element.classList.add("is-visible");
 * @example
 * // Cancel a pending delay during component cleanup
 * const lifecycle = new AbortController();
 * await wait(1_000, { signal: lifecycle.signal });
 * lifecycle.abort();
 */
export const wait = (ms: number = 0, options: TWaitOptions = {}): Promise<void> => {
  if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) {
    throw new TypeError("wait: ms must be a non-negative finite number");
  }
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("wait: options must be a plain object");
  }
  const { signal = null } = options;
  if (signal !== null && !_isAbortSignal(signal)) {
    throw new TypeError("wait: signal must be an AbortSignal or null");
  }
  if (signal?.aborted) {
    return Promise.reject(_getAbortReason(signal));
  }

  return new Promise<void>((resolve, reject) => {
    const finish = (): void => {
      signal?.removeEventListener("abort", abort);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    const abort = (): void => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(signal ? _getAbortReason(signal) : undefined);
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
};
