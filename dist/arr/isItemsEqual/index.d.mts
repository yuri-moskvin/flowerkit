/**
 * Checks if items of given Array is same
 * @template T
 * @param {Array<T>} arr source Array
 * @returns {boolean}
 * @example
 * // How to check if all records are equal in an array?
 * const arr = [ 1, 1, 1 ];
 * const isSame = isItemsEqual(arr);
 * console.log(isSame); // => true
 */
export declare const isItemsEqual: <T>(arr: T[]) => boolean;
