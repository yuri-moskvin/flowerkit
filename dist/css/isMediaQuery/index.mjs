import{getWindow}from"ssr-window";const isMediaQuery=str=>{if(typeof str!=="string")throw new TypeError("isMediaQuery: str must be a string");const query=/^[\w-]+\s*:/u.test(str.trim())?`(${str.trim()})`:str.trim();return getWindow().matchMedia(query)?.matches??false};export{isMediaQuery};
//# sourceMappingURL=index.mjs.map
