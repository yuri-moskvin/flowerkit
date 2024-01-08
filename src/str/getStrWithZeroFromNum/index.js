import ow from "ow";

/**
 * Gets a string with leading zero
 * @param num{Number} - source number
 * @param digits{Number=} - number of digits in target string
 * @return {string}
 * @example
 * // How to add a leading zero to a number?
 * const num = 9;
 * const withZero = getStrWithZeroFromNumber(9, 3);
 * console.log(withZero); // => "009"
 */
const getStrWithZeroFromNum = (num, digits = 2) => {

  ow(num, ow.number.not.infinite);
  ow(digits, ow.number.not.infinite);

  const absNum = Math.abs(num);
  const paddedStr = Array(Math.max(digits - String(absNum).length + 1, 0)).join(0) + absNum;
  const isNegative = num < 0;

  return `${isNegative ? "-" : ""}${paddedStr}`;
};

export {
  getStrWithZeroFromNum
};
