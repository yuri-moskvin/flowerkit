Object.defineProperty(exports,"__esModule",{value:true});
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
 */const isObjEmpty=obj=>{if(obj===null||typeof obj!=="object")throw new TypeError("isObjEmpty: obj must be an object or array");return Array.isArray(obj)?obj.length===0:Object.keys(obj).length===0&&obj.constructor===Object};exports.isObjEmpty=isObjEmpty;
//# sourceMappingURL=index.cjs.map
