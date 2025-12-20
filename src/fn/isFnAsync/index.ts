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
export const isFnAsync = (fn: unknown): boolean => {
  if (typeof fn === "function") {
    const string = (fn as Function).toString().trim();
    return (
      /^async\s+/.test(string) ||
      /return _ref[^.]*\.apply/.test(string) ||
      (fn as { constructor?: { name?: string; }; })?.constructor?.name === "AsyncFunction"
    );
  }
  return false;
};
