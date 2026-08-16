import { _getDateValue } from "../_dateValue/index.ts";
import type { TDateInput } from "../_dateValue/index.ts";

export type TGetDateFormattedArgs = Parameters<typeof getDateFormatted>;

export type TGetDateFormattedReturn = ReturnType<typeof getDateFormatted>;

/**
 * Formats a date using `Intl.DateTimeFormat`.
 * @param {TDateInput} date Source date
 * @param {Intl.LocalesArgument} [locales] Locale or locales
 * @param {Intl.DateTimeFormatOptions} [options={}] Date format options
 * @returns {string} Localized date
 * @throws {TypeError} getDateFormatted: date must be a valid date
 * @example
 * getDateFormatted(new Date("2024-01-02T00:00:00Z"), "en-US", { timeZone: "UTC" });
 * @example
 * // Format an order date for a Russian storefront
 * const label = getDateFormatted(order.createdAt, "ru-RU", {
 *   dateStyle: "long",
 *   timeZone: "Europe/Moscow",
 * });
 */
export const getDateFormatted = (
  date: TDateInput,
  locales?: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("getDateFormatted: options must be a plain object");
  }
  return new Intl.DateTimeFormat(locales, options).format(_getDateValue(date, getDateFormatted.name));
};
