/**
 * Gets a URL string with updated query params from object or FormData instance
 * @param uri{String} - source URL
 * @param params{Object|FormData} - query params as object or FormData
 * @return {String}
 * @example
 * // How to set query params to URL string?
 * const url = "https://example.com";
 * getUrlWithQueryParams(url, { foo: 1 }); // "https://example.com/?foo=1"
 *
 * // How to update query params in URL string?
 * const url = "/api/users/?page=1";
 * getUrlWithQueryParams(url, { page: 2, limit: 100 }); // "/api/users/?page=2&limit=100"
 */
export function getUrlWithQueryParams(uri?: string, params?: any | FormData): string;
//# sourceMappingURL=index.d.ts.map