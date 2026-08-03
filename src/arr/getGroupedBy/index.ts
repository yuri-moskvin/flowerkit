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
export const getGroupedBy = <T, TKey extends PropertyKey>(
  arr: T[],
  getKey: (value: T, index: number, array: T[]) => TKey
): Partial<Record<TKey, T[]>> => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getGroupedBy: arr must be an array");
  }
  if (typeof getKey !== "function") {
    throw new TypeError("getGroupedBy: getKey must be a function");
  }

  const result = Object.create(null) as Partial<Record<TKey, T[]>>;
  arr.forEach((value, index, array) => {
    const key = getKey(value, index, array);
    const group = result[key];
    if (group) {
      group.push(value);
    } else {
      result[key] = [ value ];
    }
  });
  return result;
};
