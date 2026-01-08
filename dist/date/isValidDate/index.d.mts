export type TIsValidDateArgs = Parameters<typeof isValidDate>;
export type TIsValidDateReturn = ReturnType<typeof isValidDate>;
/**
 * Check if a Date instance is valid
 * @param date{*}
 * @returns {boolean}
 * @example
 * // How to detect an "invalid date" Date instance in JavaScript?
 * const wrongDate = new Date("invalid_date");
 * console.log(isValidDate(wrongDate)); // => false
 *
 * const validDate = new Date(0);
 * console.log(isValidDate(validDate)); // => true
 */
export declare const isValidDate: (date: any) => boolean;
