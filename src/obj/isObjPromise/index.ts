export type TIsObjPromiseArgs = Parameters<typeof isObjPromise>;

export type TIsObjPromiseReturn = ReturnType<typeof isObjPromise>;

/**
 * Checks if an object is promise
 * @param obj{*} source object
 * @returns {boolean}
 * @example
 * // How to check if an object is promise?
 * const obj = new Promise(() => {});
 * const isPromise = isObjPromise(obj);
 * console.log(isPromise); // => true
 */
export const isObjPromise = (obj: unknown): obj is Promise<unknown> => {
  return !!obj && typeof obj === "object" && typeof (obj as any).then === "function";
};
