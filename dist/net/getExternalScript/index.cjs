Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");
/**
 * Appends an external script to the page and resolves when it's loaded.
 *
 * @param {TGetExternalScriptProps} props Options
 * @param {boolean} [props.isAsync=true] `async` attribute
 * @param {boolean} [props.isDefer=false] `defer` attribute
 * @param {string} props.src Script source URL
 * @param {Node|HTMLElement} [props.appendTo=document.body] Element to append the script to
 * @param {string} [props.id] Script element id
 * @param {string} [props.crossorigin] `crossorigin` attribute
 * @param {string} [props.type] `type` attribute
 * @returns {Promise<HTMLScriptElement>} Promise that resolves to the created script element
 * @example
 * getExternalScript({ src: "https://cdn.example.com/lib.js", id: "lib" })
 *   .then(() => console.log("Loaded"));
 */const getExternalScript=props=>{const{isAsync:isAsync=true,isDefer:isDefer=false,src:src,type:type,appendTo:appendTo=ssrWindow.getDocument().body,id:id,crossorigin:crossorigin}=props??{};if(typeof src!=="string"||!src)return Promise.reject(new TypeError("getExternalScript: props.src must be a non-empty string"));if(!!crossorigin&&typeof crossorigin!=="string")return Promise.reject(new TypeError("getExternalScript: props.crossorigin must be a string if provided"));if(!appendTo||typeof appendTo.appendChild!=="function")return Promise.reject(new TypeError("getExternalScript: props.appendTo must be a Node/HTMLElement if provided"));return new Promise(((resolve,reject)=>{let isReady=false;const script=ssrWindow.getDocument().createElement("script");script.src=src;script.async=isAsync;script.defer=isDefer;if(id)script.id=id;if(crossorigin)script.crossorigin=crossorigin;if(type)script.type=type;script.onerror=err=>{reject(err);script.onerror=null};script.onload=script.onreadystatechange=function(){if(!isReady&&(!this.readyState||this.readyState==="complete")){isReady=true;resolve(script);script.onload=null;script.onerror=null}};appendTo.appendChild(script)}))};exports.getExternalScript=getExternalScript;
//# sourceMappingURL=index.cjs.map
