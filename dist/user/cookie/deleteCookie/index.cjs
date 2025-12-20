Object.defineProperty(exports,"__esModule",{value:true});var index=require("../setCookie/index.cjs");
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
 */const deleteCookie=name=>{if(typeof name!=="string"||name.length===0)throw new TypeError("deleteCookie: name must be a non-empty string");index.setCookie(name,"",{expires:new Date("Thu, 01 Jan 1970 00:00:01 GMT")})};exports.deleteCookie=deleteCookie;
//# sourceMappingURL=index.cjs.map
