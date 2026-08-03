import { getDateValue } from "../dateValue.ts";
import type { TDateInput } from "../dateValue.ts";

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
export const getDateDiff = (
  left: TDateInput,
  right: TDateInput,
  unit: TDateDiffUnit = "millisecond"
): number => {
  const multipliers: Record<TDateDiffUnit, number> = {
    millisecond: 1,
    second: 1_000,
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
    week: 604_800_000,
  };
  if (!Object.prototype.hasOwnProperty.call(multipliers, unit)) {
    throw new TypeError(`getDateDiff: unit must be one of: ${Object.keys(multipliers).join(", ")}`);
  }
  const leftDate = getDateValue(left, getDateDiff.name);
  const rightDate = getDateValue(right, getDateDiff.name);
  return (leftDate.getTime() - rightDate.getTime()) / multipliers[unit];
};
