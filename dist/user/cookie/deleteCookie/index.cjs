Object.defineProperty(exports,"__esModule",{value:true});var index=require("../setCookie/index.cjs");const deleteCookie=name=>{if(typeof name!=="string"||name.length===0)throw new TypeError("deleteCookie: name must be a non-empty string");index.setCookie(name,"",{expires:new Date("Thu, 01 Jan 1970 00:00:01 GMT")})};exports.deleteCookie=deleteCookie;
//# sourceMappingURL=index.cjs.map
