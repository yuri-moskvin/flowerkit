import { isValidDate } from "../isValidDate/index.ts";

export type TGetPureDateArgs = Parameters<typeof getPureDate>;

export type TGetPureDateReturn = ReturnType<typeof getPureDate>;

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
export const getPureDate = (date: any | undefined = new Date()): Date | null => {
  const getWithoutTime = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };
  if (isValidDate(date)) {
    return getWithoutTime(date);
  } else {
    const convertedDare = new Date(date);
    if (isValidDate(convertedDare)) {
      return getPureDate(convertedDare);
    } else {
      return null;
    }
  }
};
