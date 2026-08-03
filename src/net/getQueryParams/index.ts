import { getWindow } from "ssr-window";

export type TQueryParamsInput = string | URL | URLSearchParams;

export type TGetQueryParamsArgs = Parameters<typeof getQueryParams>;

export type TGetQueryParamsReturn = ReturnType<typeof getQueryParams>;

const getSearchParams = (input?: TQueryParamsInput): URLSearchParams => {
  if (input instanceof URLSearchParams) {
    return new URLSearchParams(input);
  }
  if (input instanceof URL) {
    return new URLSearchParams(input.search);
  }
  if (input !== undefined && typeof input !== "string") {
    throw new TypeError("getQueryParams: input must be a string, URL, or URLSearchParams");
  }

  const currentUrl = getWindow().location?.href || "http://localhost/";
  const source = input ?? currentUrl;
  if (typeof source !== "string") {
    throw new TypeError("getQueryParams: input must be a string, URL, or URLSearchParams");
  }
  const isQueryOnly = source.startsWith("?")
    || (!source.includes("/") && !source.includes(":"));
  return isQueryOnly
    ? new URLSearchParams(source)
    : new URL(source, currentUrl).searchParams;
};

/**
 * Reads URL query parameters into an object and preserves repeated values and bare flags.
 * @param {TQueryParamsInput} [input] URL, query string, or URLSearchParams; current URL by default
 * @returns {Record<string,string|string[]>} Query object
 * @throws {TypeError} getQueryParams: input is invalid
 * @example
 * getQueryParams("?tag=a&tag=b&page=1"); // { tag: [ "a", "b" ], page: "1" }
 * @example
 * // Restore product filters from a shared search URL
 * const filters = getQueryParams(window.location.href);
 * const selectedBrands = Array.isArray(filters.brand)
 *   ? filters.brand
 *   : [ filters.brand ].filter(Boolean);
 */
export const getQueryParams = (input?: TQueryParamsInput): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = Object.create(null);
  getSearchParams(input).forEach((value, key) => {
    const current = result[key];
    if (current === undefined) {
      result[key] = value;
    } else if (Array.isArray(current)) {
      current.push(value);
    } else {
      result[key] = [ current, value ];
    }
  });
  return result;
};
