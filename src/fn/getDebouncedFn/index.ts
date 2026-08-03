export type TDebouncedFn<T extends (...args: any[]) => any> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
  pending: () => boolean;
};

export type TGetDebouncedFnArgs = Parameters<typeof getDebouncedFn>;

export type TGetDebouncedFnReturn = ReturnType<typeof getDebouncedFn>;

/**
 * Returns a debounced version of a function that delays invoking `cb`
 * until after `wait` ms have elapsed since the last call.
 * Optionally invokes on the leading edge when `isImmediate` is true.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} cb Function to debounce
 * @param {number} [wait=250] Delay in milliseconds
 * @param {boolean} [isImmediate=false] If `true`, invoke on the leading edge
 * @returns {TDebouncedFn<T>} Debounced function with cancel, flush, and pending controls
 * @throws {TypeError} getDebouncedFn: cb must be a function
 * @throws {TypeError} getDebouncedFn: wait must be a non-negative finite number
 * @throws {TypeError} getDebouncedFn: isImmediate must be a boolean
 *
 * @example
 * const fn = getDebouncedFn((x: number) => console.log(x), 1000);
 * fn(1);
 * @example
 * // Debounce autocomplete requests and cancel the pending call on unmount
 * const search = getDebouncedFn((query: string) => loadSuggestions(query), 300);
 * input.addEventListener("input", () => search(input.value));
 * search.cancel();
 */
export const getDebouncedFn = <T extends (...args: any[]) => any>(
  cb: T,
  wait: number = 250,
  isImmediate: boolean = false
): TDebouncedFn<T> => {
  if (typeof cb !== "function") {
    throw new TypeError("getDebouncedFn: cb must be a function");
  }
  if (typeof wait !== "number" || !Number.isFinite(wait) || wait < 0) {
    throw new TypeError("getDebouncedFn: wait must be a non-negative finite number");
  }
  if (typeof isImmediate !== "boolean") {
    throw new TypeError("getDebouncedFn: isImmediate must be a boolean");
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
    result = cb.apply(context, args) as ReturnType<T>;
    return result;
  };
  const debounced = function executedFunction(
    this: unknown,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    lastArgs = args;
    lastContext = this;
    const later = (): void => {
      timeout = null;
      if (!isImmediate) {
        invoke();
      } else {
        lastArgs = null;
        lastContext = undefined;
      }
    };
    const callNow = isImmediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
    if (callNow) {
      return invoke();
    }
    return result;
  } as TDebouncedFn<T>;

  debounced.cancel = (): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = null;
    lastArgs = null;
    lastContext = undefined;
  };
  debounced.flush = (): ReturnType<T> | undefined => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
      return invoke();
    }
    return result;
  };
  debounced.pending = (): boolean => timeout !== null;

  return debounced;
};
