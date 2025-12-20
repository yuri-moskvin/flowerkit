/**
 * Gets a Date instance without time (hours, minutes, seconds, and milliseconds)
 * @param date{*=}
 * @returns {Date|null}
 * @example
 * // How to get a date without time e.g., hours, minutes, seconds, and milliseconds?
 * const dateWithTime = new Date();
 * console.log(dateWithTime.getMilliseconds()); // => {number}
 * const dateWithoutTime = getPureDate(dateWithTime);
 * console.log(dateWithoutTime.getMilliseconds()); // => 0
 */
export declare const getPureDate: (date?: any | undefined) => Date | null;
