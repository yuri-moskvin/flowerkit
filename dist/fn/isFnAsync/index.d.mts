/**
 * Checks if a function is async
 * @param {*} fn source function
 * @returns {boolean}
 * @example
 * // How to check if function is async?
 * const fn = async () => {};
 * const isAsync = isFnAsync(fn);
 * console.log(isAsync); // => true
 */
export declare const isFnAsync: (fn: unknown) => boolean;
