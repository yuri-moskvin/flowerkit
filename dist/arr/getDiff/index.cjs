Object.defineProperty(exports,"__esModule",{value:true});
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
 */const getDiff=(arr1,arr2)=>{if(!Array.isArray(arr1)||!Array.isArray(arr2))throw new TypeError("getDiff: arr1 and arr2 must be arrays");const all=arr1.concat(arr2);return all.filter(((val,_index,arr)=>arr.indexOf(val)===arr.lastIndexOf(val)))};exports.getDiff=getDiff;
//# sourceMappingURL=index.cjs.map
