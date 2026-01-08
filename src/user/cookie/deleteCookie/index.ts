import { setCookie } from "../setCookie/index.ts";

export type TDeleteCookieArgs = Parameters<typeof deleteCookie>;

export type TDeleteCookieReturn = ReturnType<typeof deleteCookie>;

/**
 * Deletes a cookie by setting its expiry to a past date.
 *
 * @param {string} name Cookie name
 * @returns {void}
 * @throws {TypeError} If name is not a non-empty string
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to delete a Cookie?
 * deleteCookie("myCookieName");
 */
export const deleteCookie = (name: string): void => {
  if (typeof name !== "string" || name.length === 0) {
    throw new TypeError("deleteCookie: name must be a non-empty string");
  }
  setCookie(name, "", {
    expires: new Date("Thu, 01 Jan 1970 00:00:01 GMT"),
  });
};
