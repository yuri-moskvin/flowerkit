/**
 * Gets the Cookie value
 * @param name{String} - name of Cookie
 * @return {string|undefined}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to get value of Cookie?
 * setCookie("myCookieName", "myValue");
 * const savedValue = getCookie("myCookieName");
 * console.log(savedValue); // => "myValue"
 */
export function getCookie(name: string): string | undefined;
/**
 * Sets the Cookie value
 * @param name{String} - name of Cookie
 * @param value{String} - value of Cookie
 * @param options{Object=} - options of Cookie
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to set Cookie for one day or other time?
 * setCookie("myCookie", "value", { expires: 86400 }) // expires in sec
 */
export function setCookie(name: string, value: string, options?: any | undefined): void;
//# sourceMappingURL=index.d.ts.map