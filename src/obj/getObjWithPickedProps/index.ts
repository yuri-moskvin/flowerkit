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
export const getObjWithPickedProps = <T extends object, TKey extends keyof T>(
  obj: T,
  keys: readonly TKey[]
): Pick<T, TKey> => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    throw new TypeError("getObjWithPickedProps: obj must be a plain object");
  }
  if (!Array.isArray(keys)) {
    throw new TypeError("getObjWithPickedProps: keys must be an array");
  }

  const result = {} as Pick<T, TKey>;
  (keys as readonly TKey[]).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (result as Record<PropertyKey, unknown>)[key] = (obj as Record<PropertyKey, unknown>)[key];
    }
  });
  return result;
};
