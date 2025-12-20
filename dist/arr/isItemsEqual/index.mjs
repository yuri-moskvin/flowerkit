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
const isItemsEqual=arr=>{if(arr.length===0)return true;const first=arr[0];return arr.every((val=>val===first))};export{isItemsEqual};
//# sourceMappingURL=index.mjs.map
