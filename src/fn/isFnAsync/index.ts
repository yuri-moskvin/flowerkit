export type TIsFnAsyncArgs = Parameters<typeof isFnAsync>;

export type TIsFnAsyncReturn = ReturnType<typeof isFnAsync>;

/**
 * Checks if a function is async
 * @param {*} fn source function
 * @returns {boolean}
 * @example
 * // How to check if function is async?
 * const fn = async () => {};
 * const isAsync = isFnAsync(fn);
 * console.log(isAsync); // => true
 * @example
 * // Detect whether a route loader was declared as an async function
 * const shouldShowPendingState = isFnAsync(route.load);
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
