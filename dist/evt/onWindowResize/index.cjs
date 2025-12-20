Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");var index=require("../../fn/getDebouncedFn/index.cjs");
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
 */const onWindowResize=(cb,delay=300,isAutoInit=true)=>{if(typeof cb!=="function")throw new TypeError("onWindowResize: cb must be a function");if(typeof delay!=="number"&&typeof delay!=="undefined")throw new TypeError("onWindowResize: delay must be a number if provided");if(typeof isAutoInit!=="boolean")throw new TypeError("onWindowResize: isAutoInit must be a boolean");const handler=e=>{if(delay){const fn=index.getDebouncedFn(cb,delay);fn(e)}else cb(e)};const addListener=()=>{ssrWindow.getWindow().addEventListener("resize",handler)};const removeListener=()=>{ssrWindow.getWindow().removeEventListener("resize",handler)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};exports.onWindowResize=onWindowResize;
//# sourceMappingURL=index.cjs.map
