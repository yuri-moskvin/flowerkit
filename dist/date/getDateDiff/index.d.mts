import type { TDateInput } from "../dateValue.d.mts";
type TDateDiffUnit = "millisecond" | "second" | "minute" | "hour" | "day" | "week";
export type TGetDateDiffArgs = Parameters<typeof getDateDiff>;
export type TGetDateDiffReturn = ReturnType<typeof getDateDiff>;
/**
 * Gets the signed elapsed-time difference (`left - right`) in a selected unit.
 * @param {TDateInput} left Left date
 * @param {TDateInput} right Right date
 * @param {TDateDiffUnit} [unit="millisecond"] Unit
 * @returns {number} Signed difference, which may be fractional
 * @throws {TypeError} getDateDiff: dates must be valid
 * @throws {TypeError} getDateDiff: unit is invalid
 * @example
 * getDateDiff("2024-01-03", "2024-01-01", "day"); // 2
 * @example
 * // Calculate the number of hours remaining before a deadline
 * const hoursRemaining = getDateDiff(deadline, new Date(), "hour");
 */
export declare const getDateDiff: (left: TDateInput, right: TDateInput, unit?: TDateDiffUnit) => number;
export {};
