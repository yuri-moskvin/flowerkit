/**
 * Gets all values inside an object by the specified key, including deeply nested objects
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
 */
const getAllSamePropsFromObj=(obj,prop)=>{if(typeof prop!=="string"||!prop)throw new TypeError("getAllSamePropsFromObj: prop must be a non-empty string");if(obj===null||typeof obj!=="object")throw new TypeError("getAllSamePropsFromObj: obj must be an object");const res=[];JSON.stringify(obj,((key,value)=>{if(key===prop)res.push(value);return value}));return res};export{getAllSamePropsFromObj};
//# sourceMappingURL=index.mjs.map
