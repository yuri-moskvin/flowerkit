import { getWindow, getDocument } from "ssr-window";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.ts";

type TQueryParams = Record<string, string | number | boolean | null> | FormData;

export type TGetUrlWithQueryParamsArgs = Parameters<typeof getUrlWithQueryParams>;

export type TGetUrlWithQueryParamsReturn = ReturnType<typeof getUrlWithQueryParams>;

/**
 * Returns a URL string with updated query parameters from an object or `FormData`.
 *
 * @param {string} [uri=window.location.href] Source URL
 * @param {Record<string, string|number|boolean|null>|FormData} [params={}] Params to merge into the query string
 * @returns {string} Updated URL
 */
export const getUrlWithQueryParams = (
  uri: string,
  params: TQueryParams = {}
): string => {

  if (typeof uri !== "string") {
    throw new TypeError("getUrlWithQueryParams: uri must be a string");
  } else if (!uri.length) {
    uri = getWindow().location.href;
  }

  if (!params || typeof params !== "object") {
    throw new TypeError("getUrlWithQueryParams: params must be an object");
  }

  if (params instanceof FormData) {
    params = getObjFromFormData(params) as Record<string, string | number | boolean | null>;
  }

  const a: HTMLAnchorElement = getDocument().createElement("a");
  a.href = uri;

  const searchParams = new URLSearchParams(a.search);
  Object.entries(params).forEach(([ key, value ]) => {
    searchParams.set(key, String(value));
  });
  a.search = searchParams.toString();

  return a.href;
};
