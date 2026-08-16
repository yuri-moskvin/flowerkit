import{_getDateValue}from"../_dateValue/index.mjs";const getDateFormatted=(date,locales,options={})=>{if(!options||typeof options!=="object"||Array.isArray(options))throw new TypeError("getDateFormatted: options must be a plain object");return new Intl.DateTimeFormat(locales,options).format(_getDateValue(date,getDateFormatted.name))};export{getDateFormatted};
//# sourceMappingURL=index.mjs.map
