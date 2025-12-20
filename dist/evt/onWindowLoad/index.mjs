import{getDocument,getWindow}from"ssr-window";
/**
 * Runs a callback when the window load event fires.
 * Executes immediately if already loaded.
 *
 * @param {(e?: Event) => void} cb Callback to run on load
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e?: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onWindowLoad: cb must be a function
 * @throws {TypeError} onWindowLoad: isAutoInit must be a boolean
 * @throws {TypeError} onWindowLoad: cb must be a function
 * @throws {TypeError} onWindowLoad: isAutoInit must be a boolean
 *
 * @example
 * const { removeListener } = onWindowLoad(() => console.log("Loaded"));
 */const onWindowLoad=(cb,isAutoInit=true)=>{if(typeof cb!=="function")throw new TypeError("onWindowLoad: cb must be a function");if(typeof isAutoInit!=="boolean")throw new TypeError("onWindowLoad: isAutoInit must be a boolean");if(typeof cb!=="function")throw new TypeError("onWindowLoad: cb must be a function");if(typeof isAutoInit!=="boolean")throw new TypeError("onWindowLoad: isAutoInit must be a boolean");const handler=e=>{cb(e)};const addListener=()=>{if(getDocument().readyState==="complete")handler();else getWindow().addEventListener("load",handler)};const removeListener=()=>{getWindow().removeEventListener("load",handler)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};export{onWindowLoad};
//# sourceMappingURL=index.mjs.map
