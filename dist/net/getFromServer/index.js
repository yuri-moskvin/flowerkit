import ow from"ow";import{getWindow,getDocument}from"ssr-window";import{bubble}from"../../evt/bubble/index.js";import{getObjFromFormData}from"../../obj/getObjFromFormData/index.js";import{getFormDataFromObj}from"../getFormDataFromObj/index.js";import{getUrlWithQueryParams}from"../getUrlWithQueryParams/index.js";
/**
 * Gets result of async fetch query to the server. Lightweight alternative for `axios` lib
 * @param props{Object=} - params
 * @param props.contentType{String=} - type of request content ("auto" (by default), "application/json", "application/x-www-form-urlencoded", or "multipart/form-data")
 * @param props.isBubble{Boolean=} - bubble a custom event with name "getFromServer" after success request and response in details event field
 * @param props.timeout{Number=} - query timeout
 * @param props.method{String=} - request method (`GET` (by default), `PUT`, `POST` or `DELETE`)
 * @param props.mode{RequestMode=} - request mode
 * @param props.signal{AbortSignal=} - instance of AbortSignal for request
 * @param props.data{Object|FormData=} - object of FormData instance for request
 * @param props.getSuccessResp{Function=} - callback for success response
 * @param props.getResp{Function=} - async callback for response (overrides default behavior)
 * @param props.type{String=} - type of response (`text`, `json` (by default) or `blob`)
 * @param props.url{String=} - request url
 * @param props.headers{Object=} - object of request headers
 * @param props.allowedCodes{Array=} - array of response allowed codes
 * @param props.credentials{RequestCredentials=} - credentials value for request (`same-origin` by default)
 * @param props.redirect{RequestRedirect=} - redirect value for request (`follow` by default)
 * @param props.cache{RequestCache=} - cache value for request (`default` by default)
 * @param props.referrerPolicy{ReferrerPolicy=} - referrerPolicy value for request (`no-referrer-when-downgrade` by default)
 * @param props.fetchProps{Object=} - other `fetch` API options that overrides default behavior of `getFromServer` function
 * @return {Promise}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * // How to POST data to the server?
 * getFromServer({ url: "/api/send", method: "POST", data: { idUser: "123" } })
 *   .then(resp => console.log(resp)) // POST "api/send" with JSON body
 *
 * // How to GET data from the server?
 * getFromServer({ url: "/api/send", method: "GET", data: { idUser: "123" } })
 *   .then(resp => console.log(resp)) // GET "/api/send/?idUser=123" with query params from "data" in url
 *
 * // How to POST data to the server with FormData?
 * const myData = new FormData();
 * getFromServer({ url: "/api/send", method: "POST", data: myData })
 *   .then(resp => console.log(resp)) // POST "/api/send" with FormData body
 *
 * // How to GET some user id data from the server?
 * const userId = await getFromServer({ url: "/api/send", method: "GET", getSuccessResp: (resp) => resp.userId }) // GET "api/send" and parse userId field from response
 *
 * // How to GET some user id data from the server with promise?
 * getFromServer({ url: "/api/send", method: "GET" })
 *   .then(resp => console.log(resp.userId)) // GET "api/send" and return promise with response
 */const getFromServer=async(props={})=>{ow(props,ow.object.exactShape({contentType:ow.optional.string.not.empty,timeout:ow.optional.number,method:ow.optional.string.not.empty,mode:ow.optional.string.not.empty,getSuccessResp:ow.optional.function,getResp:ow.optional.function,isBubble:ow.optional.boolean,type:ow.optional.string.not.empty,url:ow.optional.string.not.empty,headers:ow.optional.object,allowedCodes:ow.optional.array.validate((value=>({validator:value.length?value.every((item=>typeof item==="number")):true,message:()=>label=>`AllowedCodes must be non-empty array of numbers`}))),credentials:ow.optional.string,redirect:ow.optional.string,referrerPolicy:ow.optional.string,cache:ow.optional.string,fetchProps:ow.optional.object,signal:ow.optional.object.validate((value=>({validator:value instanceof AbortSignal,message:()=>label=>`"signal" prop must be instance of AbortSignal`}))),data:ow.optional.any([ow.null,ow.object.validate((value=>({validator:value===null||value instanceof FormData||typeof value==="object",message:()=>label=>`"data" prop must be instance of FormData, plain Object or null`})))])}));const{contentType:contentType="auto",isBubble:isBubble=true,timeout:timeout=12000,method:method="GET",mode:mode="cors",signal:signal=null,data:data=null,getSuccessResp:getSuccessResp=(resp=>resp),getResp:getResp,type:type="json",url:url=getWindow().location.href||"./",headers:headers={},allowedCodes:allowedCodes=[],credentials:credentials="same-origin",redirect:redirect="follow",referrerPolicy:referrerPolicy="no-referrer-when-downgrade",cache:cache="default",fetchProps:fetchProps={}}=props;let timer=null;const queries=[];
/**
   * Gets prepared request body
   * @private
   * @return {null|FormData|string}
   */const getBody=()=>{const isFd=!!data&&data instanceof FormData;const isPost=typeof method==="string"&&method.toUpperCase()==="POST";switch(true){case contentType==="application/json"&&isPost:return JSON.stringify(isFd?getObjFromFormData(data):data||{});case["application/x-www-form-urlencoded","multipart/form-data","auto"].includes(contentType)&&isPost:return isFd?data:getFormDataFromObj(data||{});default:return null}};
/**
   * Gets reject
   * @param reason
   * @private
   * @return {Promise<never>}
   */const getReject=reason=>Promise.reject(reason)
/**
   * Setup timer
   * @param callback
   * @private
   * @return {number}
   */;const setTimer=callback=>{timer=setTimeout((()=>callback(408)),timeout);return timer};
/**
   * Gets url
   * @private
   * @return {string}
   */const getUrl=()=>["GET","HEAD","CONNECT","OPTIONS","TRACE"].includes(method)&&data!==null?getUrlWithQueryParams(url,data):url;
/**
   * Gets response
   * @param resp{Response}
   * @private
   * @return {Promise}
   */const getResponse=async resp=>{clearTimeout(timer);if(typeof getResp==="function")return await getResp(resp);else{const{ok:ok,status:status}=resp;if(ok||allowedCodes.length&&allowedCodes.includes(status))switch(type){case"json":return await resp.json();case"blob":return await resp.blob();default:return await resp.text()}else return await getReject(status)}};
/**
   * Get headers
   * @private
   * @return {Headers}
   */const getHeaders=()=>{const result=headers;if(contentType!=="auto")result["Content-Type"]=contentType;return result};
/**
   * Fetch options
   * @type {RequestInit}
   * @private
   */const fetchParams={method:method,body:getBody(),mode:mode,signal:signal,credentials:credentials,redirect:redirect,cache:cache,referrerPolicy:referrerPolicy,headers:getHeaders(),...fetchProps};queries.push(fetch(getUrl(),fetchParams));if(timeout&&timeout!==Infinity)queries.push(new Promise(((resolve,reject)=>setTimer(reject))));
// Return race
return await Promise.race(queries).then((resp=>getResponse(resp).then((resp=>{if(isBubble&&typeof window!=="undefined")bubble(getDocument(),getFromServer.name,resp);return getSuccessResp(resp)}))),(reject=>getReject(reject)))};export{getFromServer};
//# sourceMappingURL=index.js.map
