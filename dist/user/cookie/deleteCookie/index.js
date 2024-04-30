import ow from"ow";import{setCookie}from"../setCookie/index.js";
/**
 * Removes the Cookie value
 * @param name{String} - name of Cookie
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @example
 * // How to delete a Cookie?
 * removeCookie("myCookieName");
 */const deleteCookie=name=>{ow(name,ow.string);setCookie(name,"",{expires:new Date("Thu, 01 Jan 1970 00:00:01 GMT")})};export{deleteCookie};
//# sourceMappingURL=index.js.map
