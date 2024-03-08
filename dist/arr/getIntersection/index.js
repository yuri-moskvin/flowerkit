import ow from"ow";
/**
 * Gets Array of intersection of two given Arrays
 * @param arr1{Array} - first source Array
 * @param arr2{Array} - second source Array
 * @return {Array}
 * @example
 * // How to get intersection of two Arrays?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 2, 3, 4, 5 ];
 * const intersection = getIntersection(arr1, arr2);
 * console.log(intersection); // => [ 2, 3 ]
 */const getIntersection=(arr1,arr2)=>{ow(arr1,ow.array);ow(arr2,ow.array);return[...arr1].filter((val=>arr2.includes(val)))};export{getIntersection};
//# sourceMappingURL=index.js.map
