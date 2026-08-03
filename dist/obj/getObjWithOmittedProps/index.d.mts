export type TGetObjWithOmittedPropsArgs = Parameters<typeof getObjWithOmittedProps>;
export type TGetObjWithOmittedPropsReturn = ReturnType<typeof getObjWithOmittedProps>;
/**
 * Creates an object without selected own properties.
 * @template T,TKey
 * @param {T} obj Source object
 * @param {TKey[]} keys Keys to omit
 * @returns {Omit<T, TKey>} Remaining properties
 * @throws {TypeError} getObjWithOmittedProps: obj must be a plain object
 * @throws {TypeError} getObjWithOmittedProps: keys must be an array
 * @example
 * getObjWithOmittedProps({ id: 1, password: "secret" }, [ "password" ]); // { id: 1 }
 * @example
 * // Remove internal fields before sending a public API response
 * const publicUser = getObjWithOmittedProps(user, [ "passwordHash", "internalNotes" ]);
 */
export declare const getObjWithOmittedProps: <T extends object, TKey extends keyof T>(obj: T, keys: readonly TKey[]) => Omit<T, TKey>;
