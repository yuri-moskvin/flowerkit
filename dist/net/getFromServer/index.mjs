import{getWindow,getDocument}from"ssr-window";import{bubble}from"../../evt/bubble/index.mjs";import{getObjFromFormData}from"../../obj/getObjFromFormData/index.mjs";import{getFormDataFromObj}from"../getFormDataFromObj/index.mjs";import{getUrlWithQueryParams}from"../getUrlWithQueryParams/index.mjs";
/**
 * Performs an HTTP request (`fetch`) with handy defaults, content-type handling,
 * query param building, and optional bubbling of a "getFromServer" event.
 *
 * @template T
 * @param {TGetFromServerProps<T>} [props={}] Request parameters
 * @returns {Promise<T>} Promise with parsed response (type depends on `type` option)
 * @throws {TypeError} getFromServer: url must be a string
 * @throws {TypeError} getFromServer: allowedCodes must be an array of integers
 * @throws {TypeError} getFromServer: data must be a plain object, FormData, or null
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
 */const getFromServer=async(props={})=>{const{contentType:contentType="auto",isBubble:isBubble=true,timeout:timeout=15000,method:method="GET",mode:mode="cors",signal:signal=null,data:data=null,getSuccessResp:getSuccessResp=resp=>resp,getResp:getResp,type:type="json",url:url=getWindow().location.href||"./",headers:headers={},allowedCodes:allowedCodes=[],credentials:credentials="same-origin",redirect:redirect="follow",referrerPolicy:referrerPolicy="no-referrer-when-downgrade",cache:cache="default",fetchProps:fetchProps={}}=props;if(typeof url!=="string")throw new TypeError("getFromServer: url must be a string");if(!Array.isArray(allowedCodes)||!allowedCodes.every((c=>Number.isInteger(c))))throw new TypeError("getFromServer: allowedCodes must be an array of integers");if(data!==null&&typeof data!=="object")throw new TypeError("getFromServer: data must be a plain object, FormData, or null");let timer=null;const queries=[];const isPost=method.toUpperCase()==="POST";const isFormData=v=>typeof FormData!=="undefined"&&v instanceof FormData
/**
   * Produces request body based on contentType and data
   * @private
   * @returns {null | FormData | string}
   */;const getBody=()=>{switch(true){case contentType==="application/json"&&isPost:return JSON.stringify(isFormData(data)?getObjFromFormData(data):data||{});case["application/x-www-form-urlencoded","multipart/form-data","auto"].includes(contentType)&&isPost:return isFormData(data)?data:getFormDataFromObj(data||{});default:return null}};
/**
   * Reject helper
   * @private
   */const getReject=reason=>Promise.reject(reason)
/**
   * Timeout helper
   * @private
   */;const setTimer=cb=>{timer=setTimeout((()=>cb(408)),timeout);return timer};
/**
   * URL builder (adds query params for GET-like methods)
   * @private
   */const getUrl=()=>{const methodsNoBody=["GET","HEAD","CONNECT","OPTIONS","TRACE"];return methodsNoBody.includes(method)&&data!==null?getUrlWithQueryParams(url,isFormData(data)?data:data):url};
/**
   * Response parser
   * @private
   */const getResponse=async resp=>{if(timer)clearTimeout(timer);if(typeof getResp==="function")return await getResp(resp);const{ok:ok,status:status}=resp;if(ok||allowedCodes.length>0&&allowedCodes.includes(status))switch(type){case"arrayBuffer":return await resp.arrayBuffer();case"json":return await resp.json();case"blob":return await resp.blob();default:return await resp.text()}return await getReject(resp)};
/**
   * Headers builder
   * @private
   */const getHeaders=()=>{const result={...headers||{}};if(contentType!=="auto")result["Content-Type"]=contentType;return result};const fetchParams={method:method,body:getBody(),mode:mode,signal:signal??void 0,credentials:credentials,redirect:redirect,cache:cache,referrerPolicy:referrerPolicy,headers:getHeaders(),...fetchProps};queries.push(fetch(getUrl(),fetchParams));if(timeout&&timeout!==Infinity)queries.push(new Promise(((_resolve,reject)=>setTimer(reject))));return await Promise.race(queries).then((resp=>getResponse(resp).then((parsed=>{if(isBubble&&typeof window!=="undefined")bubble(getDocument(),getFromServer.name,parsed);return getSuccessResp(parsed)}))),(reject=>getReject(reject)))};export{getFromServer};
//# sourceMappingURL=index.mjs.map
