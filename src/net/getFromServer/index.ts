
import { getDocument, getWindow } from "ssr-window";
import { bubble } from "../../evt/bubble/index.ts";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.ts";
import { getFormDataFromObj } from "../getFormDataFromObj/index.ts";
import { getUrlWithQueryParams } from "../getUrlWithQueryParams/index.ts";

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
export const getFromServer = async <T = unknown>(props: TGetFromServerArgs<T> = {}): Promise<T> => {
  const {
    contentType = "auto",
    isBubble = true,
    timeout = 15000,
    method = "GET",
    mode = "cors",
    signal = null,
    data = null,
    getSuccessResp = ((resp: T) => resp),
    getResp,
    type = "json",
    url = getWindow().location.href || "./",
    headers = {},
    allowedCodes = [],
    credentials = "same-origin",
    redirect = "follow",
    referrerPolicy = "no-referrer-when-downgrade",
    cache = "default",
    fetchProps = {},
  } = props;


  if (typeof url !== "string") {
    throw new TypeError("getFromServer: url must be a string");
  }

  if (!Array.isArray(allowedCodes) || !allowedCodes.every((c) => Number.isInteger(c))) {
    throw new TypeError("getFromServer: allowedCodes must be an array of integers");
  }

  if (data !== null && typeof data !== "object") {
    throw new TypeError("getFromServer: data must be a plain object, FormData, or null");
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  const queries: Array<Promise<any>> = [];

  const isPost = method.toUpperCase() === "POST";
  const isFormData = (v: unknown): v is FormData => typeof FormData !== "undefined" && v instanceof FormData;

  /**
   * Produces request body based on contentType and data
   * @private
   * @returns {null | FormData | string}
   */
  const getBody = (): FormData | string | null => {
    switch (true) {
      case contentType === "application/json" && isPost:
        return JSON.stringify(isFormData(data) ? getObjFromFormData(data) : (data || {}));
      case [ "application/x-www-form-urlencoded", "multipart/form-data", "auto" ].includes(contentType) && isPost:
        return isFormData(data)
          ? data
          : getFormDataFromObj((data || {}) as Record<string, unknown>);
      default:
        return null;
    }
  };

  /**
   * Reject helper
   * @private
   */
  const getReject = <E = unknown>(reason: E): Promise<never> => Promise.reject(reason);

  /**
   * Timeout helper
   * @private
   */
  const setTimer = (cb: (code: number) => void): ReturnType<typeof setTimeout> => {
    timer = setTimeout(() => cb(408), timeout);
    return timer;
  };

  /**
   * URL builder (adds query params for GET-like methods)
   * @private
   */
  const getUrl = (): string => {
    const methodsNoBody: TGetFromServerArgs<T>["method"][] = [ "GET", "HEAD", "CONNECT", "OPTIONS", "TRACE" ];
    return (methodsNoBody.includes(method) && data !== null)
      ? getUrlWithQueryParams(
        url, isFormData(data)
          ? data
          : (data as Record<string, string | number | boolean | null>)
      )
      : url;
  };

  /**
   * Response parser
   * @private
   */
  const getResponse = async (resp: Response): Promise<T> => {
    if (timer) {
      clearTimeout(timer);
    }
    if (typeof getResp === "function") {
      return await getResp(resp) as T;
    }
    const { ok, status } = resp;
    if (ok || (allowedCodes.length > 0 && allowedCodes.includes(status))) {
      switch (type) {
        case "arrayBuffer": return await resp.arrayBuffer() as unknown as T;
        case "json": return await resp.json() as T;
        case "blob": return await resp.blob() as unknown as T;
        default: return await resp.text() as unknown as T;
      }
    }
    return await getReject(resp);
  };

  /**
   * Headers builder
   * @private
   */
  const getHeaders = (): Record<string, string> => {
    const result: Record<string, string> = { ...(headers || {}) };
    if (contentType !== "auto") {
      result["Content-Type"] = contentType;
    }
    return result;
  };

  const fetchParams: RequestInit = {
    method,
    body: getBody() as BodyInit | null,
    mode,
    signal: (signal ?? undefined) as AbortSignal | undefined,
    credentials,
    redirect,
    cache,
    referrerPolicy,
    headers: getHeaders(),
    ...fetchProps,
  };

  queries.push(fetch(getUrl(), fetchParams));

  if (timeout && timeout !== Infinity) {
    queries.push(new Promise<never>((_resolve, reject) => setTimer(reject as (code: number) => void)));
  }

  return await Promise.race(queries).then(
    (resp: Response) =>
      getResponse(resp).then((parsed) => {
        if (isBubble && typeof window !== "undefined") {
          bubble(getDocument(), getFromServer.name, parsed);
        }
        return getSuccessResp(parsed);
      }), (reject) => getReject(reject)
  );
};
