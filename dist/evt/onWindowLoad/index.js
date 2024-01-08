import ow from"ow";import{getDocument,getWindow}from"ssr-window";
/**
 * Runs callback when page has fully loaded
 * @param cb{Function} - callback function
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
 * @example
 * // How to detect when whole page has loaded?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 * */const onWindowLoad=cb=>{ow(cb,ow.function);getDocument().readyState==="complete"?cb():getWindow().addEventListener("load",cb)};export{onWindowLoad};
//# sourceMappingURL=index.js.map
