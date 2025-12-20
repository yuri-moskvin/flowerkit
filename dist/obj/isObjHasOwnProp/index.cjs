Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Checks if an object has own property
 * @param {object} obj Source object
 * @param {PropertyKey} prop Property name
 * @see https://eslint.org/docs/latest/rules/no-prototype-builtins
 * @returns {boolean} True if own property exists
 * @throws {TypeError} isObjHasOwnProp: obj must be an object
 * @throws {TypeError} isObjHasOwnProp: prop must be a string|number|symbol
 * @example
 * // How to check if an object has property without calling method directly?
 * const obj = { foo: "bar" };
 * const isHasOwnProp = isObjHasOwnProp(obj, "foo");
 * console.log(isHasOwnProp); // => true
 */const isObjHasOwnProp=(obj,prop)=>{if(obj===null||typeof obj!=="object")throw new TypeError("isObjHasOwnProp: obj must be an object");if(typeof prop!=="string"&&typeof prop!=="number"&&typeof prop!=="symbol")throw new TypeError("isObjHasOwnProp: prop must be a string|number|symbol");return Object.prototype.hasOwnProperty.call(obj,prop)};exports.isObjHasOwnProp=isObjHasOwnProp;
//# sourceMappingURL=index.cjs.map
