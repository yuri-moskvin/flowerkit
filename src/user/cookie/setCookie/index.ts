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

export type TSetCookieArgs = Parameters<typeof setCookie>;

export type TSetCookieReturn = ReturnType<typeof setCookie>;

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
 * @example
 * // Persist a cookie consent choice with common security attributes
 * setCookie("cookie_consent", "accepted", {
 *   expires: 60 * 60 * 24 * 365,
 *   path: "/",
 *   samesite: "lax",
 *   secure: true,
 * });
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

  const normalizedOptions: TCookieOptions = { ...options };
  let expires = normalizedOptions.expires;
  if (typeof expires === "number" && expires > 0) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = d;
    normalizedOptions.expires = d;
  }
  if (expires && typeof (expires as Date).toUTCString === "function") {
    normalizedOptions.expires = (expires as Date).toUTCString();
  }

  const encoded = encodeURIComponent(value);
  let cookie = `${name}=${encoded}`;

  for (const key in normalizedOptions) {
    if (!Object.prototype.hasOwnProperty.call(normalizedOptions, key)) {
      continue;
    }
    cookie += `; ${key}`;
    const optVal = (normalizedOptions as Record<string, unknown>)[key];
    if (optVal !== true && typeof optVal !== "undefined") {
      cookie += `=${String(optVal)}`;
    }
  }

  getDocument().cookie = cookie;
};
