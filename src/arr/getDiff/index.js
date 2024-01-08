import ow from "ow";

/**
 * Gets an Array of difference between two given Arrays
 * @param arr1{Array} - first source Array
 * @param arr2{Array} - second source Array
 * @return {Array}
 * @example
 * // How to get the difference between two arrays?
 * const arr1 = [ 1, 2, 3 ];
 * const arr2 = [ 3, 4, 5, 6 ];
 * const diff = getDiff(arr1, arr2);
 * console.log(diff); // => [ 1, 2, 4, 5, 6 ]
 */
const getDiff = (arr1, arr2) => {

  ow(arr1, ow.array);
  ow(arr2, ow.array);

  return arr1.concat(arr2).filter((val, index, arr) => {
    return arr.indexOf(val) === arr.lastIndexOf(val);
  });
};

export {
  getDiff
};
