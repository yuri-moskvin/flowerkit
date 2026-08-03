
import { getDocument, getWindow } from "ssr-window";
import { bubble } from "../../evt/bubble/index.ts";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.ts";
import { getFormDataFromObj } from "../getFormDataFromObj/index.ts";
import { getUrlWithQueryParams } from "../getUrlWithQueryParams/index.ts";

export type TGetFromServerMethod = "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type TGetFromServerErrorKind = "abort" | "http" | "network" | "parse" | "request" | "timeout" | "transform";

export type TGetFromServerError = Error & {
  cause: unknown;
  kind: TGetFromServerErrorKind;
  method: TGetFromServerMethod;
  name: "GetFromServerError";
  response: Response | null;
  status: number | null;
  url: string;
};

export type TGetFromServerArgs<TResp = unknown, TSuccess = TResp> = {
  contentType?: "auto" | "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
  isBubble?: boolean;
  timeout?: number;
  method?: TGetFromServerMethod;
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

type TGetFromServerErrorProps = {
  cause: unknown;
  kind: TGetFromServerErrorKind;
  method: TGetFromServerMethod;
  response?: Response | null;
  status?: number | null;
  url: string;
};

type TRequestStage = "fetch" | "parse" | "request" | "transform";

const getFromServerErrorMarker = Symbol("getFromServerError");

const getErrorMessage = (kind: TGetFromServerErrorKind, status: number | null): string => {
  switch (kind) {
    case "abort": return "getFromServer: request was aborted";
    case "http": return `getFromServer: request failed with status ${status ?? "unknown"}`;
    case "network": return "getFromServer: network request failed";
    case "parse": return "getFromServer: failed to parse response";
    case "request": return "getFromServer: failed to create request";
    case "timeout": return "getFromServer: request timed out";
    case "transform": return "getFromServer: failed to transform response";
  }
};

const getRequestError = (props: TGetFromServerErrorProps): TGetFromServerError => {
  const {
    cause,
    kind,
    method,
    response = null,
    status = response?.status ?? (kind === "timeout" ? 408 : null),
    url,
  } = props;
  const error = new Error(getErrorMessage(kind, status)) as TGetFromServerError & {
    [getFromServerErrorMarker]: true;
  };
  error.name = "GetFromServerError";
  error.cause = cause;
  error.kind = kind;
  error.method = method;
  error.response = response;
  error.status = status;
  error.url = url;
  Object.defineProperty(error, getFromServerErrorMarker, { value: true });
  return error;
};

const isRequestError = (error: unknown): error is TGetFromServerError => {
  return typeof error === "object" && error !== null && getFromServerErrorMarker in error;
};

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
 * @param {function(Response): Promise<T>} [props.getResp] Custom response parser. If provided, overrides `type` after HTTP status validation.
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
 * @throws {TGetFromServerError} Request lifecycle error with a discriminating `kind`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @example
 * const user = await getFromServer<{ userId: number }>({ url: "/api/user?id=1", method: "GET" });
 * @example
 * import type { TGetFromServerError } from "@web3r/flowerkit/net";
 *
 * try {
 *   await getFromServer({ url: "/api/user" });
 * } catch (error) {
 *   if (error instanceof Error && error.name === "GetFromServerError") {
 *     const requestError = error as TGetFromServerError;
 *     if (requestError.kind === "http") {
 *       console.error(requestError.status, requestError.response);
 *     }
 *   }
 * }
 * @example
 * // Send typed JSON data and transform the successful API response
 * const productId = await getFromServer<{ product: { id: string } }, string>({
 *   url: "/api/products",
 *   method: "POST",
 *   contentType: "application/json",
 *   data: { name: "Flower pot", price: 24 },
 *   getSuccessResp: ({ product }) => product.id,
 * });
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
  const methodNormalized = String(method).toUpperCase() as TGetFromServerMethod;
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
    const { ok, status } = resp;
    if (!ok && !(allowedCodes.length > 0 && allowedCodes.includes(status))) {
      throw getRequestError({
        cause: resp,
        kind: "http",
        method: methodNormalized,
        response: resp,
        url: requestUrl,
      });
    }
    if (typeof getResp === "function") {
      return await getResp(resp);
    }
    switch (type) {
      case "arrayBuffer": return await resp.arrayBuffer() as unknown as TResp;
      case "json": return await resp.json() as TResp;
      case "blob": return await resp.blob() as unknown as TResp;
      default: return await resp.text() as unknown as TResp;
    }
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

  let requestUrl = url;
  let response: Response | null = null;
  let stage: TRequestStage = "request";

  try {
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
    requestUrl = getUrl();
    stage = "fetch";
    response = await fetch(requestUrl, fetchParams);
    stage = "parse";
    const parsed = await getResponse(response);

    stage = "transform";
    if (isBubble && typeof window !== "undefined") {
      bubble(getDocument(), getFromServer.name, parsed);
    }

    return getSuccessResp(parsed);
  } catch (error) {
    if (isRequestError(error)) {
      throw error;
    }
    if (isTimedOut) {
      throw getRequestError({
        cause: error,
        kind: "timeout",
        method: methodNormalized,
        response,
        url: requestUrl,
      });
    }
    if (signal?.aborted) {
      throw getRequestError({
        cause: signal.reason ?? error,
        kind: "abort",
        method: methodNormalized,
        response,
        url: requestUrl,
      });
    }
    const kindByStage: Record<TRequestStage, TGetFromServerErrorKind> = {
      fetch: "network",
      parse: "parse",
      request: "request",
      transform: "transform",
    };
    throw getRequestError({
      cause: error,
      kind: kindByStage[stage],
      method: methodNormalized,
      response,
      url: requestUrl,
    });
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
    if (signal) {
      signal.removeEventListener("abort", externalAbortListener);
    }
  }
};
