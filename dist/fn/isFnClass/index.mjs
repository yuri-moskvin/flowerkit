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
const isFnClass=fn=>{const type=typeof fn;if(type==="function"||type==="object"&&fn!==null){const hasCtor=!!fn?.constructor;const ctorStr=hasCtor?fn.constructor.toString():"";const isCtorClass=hasCtor&&ctorStr.substring(0,5)==="class";const proto=fn?.prototype;if(proto===void 0)return isCtorClass;const protoCtorStr=proto?.constructor&&proto.constructor.toString?proto.constructor.toString():"";const isPrototypeCtorClass=protoCtorStr.substring(0,5)==="class";return isCtorClass||isPrototypeCtorClass}return false};export{isFnClass};
//# sourceMappingURL=index.mjs.map
