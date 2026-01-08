export type TGetCopyOfObjArgs = Parameters<typeof getCopyOfObj>;

export type TGetCopyOfObjReturn = ReturnType<typeof getCopyOfObj>;

/**
 * Gets a deep copy/clone of an object/array without a reference to the original object
 * @param obj{Object|Array} source object (array)
 * @returns {Object|Array}
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
 * @example
 * // How to make a deep clone of an object?
 * const originalObject = {
 *   value: 1,
 * }
 * const copy = getCopyOfObj(originalObject);
 * copy.value = 2;
 * console.log(originalObject.value === copy.value) // false
 */
export const getCopyOfObj = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object" || obj instanceof Date) {
    return obj;
  }

  const objCopy: any = Array.isArray(obj) ? [] : {};

  return Object.keys(obj as Record<string, unknown>).reduce((nestedObj: any, key) => {
    nestedObj[key] = getCopyOfObj((obj as Record<string, unknown>)[key] as unknown);
    return nestedObj;
  }, objCopy);
};
