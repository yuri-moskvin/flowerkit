Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Gets the last element of an iterable object such as Array, NodeList, HTMLCollection, etc.
 * @template T
 * @param {ArrayLike<T> & Iterable<T>} obj
 * @returns {T|null}
 * @throws {TypeError} getLastFromIterable: obj must be iterable with a numeric length
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @example
 * // How to get the last element from `NodeList` of `div`?
 * const lastDiv = getLastFromIterable(document.querySelectorAll("div"));
 * console.log(lastDiv) // => Node or null
 */const getLastFromIterable=obj=>{const hasLen=obj&&typeof obj.length==="number";const hasIter=obj&&typeof obj[Symbol.iterator]==="function";if(!hasLen||!hasIter)throw new TypeError("getLastFromIterable: obj must be iterable with a numeric length");const{length:length}=obj;return length?obj[length-1]:null};exports.getLastFromIterable=getLastFromIterable;
//# sourceMappingURL=index.cjs.map
