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
 * @example
 * // Remove an authentication cookie after the user signs out
 * deleteCookie("session_token");
 */
export declare const deleteCookie: (name: string) => void;
