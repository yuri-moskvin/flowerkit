/**
 * Check if an object is non-empty array
 * @param arr{*}
 * @return {boolean}
 * @example
 * // How to check if array is valid (non-empty)?
 * const myArr = [ 1, 2, 3 ];
 * console.log(isNonEmptyArr(myArr)); // => true
 * const myObj = "string";
 * console.log(isNonEmptyArr(myObj)); // => false
 */
const isNonEmptyArr=arr=>Array.isArray(arr)&&!!arr?.length;export{isNonEmptyArr};
//# sourceMappingURL=index.js.map
