import { getWindow, getDocument } from "ssr-window";

type TQueryParams = Record<string, string | number | boolean | null> | FormData;

export type TGetUrlWithQueryParamsArgs = Parameters<typeof getUrlWithQueryParams>;

export type TGetUrlWithQueryParamsReturn = ReturnType<typeof getUrlWithQueryParams>;

/**
 * Returns a URL string with updated query parameters from an object or `FormData`.
 *
 * @param {string} [uri=window.location.href] Source URL
 * @param {Record<string, string|number|boolean|null>|FormData} [params={}] Params to merge into the query string
 * @returns {string} Updated URL
 * @example
 * // Add pagination and sorting parameters to an existing URL
 * const nextPageUrl = getUrlWithQueryParams("/products?category=plants", {
 *   page: 2,
 *   sort: "price",
 * });
 * @example
 * // Build a filter URL that preserves repeated FormData values
 * const filters = new FormData();
 * filters.append("tag", "indoor");
 * filters.append("tag", "sale");
 * const filterUrl = getUrlWithQueryParams("/products", filters);
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

  const a: HTMLAnchorElement = getDocument().createElement("a");
  a.href = uri;

  const searchParams = new URLSearchParams(a.search);
  if (params instanceof FormData) {
    const replacedKeys = new Set<string>();
    params.forEach((value, key) => {
      if (!replacedKeys.has(key)) {
        searchParams.delete(key);
        replacedKeys.add(key);
      }
      searchParams.append(key, String(value));
    });
  } else {
    Object.entries(params).forEach(([ key, value ]) => {
      searchParams.set(key, String(value));
    });
  }
  a.search = searchParams.toString();

  return a.href;
};
