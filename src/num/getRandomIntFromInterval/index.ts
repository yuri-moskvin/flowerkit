export type TGetRandomIntFromIntervalArgs = Parameters<typeof getRandomIntFromInterval>;

export type TGetRandomIntFromIntervalReturn = ReturnType<typeof getRandomIntFromInterval>;

/**
 * Gets a random integer between min and max (inclusive)
 * @param {number} [min=1] Min value
 * @param {number} [max=1000000000] Max value
 * @returns {number} Random integer in [min, max]
 * @throws {TypeError} getRandomIntFromInterval: min and max must be finite numbers
 * @throws {RangeError} getRandomIntFromInterval: interval must contain at least one integer
 * @example
 * // How to generate random number between two numbers?
 * const randomNumber = getRandomIntFromInterval(1, 10);
 * console.log(randomNumber >= 1 && randomNumber <= 10); // => true
 * @example
 * // Pick a random promotional banner by its array index
 * const bannerIndex = getRandomIntFromInterval(0, banners.length - 1);
 * const banner = banners[bannerIndex];
 */
export const getRandomIntFromInterval = (min: number = 1, max: number = 1_000_000_000): number => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError("getRandomIntFromInterval: min and max must be finite numbers");
  }

  if (max < min) {
    const t = min;
    min = max;
    max = t;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  const span = (max - min) + 1;
  if (!Number.isFinite(span) || span <= 0) {
    throw new RangeError("getRandomIntFromInterval: interval must contain at least one integer");
  }

  return Math.floor(Math.random() * span + min);
};
