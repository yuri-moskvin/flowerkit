/**
 * Gets a Map from object
 * @template K,V
 * @param {Record<string, V>} [obj={}] Source object
 * @param {(key: string, value: V, index: number) => boolean} [getFiltered] Filter function for each entry
 * @returns {Map<K, V>} Resulting map
 * @throws {TypeError} getMapFromObj: obj must be a plain object
 * @throws {TypeError} getMapFromObj: getFiltered must be a function
 * @example
 * // How to convert an object to ES6 Map and pass only number values?
 * const sourceObj = { hello: "world", goodbye: 1 };
 * const targetMap = getMapFromObj<string, number>(sourceObj as any, (_k, v) => typeof v === "number");
 * console.log(targetMap); // => Map { "goodbye" => 1 }
 */
const getMapFromObj=(obj={},getFiltered=()=>true)=>{if(obj===null||typeof obj!=="object"||Array.isArray(obj))throw new TypeError("getMapFromObj: obj must be a plain object");if(typeof getFiltered!=="function")throw new TypeError("getMapFromObj: getFiltered must be a function");const map=new Map;Object.entries(obj).forEach((([key,value],index)=>{if(getFiltered(key,value,index))map.set(key,value)}));return map};export{getMapFromObj};
//# sourceMappingURL=index.mjs.map
