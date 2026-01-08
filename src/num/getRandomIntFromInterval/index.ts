export type TGetRandomIntFromIntervalArgs = Parameters<typeof getRandomIntFromInterval>;

export type TGetRandomIntFromIntervalReturn = ReturnType<typeof getRandomIntFromInterval>;

/**
 * Gets a random integer between min and max (inclusive)
 * @param {number} [min=1] Min value
 * @param {number} [max=1000000000] Max value
 * @returns {number} Random integer in [min, max]
 * @throws {TypeError} getRandomIntFromInterval: min and max must be numbers
 * @example
 * // How to generate random number between two numbers?
 * const randomNumber = getRandomIntFromInterval(1, 10);
 * console.log(randomNumber >= 1 && randomNumber <= 10); // => true
 */
export const getRandomIntFromInterval = (min: number = 1, max: number = 1_000_000_000): number => {
  if (typeof min !== "number" || typeof max !== "number" || Number.isNaN(min) || Number.isNaN(max)) {
    throw new TypeError("getRandomIntFromInterval: min and max must be numbers");
  }

  min = Math.round(min);
  max = Math.round(max);

  if (max < min) {
    const t = min;
    min = max;
    max = t;
  }

  const span = (max - min) + 1;
  if (!Number.isFinite(span) || span <= 0) {
    return min;
  }

  return Math.floor(Math.random() * span + min);
};
