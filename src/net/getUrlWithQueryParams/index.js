import ow from "ow";
import { getWindow, getDocument } from "ssr-window";
import { getObjFromFormData } from "../../obj/getObjFromFormData/index.js";

/**
 * Gets a URL string with updated query params from object or FormData instance
 * @param uri{String} - source URL
 * @param params{Object|FormData} - query params as object or FormData
 * @return {String}
 * @example
 * // How to set query params to URL string?
 * const url = "https://example.com";
 * getUrlWithQueryParams(url, { foo: 1 }); // "https://example.com/?foo=1"
 *
 * // How to update query params in URL string?
 * const url = "/api/users/?page=1";
 * getUrlWithQueryParams(url, { page: 2, limit: 100 }); // "/api/users/?page=2&limit=100"
 */
const getUrlWithQueryParams = (uri = getWindow().location.href, params = {}) => {

  ow(uri, ow.optional.string);
  ow(params, ow.optional.object.validate(value => ({
    validator: !!value && (value instanceof FormData || typeof value === "object"),
    message: `Params must be object or FormData`
  })));

  let url = uri;
  const a = getDocument().createElement("a");
  a.href = uri;

  if (params instanceof FormData) {
    params = getObjFromFormData(params);
  }

  Object.entries(params).forEach(([ key, value ]) => {
    let reg_ex = new RegExp(key + "((?:\\[[^\\]]*\\])?)(=|$)(.*)"), qs, qs_len, key_found = false;
    if (!a.search) {
      a.search = "?" + key + "=" + value;
      url = a.href;
      return;
    }
    qs = a.search.replace(/^\?/, "").split(/&(?:amp;)?/);
    qs_len = qs.length;
    while (qs_len > 0) {
      qs_len--;
      if (!qs[qs_len]) {
        qs.splice(qs_len, 1);
        continue;
      }
      if (reg_ex.test(qs[qs_len])) {
        qs[qs_len] = qs[qs_len].replace(reg_ex, key + "$1") + "=" + value;
        key_found = true;
      }
    }
    if (!key_found) {
      qs.push(key + "=" + value);
    }
    a.search = "?" + qs.join("&");
    url = a.href;
  });
  return url;
};

export {
  getUrlWithQueryParams
};
