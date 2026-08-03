import type { TDateInput } from "../dateValue.d.mts";
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
export declare const getDateFormatted: (date: TDateInput, locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) => string;
