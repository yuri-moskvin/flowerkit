export type TGetFromServerArgs<T> = {
    contentType?: "auto" | "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
    isBubble?: boolean;
    timeout?: number;
    method?: "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE";
    mode?: RequestMode;
    signal?: AbortSignal | null;
    data?: Record<string, unknown> | FormData | null;
    getSuccessResp?: (data: T) => T;
    getResp?: <T = unknown>(resp: Response) => Promise<T>;
    type?: "text" | "json" | "blob" | "arrayBuffer";
    url?: string;
    headers?: Record<string, string>;
    allowedCodes?: number[];
    credentials?: RequestCredentials;
    redirect?: RequestRedirect;
    cache?: RequestCache;
    referrerPolicy?: ReferrerPolicy;
    fetchProps?: Omit<RequestInit, "method" | "headers" | "body" | "signal" | "mode" | "credentials" | "redirect" | "cache" | "referrerPolicy">;
};
export type TGetFromServerReturn = ReturnType<typeof getFromServer>;
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
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
 */
export declare const getFromServer: <T = unknown>(props?: TGetFromServerArgs<T>) => Promise<T>;
