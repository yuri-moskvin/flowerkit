Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");
/**
 * Runs a callback when the DOM is ready (`DOMContentLoaded`).
 * If already ready, executes immediately.
 *
 * @param {(e?: Event) => void} cb Callback to run on DOM ready
 * @param {boolean} [isAutoInit=true] Attach immediately
 * @returns {{
 *   handler: (e?: Event) => void;
 *   addListener: () => void;
 *   removeListener: () => void;
 * }}
 * @throws {TypeError} onDOMReady: cb must be a function
 * @throws {TypeError} onDOMReady: isAutoInit must be a boolean
 *
 * @example
 * onDOMReady(() => console.log("DOM ready"));
 */const onDOMReady=(cb,isAutoInit=true)=>{if(typeof cb!=="function")throw new TypeError("onDOMReady: cb must be a function");if(typeof isAutoInit!=="boolean")throw new TypeError("onDOMReady: isAutoInit must be a boolean");const handler=e=>{cb(e)};const addListener=()=>{if(ssrWindow.getDocument().readyState==="loading")ssrWindow.getDocument().addEventListener("DOMContentLoaded",handler);else handler()};const removeListener=()=>{ssrWindow.getDocument().removeEventListener("DOMContentLoaded",handler)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};exports.onDOMReady=onDOMReady;
//# sourceMappingURL=index.cjs.map
