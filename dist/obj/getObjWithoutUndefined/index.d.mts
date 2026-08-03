export type TGetObjWithoutUndefinedArgs = Parameters<typeof getObjWithoutUndefined>;
export type TGetObjWithoutUndefinedReturn = ReturnType<typeof getObjWithoutUndefined>;
type TObjectWithoutUndefined<T extends object> = {
    [TKey in keyof T as T[TKey] extends undefined ? never : TKey]: Exclude<T[TKey], undefined>;
};
/**
 * Creates a shallow copy without own properties whose value is `undefined`.
 * @template T
 * @param {T} obj Source object
 * @returns {TObjectWithoutUndefined<T>} Object with defined values
 * @throws {TypeError} getObjWithoutUndefined: obj must be a plain object
 * @example
 * getObjWithoutUndefined({ id: 1, name: undefined }); // { id: 1 }
 * @example
 * // Build a PATCH payload while preserving intentional null values
 * const payload = getObjWithoutUndefined({ name, avatar: null, phone: undefined });
 * // `phone` is removed, while `avatar` remains null
 */
export declare const getObjWithoutUndefined: <T extends object>(obj: T) => TObjectWithoutUndefined<T>;
export {};
