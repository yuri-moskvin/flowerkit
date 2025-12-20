Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Checks if a function is async
 * @param {*} fn source function
 * @returns {boolean}
 * @example
 * // How to check if function is async?
 * const fn = async () => {};
 * const isAsync = isFnAsync(fn);
 * console.log(isAsync); // => true
 */const isFnAsync=fn=>{if(typeof fn==="function"){const string=fn.toString().trim();return/^async\s+/.test(string)||/return _ref[^.]*\.apply/.test(string)||fn?.constructor?.name==="AsyncFunction"}return false};exports.isFnAsync=isFnAsync;
//# sourceMappingURL=index.cjs.map
