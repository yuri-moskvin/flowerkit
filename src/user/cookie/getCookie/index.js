import ow from "ow";
import { getDocument } from "ssr-window";

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
const getCookie = (name) => {

  ow(name, ow.string);

  const matches = getDocument().cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export {
  getCookie
};
