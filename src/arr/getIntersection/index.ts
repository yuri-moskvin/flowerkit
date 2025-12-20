/**
 * Gets Array of intersection of two given Arrays
 * @template T
 * @param {Array<T>} arr1 first source Array
 * @param {Array<T>} arr2 second source Array
 * @returns {Array<T>}
 * @throws {TypeError} getIntersection: arr1 and arr2 must be arrays
 * @example
 * // How to get an intersection of two Arrays?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 2, 3, 4, 5 ];
 * const intersection = getIntersection(arr1, arr2);
 * console.log(intersection); // => [ 2, 3 ]
 */
export const getIntersection = <T>(arr1: T[], arr2: T[]): T[] => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError("getIntersection: arr1 and arr2 must be arrays");
  }
  return [ ...arr1 ].filter((val) => arr2.includes(val));
};
