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
 * @returns {(...args: Parameters<T>) => void}
 * @throws {TypeError} getDebouncedFn: cb must be a function
 * @throws {TypeError} getDebouncedFn: wait must be a non-negative finite number
 * @throws {TypeError} getDebouncedFn: isImmediate must be a boolean
 *
 * @example
 * const fn = getDebouncedFn((x: number) => console.log(x), 1000);
 * fn(1);
 */
export declare const getDebouncedFn: <T extends (...args: any[]) => any>(cb: T, wait?: number, isImmediate?: boolean) => ((...args: Parameters<T>) => void);
