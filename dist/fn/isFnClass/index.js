/**
 * Checks if a function is class or instance of class
 * @param fn{*} - source function
 * @return {boolean}
 * @example
 * // How to check if a function is ES6 Class?
 * const fn = new Class();
 * const isClass = isFnClass(fn);
 * console.log(isClass); // => true
 */
const isFnClass=fn=>{if(!!fn&&typeof fn==="function"||typeof fn==="object"){const isCtorClass=!!fn?.constructor&&fn.constructor.toString().substring(0,5)==="class";if(fn?.prototype===void 0)return isCtorClass;const isPrototypeCtorClass=!!fn?.prototype?.constructor&&fn.prototype.constructor.toString&&fn.prototype.constructor.toString().substring(0,5)==="class";return isCtorClass||isPrototypeCtorClass}else return false};export{isFnClass};
//# sourceMappingURL=index.js.map
