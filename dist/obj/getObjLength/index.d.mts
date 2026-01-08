export type TGetObjLengthArgs = Parameters<typeof getObjLength>;
export type TGetObjLengthReturn = ReturnType<typeof getObjLength>;
/**
 * Gets a length of given object
 * @param {Record<string, unknown>|unknown[]} [obj={}] Source Object or Array
 * @returns {number} Number of keys or array length
 * @throws {TypeError} getObjLength: obj must be an object or array
 * @example
 * // How to count number of object keys?
 * const obj = { key1: "value1", key2: "value2" };
 * const objLength = getObjLength(obj);
 * console.log(objLength); // => 2
 */
export declare const getObjLength: (obj?: Record<string, unknown> | unknown[]) => number;
