import { isValidDate } from "../isValidDate/index.ts";

export type TGetPureDateArgs = Parameters<typeof getPureDate>;

export type TGetPureDateReturn = ReturnType<typeof getPureDate>;

/**
 * Gets a new Date instance without time (hours, minutes, seconds, and milliseconds)
 * @param date{*=}
 * @returns {Date|null} New Date instance or null for an invalid value
 * @example
 * // How to get a date without time e.g., hours, minutes, seconds, and milliseconds?
 * const dateWithTime = new Date();
 * console.log(dateWithTime.getMilliseconds()); // => {number}
 * const dateWithoutTime = getPureDate(dateWithTime);
 * console.log(dateWithoutTime.getMilliseconds()); // => 0
 * @example
 * // Compare calendar dates while ignoring their time values
 * const isDueToday = getPureDate(task.dueAt)?.getTime()
 *   === getPureDate(new Date())?.getTime();
 */
export const getPureDate = (date: any | undefined = new Date()): Date | null => {
  const convertedDate = isValidDate(date)
    ? new Date((date as Date).getTime())
    : new Date(date);
  if (!isValidDate(convertedDate)) {
    return null;
  }
  convertedDate.setHours(0, 0, 0, 0);
  return convertedDate;
};
