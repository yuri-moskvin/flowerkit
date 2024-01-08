import ow from"ow";import{getWindow}from"ssr-window";import{getDebouncedFn}from"../../fn/getDebouncedFn/index.js";
/**
 * Runs callback when page has been resized
 * @param cb{Function} - callback function
 * @param delay{Number=} - callback execution delay
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
 * @example
 * // How to detect when page has been resized and run callback once when resize ends?
 * const callback = () => console.log("Page loaded");
 * onWindowLoad(callback);
 * */const onWindowResize=(cb,delay=300)=>{ow(cb,ow.function);ow(delay,ow.optional.number);const debouncedHandler=delay?getDebouncedFn(cb,delay):cb();getWindow().addEventListener("resize",(()=>debouncedHandler()))};export{onWindowResize};
//# sourceMappingURL=index.js.map
