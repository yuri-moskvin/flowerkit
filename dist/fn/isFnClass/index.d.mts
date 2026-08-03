export type TIsFnClassArgs = Parameters<typeof isFnClass>;
export type TIsFnClassReturn = ReturnType<typeof isFnClass>;
/**
 * Checks if a function is a class or instance of class
 * @param fn{*} source function
 * @returns {boolean}
 * @example
 * // How to check if a function is ES6 Class?
 * class UserService {}
 * const isClass = isFnClass(UserService);
 * console.log(isClass); // => true
 * @example
 * // Distinguish a class constructor from a factory function in a plugin registry
 * const plugin = isFnClass(PluginConstructor)
 *   ? new PluginConstructor()
 *   : PluginConstructor();
 */
export declare const isFnClass: (fn: unknown) => boolean;
