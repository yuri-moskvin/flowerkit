Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");var index=require("../../evt/bubble/index.cjs");var index$3=require("../../obj/getObjFromFormData/index.cjs");var index$1=require("../getFormDataFromObj/index.cjs");var index$2=require("../getUrlWithQueryParams/index.cjs");
/**
 * Performs an HTTP request (`fetch`) with handy defaults, content-type handling,
 * query param building, and optional bubbling of a "getFromServer" event.
 *
 * @template T The expected response data type.
 * @param {Object} [props] Request parameters (all optional).
 * @param {string} [props.url] The URL to request. Defaults to current window location or './'.
 * @param {("auto"|"application/json"|"application/x-www-form-urlencoded"|"multipart/form-data")} [props.contentType="auto"] Content type header. If "auto", sets based on data/method.
 * @param {boolean} [props.isBubble=true] Whether to bubble a "getFromServer" event after success.
 * @param {number} [props.timeout=15000] Timeout in milliseconds (use Infinity to disable).
 * @param {("GET"|"PUT"|"POST"|"DELETE"|"HEAD"|"CONNECT"|"OPTIONS"|"TRACE")} [props.method="GET"] HTTP method.
 * @param {RequestMode} [props.mode="cors"] Fetch mode.
 * @param {AbortSignal|null} [props.signal=null] AbortSignal for cancellation.
 * @param {Record<string,unknown>|FormData|null} [props.data=null] Request data. For GET-like methods, appended as query params.
 * @param {function(T): T} [props.getSuccessResp] Transform function for successful response. Defaults to identity function.
 * @param {function(Response): Promise<T>} [props.getResp] Custom response parser. If provided, overrides `type`.
 * @param {("text"|"json"|"blob"|"arrayBuffer")} [props.type="json"] Response body parsing type (used when `getResp` not provided).
 * @param {Record<string,string>} [props.headers={}] Additional headers.
 * @param {number[]} [props.allowedCodes=[]] Array of HTTP status codes to treat as success even if not 2xx.
 * @param {RequestCredentials} [props.credentials="same-origin"] Credentials mode.
 * @param {RequestRedirect} [props.redirect="follow"] Redirect mode.
 * @param {RequestCache} [props.cache="default"] Cache mode.
 * @param {ReferrerPolicy} [props.referrerPolicy="no-referrer-when-downgrade"] Referrer policy.
 * @param {Omit<RequestInit, "method"|"headers"|"body"|"signal"|"mode"|"credentials"|"redirect"|"cache"|"referrerPolicy">} [props.fetchProps={}] Additional fetch options.
 * @returns {Promise<T>} Promise with parsed response (type depends on `type` option).
 * @throws {TypeError} getFromServer: url must be a string
 * @throws {TypeError} getFromServer: allowedCodes must be an array of integers
 * @throws {TypeError} getFromServer: data must be a plain object, FormData, or null
 * @throws {TypeError} getFromServer: timeout must be a non-negative number or Infinity
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
 */const getFromServer=async(props={})=>{const{contentType:contentType="auto",isBubble:isBubble=true,timeout:timeout=15000,method:method="GET",mode:mode="cors",signal:signal=null,data:data=null,getResp:getResp,type:type="json",url:url=ssrWindow.getWindow().location.href||"./",headers:headers={},allowedCodes:allowedCodes=[],credentials:credentials="same-origin",redirect:redirect="follow",referrerPolicy:referrerPolicy="no-referrer-when-downgrade",cache:cache="default",fetchProps:fetchProps={}}=props;const getSuccessResp=props.getSuccessResp??(resp=>resp);const methodNormalized=String(method).toUpperCase();const methodsWithBody=new Set(["POST","PUT","DELETE","PATCH"]);const methodsNoBody=new Set(["GET","HEAD","CONNECT","OPTIONS","TRACE"]);const isFormData=v=>typeof FormData!=="undefined"&&v instanceof FormData;const isPlainObject=v=>Object.prototype.toString.call(v)==="[object Object]";if(typeof url!=="string")throw new TypeError("getFromServer: url must be a string");if(!Array.isArray(allowedCodes)||!allowedCodes.every(c=>Number.isInteger(c)))throw new TypeError("getFromServer: allowedCodes must be an array of integers");if(typeof timeout!=="number"||Number.isFinite(timeout)&&timeout<0||Number.isNaN(timeout))throw new TypeError("getFromServer: timeout must be a non-negative number or Infinity");if(data!==null&&!isFormData(data)&&!isPlainObject(data))throw new TypeError("getFromServer: data must be a plain object, FormData, or null");let timer=null;let isTimedOut=false;const requestController=new AbortController;const externalAbortListener=()=>{requestController.abort()};if(signal)if(signal.aborted)externalAbortListener();else signal.addEventListener("abort",externalAbortListener,{once:true});const getDataAsObject=()=>isFormData(data)?index$3.getObjFromFormData(data):data??{};
/**
   * Produces request body based on contentType and data
   * @private
   * @returns {BodyInit | null}
   */const getBody=()=>{if(!methodsWithBody.has(methodNormalized))return null;switch(true){case contentType==="application/json":return JSON.stringify(getDataAsObject());case contentType==="application/x-www-form-urlencoded":{const params=new URLSearchParams;Object.entries(getDataAsObject()).forEach(([key,value])=>{params.set(key,String(value??""))});return params.toString()}case contentType==="multipart/form-data":return isFormData(data)?data:index$1.getFormDataFromObj(getDataAsObject());case contentType==="auto":return isFormData(data)?data:index$1.getFormDataFromObj(getDataAsObject());default:return null}};
/**
   * URL builder (adds query params for GET-like methods)
   * @private
   */const getUrl=()=>methodsNoBody.has(methodNormalized)&&data!==null?index$2.getUrlWithQueryParams(url,isFormData(data)?data:data):url;
/**
   * Response parser
   * @private
   */const getResponse=async resp=>{if(typeof getResp==="function")return await getResp(resp);const{ok:ok,status:status}=resp;if(ok||allowedCodes.length>0&&allowedCodes.includes(status))switch(type){case"arrayBuffer":return await resp.arrayBuffer();case"json":return await resp.json();case"blob":return await resp.blob();default:return await resp.text()}throw resp};
/**
   * Headers builder
   * @private
   */const getHeaders=()=>{const result={...headers||{}};if(contentType==="multipart/form-data"){Object.keys(result).forEach(key=>{if(key.toLowerCase()==="content-type")delete result[key]});return result}if(["application/json","application/x-www-form-urlencoded"].includes(contentType))result["Content-Type"]=contentType;return result};if(timeout&&timeout!==Infinity)timer=setTimeout(()=>{isTimedOut=true;requestController.abort()},timeout);const fetchParams={...fetchProps,method:methodNormalized,body:getBody(),mode:mode,signal:requestController.signal,credentials:credentials,redirect:redirect,cache:cache,referrerPolicy:referrerPolicy,headers:getHeaders()};try{const resp=await fetch(getUrl(),fetchParams);const parsed=await getResponse(resp);if(isBubble&&typeof window!=="undefined")index.bubble(ssrWindow.getDocument(),getFromServer.name,parsed);return getSuccessResp(parsed)}catch(error){if(isTimedOut)throw 408;throw error}finally{if(timer)clearTimeout(timer);if(signal)signal.removeEventListener("abort",externalAbortListener)}};exports.getFromServer=getFromServer;
//# sourceMappingURL=index.cjs.map
