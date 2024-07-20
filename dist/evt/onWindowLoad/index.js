import ow from"ow";import{getDocument,getWindow}from"ssr-window";
/**
 * Runs callback when page has fully loaded
 * @param cb{Function} - callback function
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @example
 * // How to detect when whole page has loaded?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 * */const onWindowLoad=(cb,isAutoInit=true)=>{ow(cb,ow.function);ow(isAutoInit,ow.optional.boolean);const handler=()=>{cb()};const addListener=()=>{if(getDocument().readyState==="complete")handler();else getWindow().addEventListener("load",handler)};const removeListener=()=>{getWindow().removeEventListener("load",handler)};if(isAutoInit)addListener();return{handler:handler,addListener:addListener,removeListener:removeListener}};export{onWindowLoad};
//# sourceMappingURL=index.js.map
