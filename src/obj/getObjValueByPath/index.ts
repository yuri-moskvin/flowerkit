export type TObjPath = string | readonly PropertyKey[];

export type TGetObjValueByPathArgs = Parameters<typeof getObjValueByPath>;

export type TGetObjValueByPathReturn = ReturnType<typeof getObjValueByPath>;

const getPathParts = (path: TObjPath): readonly PropertyKey[] => {
  if (typeof path === "string") {
    if (path.length === 0 || path.split(".").some((part) => part.length === 0)) {
      throw new TypeError("getObjValueByPath: path must be a non-empty dot path");
    }
    return path.split(".");
  }
  if (!Array.isArray(path) || path.length === 0) {
    throw new TypeError("getObjValueByPath: path must be a non-empty string or key array");
  }
  if (path.some((part) => ![ "number", "string", "symbol" ].includes(typeof part))) {
    throw new TypeError("getObjValueByPath: path must contain property keys");
  }
  return path;
};

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
export const getObjValueByPath = <TValue = unknown>(
  obj: object,
  path: TObjPath,
  fallback?: TValue
): TValue | undefined => {
  if ((typeof obj !== "object" && typeof obj !== "function") || obj === null) {
    throw new TypeError("getObjValueByPath: obj must be an object");
  }
  const parts = getPathParts(path);
  let current: unknown = obj;

  for (const part of parts) {
    if (
      current === null
      || (typeof current !== "object" && typeof current !== "function")
      || !Object.prototype.hasOwnProperty.call(current, part)
    ) {
      return fallback;
    }
    current = Reflect.get(current, part);
  }

  return current === undefined ? fallback : current as TValue;
};
