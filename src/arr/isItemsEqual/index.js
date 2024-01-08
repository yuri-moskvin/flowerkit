import ow from "ow";

/**
 * Checks if items of given Array is same
 * @param arr{Array} - source Array
 * @return {boolean}
 * @example
 * // How to check if all records are equal in array?
 * const arr = [ 1, 1, 1 ];
 * const isSame = isItemsEqual(arr);
 * console.log(isSame); // => true
 */
const isItemsEqual = (arr) => {

  ow(arr, ow.array);

  return arr.every(val => val === arr[0]);
};

export {
  isItemsEqual
};
