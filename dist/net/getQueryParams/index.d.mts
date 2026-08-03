export type TQueryParamsInput = string | URL | URLSearchParams;
export type TGetQueryParamsArgs = Parameters<typeof getQueryParams>;
export type TGetQueryParamsReturn = ReturnType<typeof getQueryParams>;
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
export declare const getQueryParams: (input?: TQueryParamsInput) => Record<string, string | string[]>;
