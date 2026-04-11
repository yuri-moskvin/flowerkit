
import { getDocument, getWindow } from "ssr-window";
import { bubble } from "../../evt/bubble/index.ts";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.ts";
import { getFormDataFromObj } from "../getFormDataFromObj/index.ts";
import { getUrlWithQueryParams } from "../getUrlWithQueryParams/index.ts";

export type TGetFromServerArgs<TResp = unknown, TSuccess = TResp> = {
  contentType?: "auto" | "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
  isBubble?: boolean;
  timeout?: number;
  method?: "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
  mode?: RequestMode;
  signal?: AbortSignal | null;
  data?: Record<string, unknown> | FormData | null;
  getSuccessResp?: (data: TResp) => TSuccess;
  getResp?: (resp: Response) => Promise<TResp>;
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
 * @throws {TypeError} getFromServer: timeout must be a non-negative number or Infinity
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
 */
export const getFromServer = async <TResp = unknown, TSuccess = TResp>(
  props: TGetFromServerArgs<TResp, TSuccess> = {}
): Promise<TSuccess> => {
  const {
    contentType = "auto",
    isBubble = true,
    timeout = 15000,
    method = "GET",
    mode = "cors",
    signal = null,
    data = null,
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

  const getSuccessResp = props.getSuccessResp ?? ((resp: TResp) => resp as unknown as TSuccess);
  const methodNormalized = String(method).toUpperCase() as Uppercase<typeof method>;
  const methodsWithBody = new Set([
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ]);
  const methodsNoBody = new Set([
    "GET",
    "HEAD",
    "CONNECT",
    "OPTIONS",
    "TRACE",
  ]);
  const isFormData = (v: unknown): v is FormData => typeof FormData !== "undefined" && v instanceof FormData;
  const isPlainObject = (v: unknown): v is Record<string, unknown> => {
    return Object.prototype.toString.call(v) === "[object Object]";
  };

  if (typeof url !== "string") {
    throw new TypeError("getFromServer: url must be a string");
  }

  if (!Array.isArray(allowedCodes) || !allowedCodes.every((c) => Number.isInteger(c))) {
    throw new TypeError("getFromServer: allowedCodes must be an array of integers");
  }

  if (typeof timeout !== "number" || (Number.isFinite(timeout) && timeout < 0) || Number.isNaN(timeout)) {
    throw new TypeError("getFromServer: timeout must be a non-negative number or Infinity");
  }

  if (data !== null && !isFormData(data) && !isPlainObject(data)) {
    throw new TypeError("getFromServer: data must be a plain object, FormData, or null");
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  let isTimedOut = false;
  const requestController = new AbortController();
  const externalAbortListener = (): void => {
    requestController.abort();
  };
  if (signal) {
    if (signal.aborted) {
      externalAbortListener();
    } else {
      signal.addEventListener("abort", externalAbortListener, { once: true });
    }
  }

  const getDataAsObject = (): Record<string, unknown> => {
    return isFormData(data) ? getObjFromFormData(data) : (data ?? {});
  };

  /**
   * Produces request body based on contentType and data
   * @private
   * @returns {BodyInit | null}
   */
  const getBody = (): BodyInit | null => {
    if (!methodsWithBody.has(methodNormalized)) {
      return null;
    }

    switch (true) {
      case contentType === "application/json":
        return JSON.stringify(getDataAsObject());
      case contentType === "application/x-www-form-urlencoded": {
        const params = new URLSearchParams();
        Object.entries(getDataAsObject())
          .forEach(([ key, value ]) => {
            params.set(key, String(value ?? ""));
          });
        return params.toString();
      }
      case contentType === "multipart/form-data":
        return isFormData(data)
          ? data
          : getFormDataFromObj(getDataAsObject());
      case contentType === "auto":
        return isFormData(data)
          ? data
          : getFormDataFromObj(getDataAsObject());
      default:
        return null;
    }
  };

  /**
   * URL builder (adds query params for GET-like methods)
   * @private
   */
  const getUrl = (): string => {
    return (methodsNoBody.has(methodNormalized) && data !== null)
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
  const getResponse = async (resp: Response): Promise<TResp> => {
    if (typeof getResp === "function") {
      return await getResp(resp);
    }
    const { ok, status } = resp;
    if (ok || (allowedCodes.length > 0 && allowedCodes.includes(status))) {
      switch (type) {
        case "arrayBuffer": return await resp.arrayBuffer() as unknown as TResp;
        case "json": return await resp.json() as TResp;
        case "blob": return await resp.blob() as unknown as TResp;
        default: return await resp.text() as unknown as TResp;
      }
    }
    throw resp;
  };

  /**
   * Headers builder
   * @private
   */
  const getHeaders = (): Record<string, string> => {
    const result: Record<string, string> = { ...(headers || {}) };
    if (contentType === "multipart/form-data") {
      Object.keys(result).forEach((key) => {
        if (key.toLowerCase() === "content-type") {
          delete result[key];
        }
      });
      return result;
    }
    if ([ "application/json", "application/x-www-form-urlencoded" ].includes(contentType)) {
      result["Content-Type"] = contentType;
    }
    return result;
  };

  if (timeout && timeout !== Infinity) {
    timer = setTimeout(() => {
      isTimedOut = true;
      requestController.abort();
    }, timeout);
  }

  const fetchParams: RequestInit = {
    ...fetchProps,
    method: methodNormalized,
    body: getBody(),
    mode,
    signal: requestController.signal,
    credentials,
    redirect,
    cache,
    referrerPolicy,
    headers: getHeaders(),
  };

  try {
    const resp = await fetch(getUrl(), fetchParams);
    const parsed = await getResponse(resp);

    if (isBubble && typeof window !== "undefined") {
      bubble(getDocument(), getFromServer.name, parsed);
    }

    return getSuccessResp(parsed);
  } catch (error) {
    if (isTimedOut) {
      throw 408;
    }
    throw error;
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
    if (signal) {
      signal.removeEventListener("abort", externalAbortListener);
    }
  }
};
