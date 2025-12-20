type THttpMethod = "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE";
type TContentType = "auto" | "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
type TResponseType = "text" | "json" | "blob" | "arrayBuffer";
type TPlainObject = Record<string, unknown>;
type TRequestData = TPlainObject | FormData | null;
type TGetRespFn = (resp: Response) => Promise<unknown>;
type TGetSuccessRespFn<T> = (data: T) => T;
type TFetchExtra = Omit<RequestInit, "method" | "headers" | "body" | "signal" | "mode" | "credentials" | "redirect" | "cache" | "referrerPolicy">;
type TGetFromServerProps<T> = {
    contentType?: TContentType;
    isBubble?: boolean;
    timeout?: number;
    method?: THttpMethod;
    mode?: RequestMode;
    signal?: AbortSignal | null;
    data?: TRequestData;
    getSuccessResp?: TGetSuccessRespFn<T>;
    getResp?: TGetRespFn;
    type?: TResponseType;
    url?: string;
    headers?: Record<string, string>;
    allowedCodes?: number[];
    credentials?: RequestCredentials;
    redirect?: RequestRedirect;
    cache?: RequestCache;
    referrerPolicy?: ReferrerPolicy;
    fetchProps?: TFetchExtra;
};
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
 */
export declare const getFromServer: <T = unknown>(props?: TGetFromServerProps<T>) => Promise<T>;
export {};
