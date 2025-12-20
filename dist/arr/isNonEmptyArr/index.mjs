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
const isNonEmptyArr=arr=>Array.isArray(arr)&&arr.length>0;export{isNonEmptyArr};
//# sourceMappingURL=index.mjs.map
