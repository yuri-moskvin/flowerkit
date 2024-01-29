import ow from "ow";

/**
 * Gets min number from Array
 * @param arr{Array} - source Array of numbers
 * @return {number}
 * @example
 * // How to get min number from Array of numbers?
 * const arr = [ 100, 200, 300 ];
 * const min = getMinFromArr(arr);
 * console.log(min); // 100
 */
const getMinFromArr = (arr) => {

  ow(arr, ow.array.validate(value => ({
    validator: value.length && value.every(item => typeof item === "number"),
    message: () => `Array must be non-empty and contains only numbers`
  })));

  return arr.reduce((p, v) => {
    return (p < v ? p : v);
  });
};

export {
  getMinFromArr
};
