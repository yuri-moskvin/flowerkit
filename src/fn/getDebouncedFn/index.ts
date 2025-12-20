/**
 * Returns a debounced version of a function that delays invoking `cb`
 * until after `wait` ms have elapsed since the last call.
 * Optionally invokes on the leading edge when `isImmediate` is true.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} cb Function to debounce
 * @param {number} [wait=250] Delay in milliseconds
 * @param {boolean} [isImmediate=false] If `true`, invoke on the leading edge
 * @returns {(...args: Parameters<T>) => void}
 * @throws {TypeError} getDebouncedFn: cb must be a function
 * @throws {TypeError} getDebouncedFn: wait must be a non-negative finite number
 * @throws {TypeError} getDebouncedFn: isImmediate must be a boolean
 *
 * @example
 * const fn = getDebouncedFn((x: number) => console.log(x), 1000);
 * fn(1);
 */
export const getDebouncedFn = <T extends (...args: any[]) => any>(
  cb: T,
  wait: number = 250,
  isImmediate: boolean = false
): ((...args: Parameters<T>) => void) => {
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
  return function executedFunction(this: unknown, ...args: Parameters<T>): void {
    const context = this;
    const later = (): void => {
      timeout = null;
      if (!isImmediate) {
        cb.apply(context as any, args);
      }
    };
    const callNow = isImmediate && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
    if (callNow) {
      cb.apply(context as any, args);
    }
  };
};
