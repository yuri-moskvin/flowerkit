/**
 * Gets union Array of two given Arrays
 * @template T
 * @param {Array<T>} arr1 first source Array
 * @param {Array<T>} arr2 sound source Array
 * @returns {Array<T>}
 * @throws {TypeError} getUnion: arr1 and arr2 must be arrays
 * @example
 * // How to merge two arrays in JavaScript and deduplicate items?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 2, 3, 4, 5 ];
 * const union = getUnion(arr1, arr2);
 * console.log(union); // => [ 1, 2, 3, 4, 5 ];
 */
export declare const getUnion: <T>(arr1: T[], arr2: T[]) => T[];
