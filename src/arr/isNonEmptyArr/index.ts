export type TIsNonEmptyArrArgs = Parameters<typeof isNonEmptyArr>;

export type TIsNonEmptyArrReturn = ReturnType<typeof isNonEmptyArr>;

/**
 * Check if an object is non-empty array
 * @template T
 * @param {unknown} arr
 * @returns {arr is Array<T>}
 * @example
 * // How to check if an array is valid (non-empty)?
 * const myArr = [ 1, 2, 3 ];
 * console.log(isNonEmptyArr(myArr)); // => true
 * const myObj = "string";
 * console.log(isNonEmptyArr(myObj)); // => false
 */
export const isNonEmptyArr = <T>(arr: unknown): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0;
};
