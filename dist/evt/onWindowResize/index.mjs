import{getWindow}from"ssr-window";import{getDebouncedFn}from"../../fn/getDebouncedFn/index.mjs";
/**
 * Runs a callback on window resize. If `delay` is provided, the callback is debounced.
 *
 * @param {(e: Event) => void} cb Resize callback
 * @param {number} [delay=300] Debounce delay in ms; falsy to call immediately
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onWindowResize: cb must be a function
 * @throws {TypeError} onWindowResize: delay must be a number if provided
 * @throws {TypeError} onWindowResize: isAutoInit must be a boolean
 *
 * @example
 * onWindowResize(() => console.log("resized"));
 */const onWindowResize=(cb,delay=300,isAutoInit=true)=>{if(typeof cb!=="function")throw new TypeError("onWindowResize: cb must be a function");if(typeof delay!=="number"&&typeof delay!=="undefined")throw new TypeError("onWindowResize: delay must be a number if provided");if(typeof isAutoInit!=="boolean")throw new TypeError("onWindowResize: isAutoInit must be a boolean");const handler=e=>{if(delay){const fn=getDebouncedFn(cb,delay);fn(e)}else cb(e)};const addListener=()=>{getWindow().addEventListener("resize",handler)};const removeListener=()=>{getWindow().removeEventListener("resize",handler)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};export{onWindowResize};
//# sourceMappingURL=index.mjs.map
