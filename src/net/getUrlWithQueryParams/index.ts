import { getWindow, getDocument } from "ssr-window";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.ts";

type TQueryParams = Record<string, string | number | boolean | null> | FormData;

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

  if (typeof params !== "object") {
    throw new TypeError("getUrlWithQueryParams: params must be an object");
  }

  if (params instanceof FormData) {
    params = getObjFromFormData(params) as Record<string, string | number | boolean | null>;
  }

  const a = getDocument().createElement("a");
  a.href = uri;

  Object.entries(params)
    .forEach(([ key, value ]) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(`${key}((?:\\[[^\\]]*\\])?)(=|$)(.*)`, "i");
      let queryParams = a.search.replace(/^\?/, "").split("&").filter(Boolean);
      let paramFound = false;

      queryParams = queryParams.map((param: string) => {
        if (regex.test(param)) {
          paramFound = true;
          return `${key}=${value}`;
        }
        return param;
      });

      if (!paramFound) {
        queryParams.push(`${key}=${value}`);
      }

      a.search = queryParams.length ? `?${queryParams.join("&")}` : "";
    });

  return a.href;
};
