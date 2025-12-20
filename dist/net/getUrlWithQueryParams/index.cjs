Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");var index=require("../../obj/getObjFromFormData/index.cjs");
/**
 * Returns a URL string with updated query parameters from an object or `FormData`.
 *
 * @param {string} [uri=window.location.href] Source URL
 * @param {Record<string, string|number|boolean|null>|FormData} [params={}] Params to merge into the query string
 * @returns {string} Updated URL
 */const getUrlWithQueryParams=(uri,params={})=>{if(typeof uri!=="string")throw new TypeError("getUrlWithQueryParams: uri must be a string");else if(!uri.length)uri=ssrWindow.getWindow().location.href;if(typeof params!=="object")throw new TypeError("getUrlWithQueryParams: params must be an object");if(params instanceof FormData)params=index.getObjFromFormData(params);const a=ssrWindow.getDocument().createElement("a");a.href=uri;Object.entries(params).forEach((([key,value])=>{
// eslint-disable-next-line security/detect-non-literal-regexp
const regex=new RegExp(`${key}((?:\\[[^\\]]*\\])?)(=|$)(.*)`,"i");let queryParams=a.search.replace(/^\?/,"").split("&").filter(Boolean);let paramFound=false;queryParams=queryParams.map((param=>{if(regex.test(param)){paramFound=true;return`${key}=${value}`}return param}));if(!paramFound)queryParams.push(`${key}=${value}`);a.search=queryParams.length?`?${queryParams.join("&")}`:""}));return a.href};exports.getUrlWithQueryParams=getUrlWithQueryParams;
//# sourceMappingURL=index.cjs.map
