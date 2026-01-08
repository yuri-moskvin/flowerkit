export type TGetRoundedArgs = Parameters<typeof getRounded>;
export type TGetRoundedReturn = ReturnType<typeof getRounded>;
/**
 * Rounds a number to specific decimal places
 * @param {number} num Source number
 * @param {number} [places=2] Decimal places (0..100)
 * @returns {number} Rounded number
 * @throws {TypeError} getRounded: num must be a valid number
 * @throws {RangeError} getRounded: places must be a finite number between 0 and 100
 * @example
 * // How to round number to 4 decimal places?
 * const num = 0.00025;
 * const rounded = getRounded(num, 4);
 * console.log(rounded); // => 0.0003
 */
export declare const getRounded: (num: number, places?: number) => number;
