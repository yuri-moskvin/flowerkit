import ow from"ow";import{getDocument}from"ssr-window";
/**
 * Runs callback when DOM tree can be manipulated
 * @param cb{Function} - callback function
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 * @example
 * // How to check if DOM is ready?
 * const callback = () => console.log("DOM Content Loaded");
 * onDOMReady(callback);
 */const onDOMReady=cb=>{ow(cb,ow.function);const doc=getDocument();doc.readyState==="loading"?doc.addEventListener("DOMContentLoaded",cb):cb()};export{onDOMReady};
//# sourceMappingURL=index.js.map
