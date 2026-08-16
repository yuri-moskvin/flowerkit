export type TArrSortDirection = "asc" | "desc";
export type TArrSortNulls = "first" | "last";
export type TArrSortValue = bigint | boolean | Date | null | number | string | undefined;
export type TGetArrSortedByOptions<TValue extends TArrSortValue> = {
    compare?: (left: TValue, right: TValue) => number;
    direction?: TArrSortDirection;
    nulls?: TArrSortNulls;
};
export type TGetArrSortedByArgs = Parameters<typeof getArrSortedBy>;
export type TGetArrSortedByReturn = ReturnType<typeof getArrSortedBy>;
/**
 * Returns a stable, sorted copy of an array using a value selector.
 * Nullish values, `NaN`, and invalid dates are placed according to `nulls`.
 * @template T,TValue
 * @param {readonly T[]} arr Source array
 * @param {(value: T, index: number, array: readonly T[]) => TValue} getValue Sort value selector
 * @param {TGetArrSortedByOptions<TValue>} [options={}] Direction, empty-value placement, and comparator
 * @returns {T[]} Stable sorted copy
 * @throws {TypeError} getArrSortedBy: arguments are invalid
 * @example
 * const productsByPrice = getArrSortedBy(products, (product) => product.price, {
 *   direction: "desc",
 * });
 * @example
 * // Sort localized names while keeping missing names at the end
 * const collator = new Intl.Collator("ru-RU", { sensitivity: "base" });
 * const usersByName = getArrSortedBy(users, (user) => user.name, {
 *   compare: collator.compare,
 *   nulls: "last",
 * });
 */
export declare const getArrSortedBy: <T, TValue extends TArrSortValue>(arr: readonly T[], getValue: (value: T, index: number, array: readonly T[]) => TValue, options?: TGetArrSortedByOptions<TValue>) => T[];
