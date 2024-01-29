/**
 * Gets all values inside an object by the specified key, including deeply nested objects
 * @param obj{Object} - source object
 * @param prop{String} - specified key to find
 * @return {Array}
 * @example
 * // How to get all duplicate key values inside object?
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
 * getAllSamePropsFromObj(myObj, "a") // [ "value 1", 1, "value 3", "value 4" ]
 */
export function getAllSamePropsFromObj(obj: any, prop: string): any[];
//# sourceMappingURL=index.d.ts.map