Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Gets a throttled function with specific delay
 * @template {(...args: any[]) => any} T
 * @param {T} func function
 * @param {number} [delay=1000] delay in ms, 1000 by default
 * @returns {(...args: Parameters<T>) => void}
 * @throws {TypeError} getThrottledFn: func must be a function
 * @throws {TypeError} getThrottledFn: delay must be a non-negative finite number
 * @example
 * // How to implement function throttling?
 * const getDataFromAPI = () => Promise.resolve([]);
 * const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
 * getThrottledDataFromAPI(); // => []
 */const getThrottledFn=(func,delay=1000)=>{if(typeof func!=="function")throw new TypeError("getThrottledFn: func must be a function");if(typeof delay!=="number"||!Number.isFinite(delay)||delay<0)throw new TypeError("getThrottledFn: delay must be a non-negative finite number");let timeout=null;return(...args)=>{if(!timeout){func(...args);timeout=setTimeout((()=>{timeout=null}),delay)}}};exports.getThrottledFn=getThrottledFn;
//# sourceMappingURL=index.cjs.map
