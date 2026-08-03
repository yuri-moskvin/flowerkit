export type TIsObjEmptyArgs = Parameters<typeof isObjEmpty>;

export type TIsObjEmptyReturn = ReturnType<typeof isObjEmpty>;

/**
 * Checks if an object is empty
 * @param {Record<string, unknown>|unknown[]} obj Source object or array
 * @returns {boolean} True if empty
 * @throws {TypeError} isObjEmpty: obj must be an object or array
 * @example
 * // How to check if an object is empty?
 * const obj = {};
 * const isEmpty = isObjEmpty(obj);
 * console.log(isEmpty); // => true
 * @example
 * // Show an empty state when no search filters are selected
 * const hasActiveFilters = !isObjEmpty(selectedFilters);
 */
export const isObjEmpty = (obj: unknown): boolean => {
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("isObjEmpty: obj must be an object or array");
  }
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  const prototype = Object.getPrototypeOf(obj);
  return (prototype === Object.prototype || prototype === null) && Object.keys(obj).length === 0;
};
