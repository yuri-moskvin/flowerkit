export type TGetClampedNumArgs = Parameters<typeof getClampedNum>;

export type TGetClampedNumReturn = ReturnType<typeof getClampedNum>;

/**
 * Restricts a number to an inclusive range.
 * @param {number} num Source number
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number} Clamped number
 * @throws {TypeError} getClampedNum: arguments must be finite numbers
 * @throws {RangeError} getClampedNum: min must be less than or equal to max
 * @example
 * getClampedNum(12, 0, 10); // 10
 * @example
 * // Clamp upload progress to a valid percentage between 0 and 100
 * const progress = getClampedNum((uploadedBytes / totalBytes) * 100, 0, 100);
 */
export const getClampedNum = (num: number, min: number, max: number): number => {
  if (![ num, min, max ].every((value) => typeof value === "number" && Number.isFinite(value))) {
    throw new TypeError("getClampedNum: arguments must be finite numbers");
  }
  if (min > max) {
    throw new RangeError("getClampedNum: min must be less than or equal to max");
  }
  return Math.min(Math.max(num, min), max);
};
