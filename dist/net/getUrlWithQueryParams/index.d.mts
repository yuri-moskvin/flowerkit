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
export declare const getUrlWithQueryParams: (uri: string, params?: TQueryParams) => string;
export {};
