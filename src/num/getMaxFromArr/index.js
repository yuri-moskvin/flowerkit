import ow from "ow";

/**
 * Gets max number from Array
 * @param arr{Array} - source Array of numbers
 * @return {number}
 * @example
 * // How to get max number from Array of numbers?
 * const arr = [ 100, 200, 300 ];
 * const max = getMaxFromArr(arr);
 * console.log(max); // 300
 */
const getMaxFromArr = (arr) => {

  ow(arr, ow.array.validate(value => ({
    validator: value.length && value.every(item => typeof item === "number"),
    message: () => `Array must be non-empty and contains only numbers`
  })));

  return arr.reduce((p, v) => {
    return (p > v ? p : v);
  });
};

export {
  getMaxFromArr
};
