import type { TDateInput } from "../dateValue.d.mts";
type TDateUnit = "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year";
export type TGetDateAddedArgs = Parameters<typeof getDateAdded>;
export type TGetDateAddedReturn = ReturnType<typeof getDateAdded>;
/**
 * Adds a calendar or elapsed-time unit to a date without mutating it.
 * Month and year additions clamp the day to the target month.
 * @param {TDateInput} date Source date
 * @param {number} amount Integer amount to add; may be negative
 * @param {TDateUnit} [unit="day"] Unit
 * @returns {Date} New Date instance
 * @throws {TypeError} getDateAdded: date must be a valid date
 * @throws {TypeError} getDateAdded: amount must be a finite integer
 * @throws {TypeError} getDateAdded: unit is invalid
 * @example
 * getDateAdded(new Date("2024-01-31"), 1, "month"); // 2024-02-29
 * @example
 * // Calculate a session expiration date seven days from its creation
 * const expiresAt = getDateAdded(session.createdAt, 7, "day");
 */
export declare const getDateAdded: (date: TDateInput, amount: number, unit?: TDateUnit) => Date;
export {};
