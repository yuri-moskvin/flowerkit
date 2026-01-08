export type TGetDiffArgs = Parameters<typeof getDiff>;
export type TGetDiffReturn = ReturnType<typeof getDiff>;
/**
 * Gets an Array of difference between two given Arrays
 * @template T
 * @param {Array<T>} arr1 first source Array
 * @param {Array<T>} arr2 second source Array
 * @returns {Array<T>}
 * @throws {TypeError} getDiff: arr1 and arr2 must be arrays
 * @example
 * // How to get the difference between two arrays?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 3, 4, 5, 6 ];
 * const diff = getDiff(arr1, arr2);
 * console.log(diff); // => [ 1, 2, 4, 5, 6 ]
 */
export declare const getDiff: <T>(arr1: T[], arr2: T[]) => T[];
