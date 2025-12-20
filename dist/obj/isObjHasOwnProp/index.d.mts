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
 */
export declare const isObjHasOwnProp: (obj: unknown, prop: PropertyKey) => boolean;
