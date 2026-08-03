export type TGetRoundedArgs = Parameters<typeof getRounded>;

export type TGetRoundedReturn = ReturnType<typeof getRounded>;

/**
 * Rounds a number to specific decimal places
 * @param {number} num Source number
 * @param {number} [places=2] Decimal places (0..100)
 * @returns {number} Rounded number
 * @throws {TypeError} getRounded: num must be a finite number
 * @throws {RangeError} getRounded: places must be an integer between 0 and 100
 * @example
 * // How to round number to 4 decimal places?
 * const num = 0.00025;
 * const rounded = getRounded(num, 4);
 * console.log(rounded); // => 0.0003
 * @example
 * // Round a calculated order total to two decimal places
 * const total = getRounded(subtotal + (subtotal * taxRate), 2);
 */
export const getRounded = (num: number, places: number = 2): number => {
  if (!Number.isFinite(num)) {
    throw new TypeError("getRounded: num must be a finite number");
  }
  if (!Number.isInteger(places) || places < 0 || places > 100) {
    throw new RangeError("getRounded: places must be an integer between 0 and 100");
  }

  const shift = `e+${places}`;
  const unshift = `e-${places}`;
  return Number((Math.round(Number(String(num) + shift)) + unshift));
};
