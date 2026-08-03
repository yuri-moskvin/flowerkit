export type TGetAllSamePropsFromObjArgs = Parameters<typeof getAllSamePropsFromObj>;

export type TGetAllSamePropsFromObjReturn = ReturnType<typeof getAllSamePropsFromObj>;

/**
 * Gets all values inside an object by the specified key, including deeply nested and circular objects.
 * @template T
 * @param {Record<string, unknown>} obj Source object (can be nested)
 * @param {string} prop Property name to collect values for
 * @returns {T[]} Collected values
 * @throws {TypeError} getAllSamePropsFromObj: prop must be a non-empty string
 * @throws {TypeError} getAllSamePropsFromObj: obj must be an object
 * @example
 * // How to get all duplicate key values inside an object?
 * const myObj = {
 *   someProp1: {
 *     a: "value 1",
 *     b: 2,
 *     c: 3,
 *     d: {
 *       a: 1,
 *       b: 2
 *     }
 *   },
 *   someProp2: {
 *     a: "value 3",
 *     b: 2,
 *     c: {
 *       a: "value 4"
 *     }
 *   }
 * }
 * getAllSamePropsFromObj<string | number>(myObj, "a") // [ "value 1", 1, "value 3", "value 4" ]
 * @example
 * // Collect every category id from a nested navigation tree
 * const categoryIds = getAllSamePropsFromObj<string>(navigation, "categoryId");
 */
export const getAllSamePropsFromObj = <T = unknown>(obj: unknown, prop: string): T[] => {
  if (typeof prop !== "string" || !prop) {
    throw new TypeError("getAllSamePropsFromObj: prop must be a non-empty string");
  }
  if (obj === null || typeof obj !== "object") {
    throw new TypeError("getAllSamePropsFromObj: obj must be an object");
  }
  const res: T[] = [];
  const ancestors = new WeakSet<object>();
  const visit = (value: unknown): void => {
    if (value === null || typeof value !== "object" || ancestors.has(value)) {
      return;
    }
    ancestors.add(value);
    Object.keys(value).forEach((key) => {
      const nestedValue = (value as Record<string, unknown>)[key];
      if (key === prop) {
        res.push(nestedValue as T);
      }
      visit(nestedValue);
    });
    ancestors.delete(value);
  };

  visit(obj);
  return res;
};
