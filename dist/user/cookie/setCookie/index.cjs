Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");
/**
 * Cookie options supported by setCookie.
 */
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
 */const setCookie=(name,value,options={})=>{if(typeof name!=="string"||name.length===0)throw new TypeError("setCookie: name must be a non-empty string");if(typeof value!=="string")throw new TypeError("setCookie: value must be a string");if(options===null||typeof options!=="object"||Array.isArray(options))throw new TypeError("setCookie: options must be an object");let expires=options.expires;if(typeof expires==="number"&&expires>0){const d=new Date;d.setTime(d.getTime()+expires*1000);expires=d;options.expires=d}if(expires&&typeof expires.toUTCString==="function")options.expires=expires.toUTCString();const encoded=encodeURIComponent(value);let cookie=`${name}=${encoded}`;for(const key in options){if(!Object.prototype.hasOwnProperty.call(options,key))continue;cookie+=`; ${key}`;const optVal=options[key];if(optVal!==true&&typeof optVal!=="undefined")cookie+=`=${String(optVal)}`}ssrWindow.getDocument().cookie=cookie};exports.setCookie=setCookie;
//# sourceMappingURL=index.cjs.map
