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
export const isFnClass = (fn: unknown): boolean => {
  const type = typeof fn;
  if ((type === "function") || (type === "object" && fn !== null)) {
    const hasCtor = !!(fn as any)?.constructor;
    const ctorStr = hasCtor ? (fn as any).constructor.toString() : "";
    const isCtorClass = hasCtor && ctorStr.substring(0, 5) === "class";

    const proto = (fn as any)?.prototype;
    if (proto === undefined) {
      return isCtorClass;
    }

    const protoCtorStr = (proto?.constructor && proto.constructor.toString) ? proto.constructor.toString() : "";
    const isPrototypeCtorClass = protoCtorStr.substring(0, 5) === "class";
    return isCtorClass || isPrototypeCtorClass;
  }
  return false;
};
