export type TIsObjPrototypeOfArgs = Parameters<typeof isObjPrototypeOf>;
export type TIsObjPrototypeOfReturn = ReturnType<typeof isObjPrototypeOf>;
/**
 * Checks whether a given object exists in the prototype chain of another value.
 *
 * This is a safe wrapper around Object.prototype.isPrototypeOf that validates inputs and orks with non-plain objects and primitives (primitives always return false)
 * @param {object} prototype The potential prototype object
 * @param {unknown} value The value whose prototype chain is checked
 * @returns {boolean} True if `prototype` is in the prototype chain of `value`
 * @throws {TypeError} isObjPrototypeOf: prototype must be a non-null object
 * @example
 * // Basic usage
 * const proto = {};
 * const obj = Object.create(proto);
 * isObjPrototypeOf(proto, obj); // => true
 *
 * @example
 * // With classes
 * class A {}
 * class B extends A {}
 * const b = new B();
 * isObjPrototypeOf(A.prototype, b); // => true
 *
 * @example
 * // Primitives
 * isObjPrototypeOf(Object.prototype, 123); // => false
 */
export declare const isObjPrototypeOf: (prototype: object, value: unknown) => boolean;
