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
const getCopyOfObj=obj=>{if(obj===null||typeof obj!=="object"||obj instanceof Date)return obj;const objCopy=Array.isArray(obj)?[]:{};return Object.keys(obj).reduce(((nestedObj,key)=>{nestedObj[key]=getCopyOfObj(obj[key]);return nestedObj}),objCopy)};export{getCopyOfObj};
//# sourceMappingURL=index.mjs.map
