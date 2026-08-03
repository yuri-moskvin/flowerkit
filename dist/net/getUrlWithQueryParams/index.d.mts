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
export declare const getUrlWithQueryParams: (uri: string, params?: TQueryParams) => string;
export {};
