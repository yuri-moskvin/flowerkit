import { getDocument } from "ssr-window";

export type TGetCookieArgs = Parameters<typeof getCookie>;

export type TGetCookieReturn = ReturnType<typeof getCookie>;

/**
 * Retrieves a cookie value by name.
 *
 * @param {string} name Cookie name
 * @returns {string|undefined} The cookie value or undefined if not found
 * @throws {TypeError} If name is not a non-empty string
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to get value of Cookie?
 * setCookie("myCookieName", "myValue");
 * const savedValue = getCookie("myCookieName");
 * console.log(savedValue); // => "myValue"
 */
export const getCookie = (name: string): string | undefined => {
  if (typeof name !== "string" || name.length === 0) {
    throw new TypeError("getCookie: name must be a non-empty string");
  }
  const safeName = name.replace(/([$?*|{}\]\\^])/g, "\\$1");
  // eslint-disable-next-line security/detect-non-literal-regexp
  const match = getDocument().cookie.match(new RegExp("(?:^|; )" + safeName + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
};
