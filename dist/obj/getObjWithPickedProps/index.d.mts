export type TGetObjWithPickedPropsArgs = Parameters<typeof getObjWithPickedProps>;
export type TGetObjWithPickedPropsReturn = ReturnType<typeof getObjWithPickedProps>;
/**
 * Creates an object containing selected own properties.
 * @template T,TKey
 * @param {T} obj Source object
 * @param {TKey[]} keys Keys to copy
 * @returns {Pick<T, TKey>} Picked properties
 * @throws {TypeError} getObjWithPickedProps: obj must be a plain object
 * @throws {TypeError} getObjWithPickedProps: keys must be an array
 * @example
 * getObjWithPickedProps({ id: 1, name: "Ada" }, [ "id" ]); // { id: 1 }
 * @example
 * // Select safe fields for a public user profile
 * const publicProfile = getObjWithPickedProps(user, [ "id", "displayName", "avatarUrl" ]);
 */
export declare const getObjWithPickedProps: <T extends object, TKey extends keyof T>(obj: T, keys: readonly TKey[]) => Pick<T, TKey>;
