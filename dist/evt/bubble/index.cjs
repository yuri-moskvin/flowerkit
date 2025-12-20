Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");
/**
 * Dispatches a bubbling `CustomEvent` on the provided target.
 *
 * @template T
 * @param {Document|Window|Element|HTMLElement} [el=document] Event target
 * @param {string} name Event name
 * @param {T} [detail] Custom event detail payload
 * @param {CustomEventInit<T> & Record<string, unknown>} [params={}] Extra `CustomEvent` init options
 * @returns {void}
 * @throws {TypeError} bubble: el must be an EventTarget
 * @throws {TypeError} bubble: name must be a non-empty string
 * @throws {TypeError} bubble: params must be an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
 *
 * @example
 * bubble(document, "myEvent", { myData: "test" });
 *
 * @example
 * const el = document.querySelector("#myElement");
 * if (el) bubble(el, "myEvent");
 */const bubble=(el=ssrWindow.getDocument(),name,detail,params={})=>{const isTarget=el&&typeof el.dispatchEvent==="function";if(!isTarget)throw new TypeError("bubble: el must be an EventTarget");if(typeof name!=="string"||name.length===0)throw new TypeError("bubble: name must be a non-empty string");if(params===null||typeof params!=="object")throw new TypeError("bubble: params must be an object");const eventParams={cancelable:true,bubbles:true,detail:detail,...params};if(typeof globalThis.dispatchEvent==="function"&&typeof CustomEvent==="function"){const event=new CustomEvent(name,eventParams);el.dispatchEvent(event)}};exports.bubble=bubble;
//# sourceMappingURL=index.cjs.map
