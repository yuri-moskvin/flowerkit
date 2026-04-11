export type TIsObjEqualArgs = Parameters<typeof isObjEqual>;
export type TIsObjEqualReturn = ReturnType<typeof isObjEqual>;
/**
 * Checks if two objects are deeply equal by keys and values (not by reference)
 * @param {unknown} obj1 First object
 * @param {unknown} obj2 Second object
 * @returns {boolean} True if objects are deeply equal
 * @throws {TypeError} isObjEqual: obj1 must be an object
 * @throws {TypeError} isObjEqual: obj2 must be an object
 * @example
 * // How to compare two objects by content?
 * const a = { foo: { bar: 1 } };
 * const b = { foo: { bar: 1 } };
 * const isEqual = isObjEqual(a, b);
 * console.log(isEqual); // => true
 */
export declare const isObjEqual: (obj1: unknown, obj2: unknown) => boolean;
