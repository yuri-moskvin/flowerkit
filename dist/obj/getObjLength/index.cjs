Object.defineProperty(exports,"__esModule",{value:true});
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
 */const getObjLength=(obj={})=>{if(Array.isArray(obj))return obj.length;if(obj===null||typeof obj!=="object")throw new TypeError("getObjLength: obj must be an object or array");return Object.keys(obj).length};exports.getObjLength=getObjLength;
//# sourceMappingURL=index.cjs.map
