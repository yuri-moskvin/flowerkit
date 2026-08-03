import{setCookie}from"../setCookie/index.mjs";const deleteCookie=name=>{if(typeof name!=="string"||name.length===0)throw new TypeError("deleteCookie: name must be a non-empty string");setCookie(name,"",{expires:new Date("Thu, 01 Jan 1970 00:00:01 GMT")})};export{deleteCookie};
//# sourceMappingURL=index.mjs.map
