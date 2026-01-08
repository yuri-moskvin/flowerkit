export type TGetMaxFromArrArgs = Parameters<typeof getMaxFromArr>;

export type TGetMaxFromArrReturn = ReturnType<typeof getMaxFromArr>;

/**
 * Gets max number from an array of numbers
 * @param {number[]} arr Source array of numbers (must be non-empty)
 * @returns {number} Maximum value
 * @throws {TypeError} getMaxFromArr: expected a non-empty array of numbers
 * @example
 * // How to get max number from Array of numbers?
 * const arr = [ 100, 200, 300 ];
 * const max = getMaxFromArr(arr);
 * console.log(max); // 300
 */
export const getMaxFromArr = (arr: number[]): number => {
  const isValid = Array.isArray(arr)
    && arr.length > 0
    && arr.every((v) => typeof v === "number" && (Number.isFinite(v) || v === Infinity || v === -Infinity));
  if (!isValid) {
    throw new TypeError("getMaxFromArr: expected a non-empty array of numbers");
  }
  return arr.reduce((p, v) => (p > v ? p : v));
};
