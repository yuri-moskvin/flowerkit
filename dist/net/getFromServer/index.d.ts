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
 * @param props.type{String=} - type of response (`text`, `json` (by default), `blob` or `arrayBuffer`)
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
 */
export function getFromServer(props?: any | undefined): Promise<any>;
//# sourceMappingURL=index.d.ts.map