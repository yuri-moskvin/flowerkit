export type TMemoizedFn<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => ReturnType<T>) & {
    clear: () => void;
};
export type TGetMemoizedFnArgs = Parameters<typeof getMemoizedFn>;
export type TGetMemoizedFnReturn = ReturnType<typeof getMemoizedFn>;
/**
 * Memoizes a function by receiver and argument identity and exposes a cache reset method.
 * @template T
 * @param {T} fn Source function
 * @returns {TMemoizedFn<T>} Memoized function
 * @throws {TypeError} getMemoizedFn: fn must be a function
 * @example
 * const doubled = getMemoizedFn((value: number) => value * 2);
 * doubled(2); // 4
 * doubled.clear();
 * @example
 * // Cache an expensive product filter until its argument identities change
 * const filterProducts = getMemoizedFn((items, filters) => {
 *   return items.filter((item) => filters.includes(item.category));
 * });
 */
export declare const getMemoizedFn: <T extends (...args: any[]) => any>(fn: T) => TMemoizedFn<T>;
