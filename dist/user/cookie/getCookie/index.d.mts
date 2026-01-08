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
export declare const getCookie: (name: string) => string | undefined;
