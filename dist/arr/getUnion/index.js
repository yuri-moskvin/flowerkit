import ow from"ow";
/**
 * Gets union Array of two given Arrays
 * @param arr1{Array} - first source Array
 * @param arr2{Array} - sound source Array
 * @return {Array}
 * @example
 * // How to merge two arrays in JavaScript and de-duplicate items?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 2, 3, 4, 5 ];
 * const union = getUnion(arr1, arr2);
 * console.log(union); // => [ 1, 2, 3, 4, 5 ];
 */const getUnion=(arr1,arr2)=>{ow(arr1,ow.array);ow(arr2,ow.array);return[...new Set([...arr1,...arr2])]};export{getUnion};
//# sourceMappingURL=index.js.map
