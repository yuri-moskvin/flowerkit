import{getQueryParams}from"../getQueryParams/index.mjs";const getQueryParam=(name,input)=>{if(typeof name!=="string")throw new TypeError("getQueryParam: name must be a string");const value=getQueryParams(input)[name];return Array.isArray(value)?value[0]??null:value??null};export{getQueryParam};
//# sourceMappingURL=index.mjs.map
