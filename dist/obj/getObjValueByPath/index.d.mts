export type TObjPath = string | readonly PropertyKey[];
export type TGetObjValueByPathArgs = Parameters<typeof getObjValueByPath>;
export type TGetObjValueByPathReturn = ReturnType<typeof getObjValueByPath>;
/**
 * Reads a nested own property using a dot path or an array of property keys.
 * Returns the fallback when traversal fails or the resolved value is `undefined`.
 * @template TValue
 * @param {object} obj Source object or array
 * @param {TObjPath} path Dot path or property-key array
 * @param {TValue} [fallback] Value returned for a missing path
 * @returns {TValue|undefined} Resolved value or fallback
 * @throws {TypeError} getObjValueByPath: arguments are invalid
 * @example
 * const sellerName = getObjValueByPath<string>(product, "seller.profile.name", "Unknown");
 * @example
 * // Array paths support indexes, symbols, and keys that contain dots
 * const quantity = getObjValueByPath<number>(order, [ "items", 0, "quantity" ], 0);
 */
export declare const getObjValueByPath: <TValue = unknown>(obj: object, path: TObjPath, fallback?: TValue) => TValue | undefined;
