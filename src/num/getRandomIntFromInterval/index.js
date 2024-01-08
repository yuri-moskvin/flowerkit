import ow from "ow";

/**
 * Gets random integer between min and max value
 * @param min{Number=} - min value
 * @param max{Number=} - max value
 * @return {number}
 * @example
 * // How to generate random number between two numbers?
 * const randomNumber = getRandomIntFromInterval(1, 10);
 * console.log(randomNumber >= 1 && randomNumber <= 10); // => true
 */
const getRandomIntFromInterval = (min = 1, max = 1000_000_000) => {

  ow(min, ow.optional.number.not.infinite);
  ow(max, ow.optional.number.not.infinite);

  min = Math.round(min);
  max = Math.round(max);

  if (max < min) {
    let t = min;
    min = max;
    max = t;
  }

  return Math.floor(Math.random() * ( max + 1 - min) + min);
};

export {
  getRandomIntFromInterval
};
