import ow from"ow";
/**
 * Checks if an object is empty
 * @param obj{Object|Array} - source object
 * @return {boolean}
 * @example
 * // How to check if an object is empty?
 * const obj = {};
 * const isEmpty = isObjEmpty(obj);
 * console.debug(isEmpty); // => true
 */const isObjEmpty=obj=>{ow(obj,ow.object);return Array.isArray(obj)?obj.length===0:Object.keys(obj).length===0&&obj.constructor===Object};export{isObjEmpty};
//# sourceMappingURL=index.js.map
