import ow from "ow";
import { getRandomIntFromInterval } from "../../num/getRandomIntFromInterval/index.js";

/**
 * Gets unique string ID.
 * @param length{Number=} - length of ID
 * @return {string}
 * @example
 * // How to generate unique string ID?
 * const uniqueId = getId(100);
 * console.log(uniqueId.length); // 100
 */
const getId = (length = getRandomIntFromInterval(8, 16)) => {

  ow(length, ow.optional.number.validate(value => ({
    validator: value > 0 && value !== Infinity,
    message: `Expected value to be greater than 0 and not to be Infinity, got ${value}`
  })));

  const str = new Array(3)
    .fill("")
    .map(() => Math.random().toString(36).substring(2));

  const counter = Math.floor(Math.random() * 10 ** 8);

  return `${str.join("")}}${counter}`.substring(0, length);
};

export {
  getId
};
