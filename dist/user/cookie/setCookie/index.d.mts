type TSameSite = "lax" | "strict" | "none" | string;
type TCookieKV = Record<string, unknown>;
/**
 * Cookie options supported by setCookie.
 */
type TCookieOptions = {
    /**
     * Expiration setting:
     * number: seconds from now
     * Date: specific expiry date
     * string: already formatted date string
     */
    expires?: number | Date | string;
    path?: string;
    domain?: string;
    secure?: boolean;
    "max-age"?: number | string;
    samesite?: TSameSite;
} & TCookieKV;
export type { TCookieOptions };
/**
 * Sets a cookie.
 *
 * If `options.expires` is a number, it's treated as seconds from now.
 * If `options.expires` is a Date, it's converted via toUTCString.
 * Other options are appended as cookie attributes.
 *
 * @param {string} name Cookie name
 * @param {string} value Cookie value
 * @param {TCookieOptions} [options={}] Cookie attributes
 * @returns {void}
 * @throws {TypeError} If inputs are invalid
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to set Cookie for one day or other time?
 * setCookie("myCookie", "value", { expires: 86400 }); // expires in 1 day (seconds)
 */
export declare const setCookie: (name: string, value: string, options?: TCookieOptions) => void;
