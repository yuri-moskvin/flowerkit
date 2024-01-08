/**
 * Checks if function is async
 * @param fn{*} - source function
 * @return {boolean}
 * @example
 * // How to check if function is async?
 * const fn = async () => {};
 * const isAsync = isFnAsync(fn);
 * console.log(isAsync); // => true
 */
const isFnAsync=fn=>{if(!!fn&&typeof fn==="function"){const string=fn.toString().trim();return!!(string.match(/^async /)||string.match(/return _ref[^.]*\.apply/))||fn?.constructor?.name==="AsyncFunction"}else return false};export{isFnAsync};
//# sourceMappingURL=index.js.map
