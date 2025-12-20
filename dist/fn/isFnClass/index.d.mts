/**
 * Checks if a function is a class or instance of class
 * @param fn{*} source function
 * @returns {boolean}
 * @example
 * // How to check if a function is ES6 Class?
 * const fn = new Class();
 * const isClass = isFnClass(fn);
 * console.log(isClass); // => true
 */
export declare const isFnClass: (fn: unknown) => boolean;
