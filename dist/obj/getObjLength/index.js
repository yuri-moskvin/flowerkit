import ow from"ow";
/**
 * Gets a length of given object
 * @param obj{Object|Array=} - source Object or Array
 * @return {number}
 * @example
 * // How to count number of object keys?
 * const obj = {
 *   key1: "value1",
 *   key2: "value2"
 * };
 * const objLength = getObjLength(obj);
 * console.log(objLength); // => 2
 */const getObjLength=(obj={})=>{ow(obj,ow.object);return Array.isArray(obj)?obj.length:Object.keys(obj).length};export{getObjLength};
//# sourceMappingURL=index.js.map
