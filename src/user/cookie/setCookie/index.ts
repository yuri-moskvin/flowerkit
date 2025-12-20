import { getDocument } from "ssr-window";

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
export const setCookie = (name: string, value: string, options: TCookieOptions = {}): void => {
  if (typeof name !== "string" || name.length === 0) {
    throw new TypeError("setCookie: name must be a non-empty string");
  }
  if (typeof value !== "string") {
    throw new TypeError("setCookie: value must be a string");
  }
  if (options === null || typeof options !== "object" || Array.isArray(options)) {
    throw new TypeError("setCookie: options must be an object");
  }

  let expires = options.expires;
  if (typeof expires === "number" && expires > 0) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = d;
    options.expires = d;
  }
  if (expires && typeof (expires as Date).toUTCString === "function") {
    options.expires = (expires as Date).toUTCString();
  }

  const encoded = encodeURIComponent(value);
  let cookie = `${name}=${encoded}`;

  for (const key in options) {
    if (!Object.prototype.hasOwnProperty.call(options, key)) {
      continue;
    }
    cookie += `; ${key}`;
    const optVal = (options as Record<string, unknown>)[key];
    if (optVal !== true && typeof optVal !== "undefined") {
      cookie += `=${String(optVal)}`;
    }
  }

  getDocument().cookie = cookie;
};
