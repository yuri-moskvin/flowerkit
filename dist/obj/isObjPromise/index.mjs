/**
 * Checks if an object is promise
 * @param obj{*} source object
 * @returns {boolean}
 * @example
 * // How to check if an object is promise?
 * const obj = new Promise(() => {});
 * const isPromise = isObjPromise(obj);
 * console.log(isPromise); // => true
 */
const isObjPromise=obj=>!!obj&&typeof obj==="object"&&typeof obj.then==="function";export{isObjPromise};
//# sourceMappingURL=index.mjs.map
