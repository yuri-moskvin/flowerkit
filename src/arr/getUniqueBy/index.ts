export type TGetUniqueByArgs = Parameters<typeof getUniqueBy>;

export type TGetUniqueByReturn = ReturnType<typeof getUniqueBy>;

/**
 * Returns the first item for every unique selector result.
 * @template T,TKey
 * @param {T[]} arr Source array
 * @param {(value: T, index: number, array: T[]) => TKey} getKey Unique key selector
 * @returns {T[]} New array containing unique items
 * @throws {TypeError} getUniqueBy: arr must be an array
 * @throws {TypeError} getUniqueBy: getKey must be a function
 * @example
 * getUniqueBy([ { id: 1 }, { id: 1 }, { id: 2 } ], (item) => item.id);
 * @example
 * // Remove duplicate products by SKU while preserving the first result
 * const uniqueProducts = getUniqueBy(products, (product) => product.sku);
 */
export const getUniqueBy = <T, TKey>(
  arr: T[],
  getKey: (value: T, index: number, array: T[]) => TKey
): T[] => {
  if (!Array.isArray(arr)) {
    throw new TypeError("getUniqueBy: arr must be an array");
  }
  if (typeof getKey !== "function") {
    throw new TypeError("getUniqueBy: getKey must be a function");
  }

  const keys = new Set<TKey>();
  return arr.filter((value, index, array) => {
    const key = getKey(value, index, array);
    if (keys.has(key)) {
      return false;
    }
    keys.add(key);
    return true;
  });
};
