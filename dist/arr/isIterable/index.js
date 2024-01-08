/**
 * Check if an object is iterable
 * @param obj{*}
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @example
 * // How to check for iterability?
 * const myDivs = document.querySelectAll("div");
 * const isCanBeIterated = isIterable(myDivs);
 * console.log(isCanBeIterated); // => true
 */
const isIterable=obj=>obj===null?false:typeof obj[Symbol.iterator]==="function";export{isIterable};
//# sourceMappingURL=index.js.map
