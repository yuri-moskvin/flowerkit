/**
 * Check if an object is iterable
 * @param obj{any}
 * @returns {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @example
 * // How to check for iterability?
 * const myDivs = document.querySelectAll("div");
 * const isCanBeIterated = isIterable(myDivs);
 * console.log(isCanBeIterated); // => true
 */
export const isIterable = (obj: any): boolean => {
  return obj !== null && typeof (obj as { [Symbol.iterator]?: unknown; })[Symbol.iterator] === "function";
};
