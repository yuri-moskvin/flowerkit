import ow from "ow";

/**
 * Gets rounded number to specific decimal places
 * @param num{Number} - source number
 * @param places{Number=} - decimal places
 * @return {number}
 * @example
 * // How to round number to 4 decimal places?
 * const num = 0.00025;
 * const rounded = getRounded(num, 4);
 * console.log(rounded); // => 0.0003
 */
const getRounded = (num, places = 2) => {

  ow(num, ow.number.not.infinite);
  ow(places, ow.optional.number.validate(value => ({
    validator: value >= 0 && value !== Infinity,
    message: () => `Expected value to be positive and not to be Infinity, got ${value}`
  })));

  return +(Math.round(num + "e+" + places) + "e-" + places);

};

export {
  getRounded
};
