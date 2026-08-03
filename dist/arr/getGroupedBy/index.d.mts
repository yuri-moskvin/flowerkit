export type TGetGroupedByArgs = Parameters<typeof getGroupedBy>;
export type TGetGroupedByReturn = ReturnType<typeof getGroupedBy>;
/**
 * Groups array items by a key returned from a selector.
 * @template T,TKey
 * @param {T[]} arr Source array
 * @param {(value: T, index: number, array: T[]) => TKey} getKey Group key selector
 * @returns {Partial<Record<TKey, T[]>>} Null-prototype object containing grouped items
 * @throws {TypeError} getGroupedBy: arr must be an array
 * @throws {TypeError} getGroupedBy: getKey must be a function
 * @example
 * getGroupedBy([ { type: "a" }, { type: "b" } ], (item) => item.type);
 * @example
 * // Group orders by status before rendering dashboard columns
 * const ordersByStatus = getGroupedBy(orders, (order) => order.status);
 * const pendingOrders = ordersByStatus.pending ?? [];
 */
export declare const getGroupedBy: <T, TKey extends PropertyKey>(arr: T[], getKey: (value: T, index: number, array: T[]) => TKey) => Partial<Record<TKey, T[]>>;
