import { getQueryParams } from "../getQueryParams/index.ts";
import type { TQueryParamsInput } from "../getQueryParams/index.ts";

export type TGetQueryParamArgs = Parameters<typeof getQueryParam>;

export type TGetQueryParamReturn = ReturnType<typeof getQueryParam>;

/**
 * Gets the first value of a URL query parameter.
 * @param {string} name Parameter name
 * @param {TQueryParamsInput} [input] URL, query string, or URLSearchParams; current URL by default
 * @returns {string|null} First value or `null` when absent
 * @throws {TypeError} getQueryParam: name must be a string
 * @example
 * getQueryParam("page", "?page=2"); // "2"
 * @example
 * // Read an optional feature flag from the current browser URL
 * const isPreview = getQueryParam("preview") === "true";
 */
export const getQueryParam = (name: string, input?: TQueryParamsInput): string | null => {
  if (typeof name !== "string") {
    throw new TypeError("getQueryParam: name must be a string");
  }
  const value = getQueryParams(input)[name];
  return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
};
