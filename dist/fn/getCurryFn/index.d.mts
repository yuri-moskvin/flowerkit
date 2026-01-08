export type TGetCurryFnArgs = Parameters<typeof getCurryFn>;
export type TGetCurryFnReturn = ReturnType<typeof getCurryFn>;
/**
 * Curries a function, transforming it into a sequence of unary functions.
 * Collects arguments one by one until `arity` is reached, then invokes `fn`.
 *
 * @template {(...args: any[]) => any} T
 * @param {T} fn Function to curry
 * @param {number} [arity=fn.length] Number of arguments to collect before invoking
 * @returns {((arg: Parameters<T>[0]) => ReturnType<T> | any) & ((...args: Parameters<T>) => ReturnType<T>)}
 * @throws {TypeError} getCurryFn: fn must be a function
 * @throws {TypeError} getCurryFn: arity must be a non-negative integer
 *
 * @example
 * function sum(a: number, b: number) { return a + b; }
 * const curried = getCurryFn(sum);
 * curried(1)(2); // 3
 */
export declare const getCurryFn: <T extends (...args: any[]) => any>(fn: T, arity?: number) => ((arg: Parameters<T>[0]) => ReturnType<T> | any) & ((...args: Parameters<T>) => ReturnType<T>);
