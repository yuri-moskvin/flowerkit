import { _getDateValue } from "../_dateValue/index.ts";
import type { TDateInput } from "../_dateValue/index.ts";

type TDateUnit = "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

export type TGetDateAddedArgs = Parameters<typeof getDateAdded>;

export type TGetDateAddedReturn = ReturnType<typeof getDateAdded>;

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

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
export const getDateAdded = (
  date: TDateInput,
  amount: number,
  unit: TDateUnit = "day"
): Date => {
  if (!Number.isInteger(amount) || !Number.isFinite(amount)) {
    throw new TypeError("getDateAdded: amount must be a finite integer");
  }
  const units: TDateUnit[] = [
    "millisecond", "second", "minute", "hour", "day", "week", "month", "year",
  ];
  if (!units.includes(unit)) {
    throw new TypeError(`getDateAdded: unit must be one of: ${units.join(", ")}`);
  }

  const result = _getDateValue(date, getDateAdded.name);
  const multipliers: Partial<Record<TDateUnit, number>> = {
    millisecond: 1,
    second: 1_000,
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
    week: 604_800_000,
  };
  const multiplier = multipliers[unit];
  if (multiplier !== undefined) {
    result.setTime(result.getTime() + amount * multiplier);
    return result;
  }

  const originalDay = result.getDate();
  result.setDate(1);
  if (unit === "month") {
    result.setMonth(result.getMonth() + amount);
  } else {
    result.setFullYear(result.getFullYear() + amount);
  }
  result.setDate(Math.min(originalDay, getDaysInMonth(result.getFullYear(), result.getMonth())));
  return result;
};
