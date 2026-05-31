import{getWindow,getDocument}from"ssr-window";import{getObjFromFormData}from"../../obj/getObjFromFormData/index.mjs";
/**
 * Returns a URL string with updated query parameters from an object or `FormData`.
 *
 * @param {string} [uri=window.location.href] Source URL
 * @param {Record<string, string|number|boolean|null>|FormData} [params={}] Params to merge into the query string
 * @returns {string} Updated URL
 */const getUrlWithQueryParams=(uri,params={})=>{if(typeof uri!=="string")throw new TypeError("getUrlWithQueryParams: uri must be a string");else if(!uri.length)uri=getWindow().location.href;if(!params||typeof params!=="object")throw new TypeError("getUrlWithQueryParams: params must be an object");if(params instanceof FormData)params=getObjFromFormData(params);const a=getDocument().createElement("a");a.href=uri;const searchParams=new URLSearchParams(a.search);Object.entries(params).forEach(([key,value])=>{searchParams.set(key,String(value))});a.search=searchParams.toString();return a.href};export{getUrlWithQueryParams};
//# sourceMappingURL=index.mjs.map
